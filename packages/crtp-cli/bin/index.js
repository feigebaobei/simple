#!/usr/bin/env node

// 依赖
const program = require('commander')
const fs = require('fs')
const fsPromises = require('fs/promises')
const mkdirp = require('mkdirp')
const path = require('path')
const util = require('util')
const chalk = require('chalk')
const childProcess = require('child_process')
// const execa = require('execa')
// const ora = require('ora')
// const spawn = require('cross-spawn');
// import ora from 'ora'
const Spinner = require('cli-spinner').Spinner

// 工具
const {log} = console
const utils = require('../utils/index.js')
// const assetsConfig = require('./config.js')
// const customConfig = require(path.resolve(process.cwd(), './crtp.config.js'))
let customConfig = {}
// let t = fs.statSync(path.resolve(process.cwd(), './crtp.confisg.js'))
// log('wertyt43', t)
const defaultConfig = require('../utils/defaultConfig.js')
// const { dirname } = require('path')
const config = Object.assign({}, defaultConfig, customConfig)
// console.log('config', config)

// 考虑删除它。使用fsPromises替换。
let pUtil = {
	pReadFile: util.promisify(fs.readFile),
	pWriteFile: util.promisify(fs.writeFile),
	pReaddir: util.promisify(fs.readdir),
	pRm: util.promisify(fs.rm),
	pFstat: util.promisify(fs.fstat),
}
// 考虑删除它。因默认配置项从配置文件中取得
// let defaultOptions = {
// 	readme: {
// 		packageName: 'packageName',
// 		filename: 'readme.md'
// 	},
// 	demo: {
// 		filename: 'demo.md'
// 	},
// 	baseCars: {
// 		filename: 'baseCars.vue'
// 	},
// 	baseDemoPage: {
// 		filename: 'baseDemoPage.vue'
// 	}
// }
let tip = (color, str) => {
	// 可以按级别显示提示
	log(chalk[color](str))
}
let createDir = (sourcePath, targetPath) => {
	fsPromises.stat(targetPath).then(stats => {
	}).catch(err => {
		// 若不存在，则创建
		return fsPromises.mkdir(targetPath)
	}).then(async function () {
		// log(res)
		// 已经创建目标目录
		let elementList = await fsPromises.readdir(sourcePath)
		elementList.forEach(async function(element) {
			let elementPath = path.resolve(sourcePath, `./${element}`)
			let stats = await fsPromises.stat(elementPath)
			if (stats.isDirectory()) {
				// log(`这是一个目录 ${elementPath}`)
				createDir(elementPath, path.resolve(targetPath, `./${element}`))
			} else {
				// log(`这是一个文件 ${elementPath}`)
				let cont = await fsPromises.readFile(elementPath, 'utf-8')
				let tp = path.resolve(targetPath, `./${element}`)
				let temp = await fsPromises.writeFile(tp, cont)
				if (!temp) {
					log(`创建成功 ${tp}`)
				}
			}
		})
	})
}

// 考虑使用流处理
let initFile = (fileType, userOption) => {
	// console.log(userOption)
	let {pReadFile, pWriteFile} = pUtil
	let fileList = userOption.file || [`./${fileType}`]
	let maxLen = fileList.reduce((r, c) => {
		return Math.max(r, c.length)
	}, 0)
	pReadFile(path.resolve(__dirname, `../assets/${fileType}`), 'utf-8').then((textContent) => {
		return fileList.map(item => {
			return mkdirp(path.resolve(process.cwd(), path.dirname(item))).then(() => {
				// 替换
				if (userOption.macroSubstitution) {
					let arr = []
					for (let i = 0; i < userOption.macroSubstitution.length; i += 2) {
						if (userOption.macroSubstitution[i] && userOption.macroSubstitution[i + 1]) {
							arr.push([userOption.macroSubstitution[i], userOption.macroSubstitution[i + 1]])
						}
					}
					arr = arr.filter(item => item.length === 2)
					textContent = arr.reduce((r, [origin, target]) => {
						let reg = new RegExp(origin, 'g')
						r = r.replace(reg, target)
						return r
					}, textContent)
				}
				// 使用选项
				switch (fileType) {
					case '.npmrc':
						textContent = `registry = ${utils.npmRegistry[userOption.registry]}` // https://registry.npmjs.org
						break
				}
				// 写入
				return pWriteFile(path.resolve(process.cwd(), item), textContent, 'utf-8').then(() => {
					log(chalk.blue(`创建${utils.fillEmpty(item, maxLen)} - 完成`))
				})
			}).catch(() => {
				log(chalk.red(`创建${utils.fillEmpty(item, maxLen)} - 失败`))
			})

		})
	}).catch(e => {
		log(chalk.red(`创建${fileList} - 失败`))
		log(chalk.yellow('  不存在该模板文件'))
	})
}
// 创建目录
// 兼容创建文件
let initDir = (dirName, userOption) => {
	let resolvedPath = path.resolve(__dirname, `../assets/${dirName}`)
	fsPromises.stat(resolvedPath).then(stats => {
		userOption.dir.forEach(dir => {
			let targetPath = path.resolve(process.cwd(), dir)
			createDir(resolvedPath, targetPath)
		})
	}).catch(err => {
		log(`不存在该模板目录 ${resolvedPath}`)
	})
}
// crtp addFile abc.md --file ./path/to/file.md
let addFile = (filename, userOption) => {
	let {pReadFile, pWriteFile} = pUtil
	pReadFile(path.resolve(process.cwd(), userOption.file), 'utf-8').then((textContent) => {
		return pWriteFile(path.resolve(__dirname, '../assets', filename), textContent, 'utf-8')
	}).then(() => {
		log(chalk.blue(`添加模板文件${filename} - 完成`))
	}).catch(() => {
		log(chalk.red(`添加模板文件${filename} - 失败`))
	})
}
let addDir = (dirName, userOption) => {
	// 检查模析文件是否存在
	fsPromises.stat(path.resolve(__dirname, '../', config.asserts, `./${dirName}`)).then(stats => {
		log(chalk.red('该模板已经存在'))
		// 询问用户是否覆盖
	}).catch(() => {
		let sourcePath = path.resolve(process.cwd(), userOption.dir)
		let targetPath = path.resolve(__dirname, '../', config.asserts, `./${dirName}`)
		fsPromises.mkdir(targetPath).then(() => {
			createDir(sourcePath, targetPath)
		}).catch(err => {
			log(err)
		})
	})
}

let list = () => {
	Promise.resolve().then(() => {
		log('模板')
		return true
	}).then(() => {
		return fsPromises.readdir(path.resolve(__dirname, '../assets')).then((eleArr) => {
			let pArr = eleArr.map(ele => {
				return fsPromises.stat(path.resolve(__dirname, `../assets/${ele}`))
			})
			return Promise.all(pArr).then(arr => {
				return arr.map((stats, index) => {
					return {
						isDirectory: stats.isDirectory(),
						ele: eleArr[index],
					}
				})
			})
		}).then((arr) => {
			arr.forEach(item => {
				log(`${chalk.blue(item.ele)}	${item.isDirectory ? 'directory' : 'file'}`)
			})
			return true
		})
	}).then(() => {
		log('碎片')
		return
	}).then(() => {
		return fsPromises.readdir(path.resolve(__dirname, '../fragment')).then((eleArr) => {
			eleArr.forEach(ele => {
				let reg = /^(\w*)(?=\.js$)/
				log(`${chalk.blue(reg.exec(ele)[0])}`)
			})
			return
		})
	})
}
// 是否存在
let isexist = (file) => {
	let {pReaddir} = pUtil
	// 可以使用fsPromises重写
	pReaddir(path.resolve(__dirname, '../assets')).then(files => {
		if (files.includes(file)) {
			log(chalk.blue('true'))
		} else {
			log(chalk.yellow('false'))
		}
	}).catch(() => {
		log(chalk.red(`查询模板文件 - 失败`))
	})
}
let delFile = (filename) => {
	let {pRm} = pUtil
	pRm(path.resolve(__dirname, '../assets', filename)).then(() => {
		log(chalk.blue(`删除模板文件${filename} - 成功`))
	}).catch(() => {
		log(chalk.red(`删除模板文件${filename} - 失败`))
	})
}

let	initProj = (projName, userOption) => {
	let projPath = path.resolve(process.cwd(), userOption.path || '', projName)
	mkdirp(projPath).then(() => {
		return new Promise((s, j) => {
			childProcess.exec('npm init -y', {
	            cwd: projPath
	        }, (err) => {
	        	if (err) {
	        		j(err)
	        	} else {
		        	s()
	        	}
	        })
		})
	})
	// 暂时没用于配置文件，所以不创建此文件
	// create crtp.config.json
	// .then(() => {
	// 	// 未来从`<root>/data/`目录下取。
	// 	let cfg = '{}'
	// 	let {pWriteFile} = pUtil
	// 	return pWriteFile(path.resolve(projPath, './crtp.config.json'), cfg, 'utf-8')
	// })
	// op package.json
	.then(() => {
		if (
			(userOption['packageName'] && userOption['packageName'] !== projName) ||
			(userOption['packageVersion'] && userOption['packageVersion'] !== '1.0.0') ||
			(userOption['packageMain'] && userOption['packageMain'] !== 'index.js')
		) {
			let {pReadFile, pWriteFile} = pUtil
			return pReadFile(path.resolve(projPath, './package.json'), 'utf-8').then((cont) => {
				let p = JSON.parse(cont)
				if (userOption['packageName'] && userOption['packageName'] !== projName) {
					p.name = userOption['packageName']
				}
				if (userOption['packageVersion'] && userOption['packageVersion'] !== projName) {
					p.version = userOption['packageVersion']
				}
				if (userOption['packageMain'] && userOption['packageMain'] !== projName) {
					p.main = userOption['packageMain']
				}
				return pWriteFile(path.resolve(projPath, './package.json'), JSON.stringify(p, null, 2), 'utf-8')
			}).then(() => {return}).catch((e) => {
				log(chalk.red(`修改packag.json - 失败`))
			})
		} else {
			return
		}
	})
	// lerna init
	.then(() => {
		if (userOption.lernaInit) {
			return new Promise((s, j) => {
				childProcess.exec('lerna init', {
					cwd: projPath
				}, e => e ? j(e) : s())
			})
		} else {
			return
		}
	})
	// op readme.md
	.then(() => {
		if (userOption.readme) {
			return new Promise((s, j) => {
				// 因在子进程中处理，所以不会在主进程输出日志。
				childProcess.exec('crtp initFile readme.md', {
					cwd: projPath
				}, err => {
					err ? j(err) : s()
				})
			})
		} else {
			return
		}
	})
	// op .gitignore
	.then(() => {
		if (userOption.gitignore) {
			return new Promise((s, j) => {
				childProcess.exec('crtp initFile .gitignore', {
					cwd: projPath
				}, err => {
					err ? j(err) : s()
				})
			})
		} else {
			return
		}
	})
	.then(() => {
		log(chalk.blue(`创建项目${projPath} - 成功`))
	}).catch(() => {
		log(chalk.red(`创建项目${projPath} - 失败`))
	})
}

// for temp
let ipFn = (userOptions) => {
	// cwd
	let cmd = ''
	if (userOptions.npmrc) {
		cmd += 'crtp initFile .npmrc && '
	}
	if (userOptions.prettier) {
		cmd += 'crtp initFile .prettierignore && '
		cmd += 'crtp initFile .prettierrc.json && '
		cmd += 'npm i -E -D prettier && '
	}
	if (userOptions.readme) {
		cmd += 'crtp initFile readme.md && '
	}
	cmd = cmd.slice(0, -4)
	console.log('cmd:', cmd)
	// if (userOptions.npmrc) {
	// 	cmd = 'crtp initFile .npmrc && '
	// }
	// if (userOptions.npmrc) {
	// 	cmd = 'crtp initFile .npmrc && '
	// }
	cmd = cmd.slice(0, -4)
	new Promise((s, j) => {
		childProcess.exec(cmd, {
			// cwd: process.cwd()
		}, (err, data) => {
			err ? j(err) : s(data)
		})

	})
}

let changedFile = (userOption) => {
	let cmd = 'git log --name-only'
	if (userOption.after) {
		cmd += ` --after="${userOption.after}"`
	}
	if (userOption.before) {
		cmd += ` --before=${userOption.before}`
	}
	log(cmd)
	new Promise((s, j) => {
		childProcess.exec(cmd, {
			cwd: process.cwd()
		}, (err, data) => {
			err ? j(err) : s(data)
		})
	}).then(data => {
		let reg = /\n\S*\.md/g
		let res = data.match(reg)
		res = res.map(item => item.slice(1))
		res = [...new Set(res)]
		log(res)
	})
}

let configValidate = async (userOption) => {
	let configPath = path.resolve(process.cwd(), userOption.config)
	let cont = await fsPromises.readFile(configPath, 'utf-8')
	cont = JSON.parse(cont)
	if (typeof cont.assets !== 'string') {
		log(chalk.red(`配置项 assets - 错误`))
	} else if (!['npm', 'yarn', 'pnpm'].includes(cont.npmClient)) {
		log(chalk.red(`配置项 npmClient - 错误`))
	} else {
		log(chalk.blue(`配置文件 ${userOption.config} - 正确`))
	}
}

let initProject = (userOption) => {
	let cmd = `express ${userOption.projectName}`
	let cwd = path.resolve(process.cwd(), userOption.dir)
	let initProjectP = new Promise((s, j) => {
		childProcess.exec(cmd, {
			cwd
		}, (err, data) => {
			err ? j(err) : s(data)
		})
	}).then(() => {
		log(chalk.blue(`初始化项目${cwd} - 完成`))
		return new Promise((s, j) => {
			childProcess.exec(`crtp initFile .gitignore --file ${cwd}/${userOption.projectName}/.gitignore`, {
				cwd,
			}, err => {
				err ? j(err) : s()
			})
		})
	}).then(() => {
		return new Promise((s, j) => {
			childProcess.exec(`crtp initFile .yarnrc --file ${cwd}/${userOption.projectName}/.yarnrc`, {
				cwd,
			}, err => {
				err ? j(err) : s()
			})
		})
	}).then(() => {
		return pUtil.pWriteFile(`${cwd}/${userOption.projectName}/tsconfig.json`, `{
			"compilerOptions": {
			  "target": "es2016",
			  "module": "commonjs",
			  "outDir": "./tscDist",
			  "esModuleInterop": true,
			  "forceConsistentCasingInFileNames": true,
			  "strict": true,
			  "skipLibCheck": true
			},
			"include": ["src/**/*.ts"],
			"exclude": ["node_modules"]
		  }
		  `, 'utf-8').then(() => {
			  log(chalk.blue(`创建tsconfig.json - 完成`))
			  return 
		  })
	})
	// 移动或覆盖文件
	.then(() => {
		return new Promise((s, j) => {
			childProcess.exec(`crtp initFile expressTsIndex.ts --file ${cwd}/${userOption.projectName}/src/index.ts`, {
				cwd,
			}, err => {
				err ? j(err) : s()
			})
		})
	})
	.then(() => {
		return new Promise((s, j) => {
			childProcess.exec(`crtp initFile expressTsApp.ts --file ${cwd}/${userOption.projectName}/src/app.ts`, {
				cwd,
			}, err => {
				err ? j(err) : s()
			})
		})
	}).then(() => {
		mkdirp(`${cwd}/${userOption.projectName}/src/routes`).then(() => {
			return pUtil.pReadFile(`${cwd}/${userOption.projectName}/routes/index.js`, 'utf-8')
		})
		.then((textContent) => {
			textContent = textContent.replace(/var express = require\(['"]express['"]\);?/, '')
			textContent = "import * as express from 'express'\n" + textContent
			textContent = textContent.replace(/module.exports = router;?/, 'export default router')
			return pUtil.pWriteFile(`${cwd}/${userOption.projectName}/src/routes/index.ts`, textContent, 'utf-8').then(() => {
				log(chalk.blue(`初始化${cwd}/${userOption.projectName}/src/routes/index.ts - 完成`))
				return
			})
		})
	}).then(() => {
		mkdirp(`${cwd}/${userOption.projectName}/src/routes`).then(() => {
			return pUtil.pReadFile(`${cwd}/${userOption.projectName}/routes/users.js`, 'utf-8')
		})
		.then((textContent) => {
			textContent = textContent.replace(/var express = require\(['"]express['"]\);?/, '')
			textContent = "import * as express from 'express'\n" + textContent
			textContent = textContent.replace(/module.exports = router;?/, 'export default router')
			return pUtil.pWriteFile(`${cwd}/${userOption.projectName}/src/routes/users.ts`, textContent, 'utf-8').then(() => {
				log(chalk.blue(`初始化${cwd}/${userOption.projectName}/src/routes/users.ts - 完成`))
				return
			})
		})
	}).then(() => {
		return pUtil.pReadFile(`${cwd}/${userOption.projectName}/bin/www`, 'utf-8').then((textContent) => {
			// console.log(
			// 	textContent
			// )
			textContent = textContent.replace(/var app = require\(['"]\.\.\/app['"]\)/, "var app = require\('../src/app'\)")
			return pUtil.pWriteFile(`${cwd}/${userOption.projectName}/bin/www`, textContent, 'utf-8').then(() => {
				log(chalk.blue(`修改${cwd}/${userOption.projectName}/bin/www - 完成`))
				return
			})
		})
	})
	// 删除原文件
	.then(() => {
		// pUtil.pRm(`${cwd}/${userOption.projectName}/`)
		return new Promise((s, j) => {
			childProcess.exec(`rm -rf routes`, {
				cwd: `${cwd}/${userOption.projectName}`
			}, (err) => {
				err ? j(err) : s()
			})
		})
	}).then(() => {
		return new Promise((s, j) => {
			childProcess.exec(`rm app.js`, {
				cwd: `${cwd}/${userOption.projectName}`
			}, (err) => {
				err ? j(err) : s()
			})
		})
	})
	.then(() => {
		return new Promise((s, j) => {
			childProcess.exec(`rm -rf bin`, {
				cwd: `${cwd}/${userOption.projectName}`
			}, (err) => {
				err ? j(err) : s()
			})
		})
	})
	// 设置脚本
	.then(() => {
		return new Promise((s, j) => {
				childProcess.exec(`npm pkg set scripts.dev="concurrently \\"npx tsc --watch\\" \\"nodemon -q tscDist/index.js\\""`, {
				cwd: `${cwd}/${userOption.projectName}`
			}, (err) => {
				err ? j(err) : s()
			})
		})
	})
	.then(() => {
		return new Promise((s, j) => {
				childProcess.exec(`npm pkg set scripts.dev-ts-node="ts-node src/index.ts"`, {
				cwd: `${cwd}/${userOption.projectName}`
			}, (err) => {
				// err ? j(err) : s()
				if (err) {
					j(err)
				} else {
					s()
				}
			})
		})
	})
	.then(() => {
		return new Promise((s, j) => {
				childProcess.exec(`npm pkg set scripts.start="echo hi"`, {
				cwd: `${cwd}/${userOption.projectName}`
			}, (err) => {
				// err ? j(err) : s()
				if (err) {
					j(err)
				} else {
					log(chalk.blue('设置脚本 - 完成'))
					s()
				}
			})
		})
	})
	// 安装依赖
	.then(() => {
		log(chalk('安装依赖中'))
		return new Promise((s, j) => {
			childProcess.spawnSync('yarn', ['add', '--dev', 'typescript', 'ts-node', '@types/express', '@types/node', 'concurrently', 'nodemon', '@types/cookie-parser', '@types/morgan'], {
				cwd: `${cwd}/${userOption.projectName}`
			})
			// s(spinner)
			s()
		})
	})
	// .then(() => {
	// 	return new Promise((s) => {
	// 		childProcess.spawnSync('yarn', ['add', 'global', 'ts-node'], {
	// 			cwd: `${cwd}/${userOption.projectName}`
	// 		})
	// 		s()
	// 	})
	// })
	.then(() => {
		return new Promise((s) => {
			childProcess.spawnSync('yarn', ['install'], {
				cwd: `${cwd}/${userOption.projectName}`
			})
			s()
		})
	})
	.then(() => {
		// spinner.stop()
		log(chalk.blue('安装依赖 - 完成'))
		log(chalk.blue(`调整项目${cwd} - 完成`))
	})
	// 启动项目
	.then(() => {
		if (userOption.start) {
			log(chalk.blue(''))
			childProcess.execSync('npm run dev', {
				cwd: `${cwd}/${userOption.projectName}`
			}, () => {
				log(chalk.blue('已经启动'))
				log(chalk.blue('请访问 localhost:3000'))
			})
		} else {
			log(chalk.blue(''))
			log(chalk.blue('请执行'))
			log(chalk.blue(`cd ${cwd}/${userOption.projectName}`))
			log(chalk.blue('npm run dev'))
		}
	})
	.catch((err) => {
		log(chalk.red(`初始化项目${cwd} - 失败`))
		console.log('err', err)
	})
}

let extractPackage = () => {
	return pUtil.pReadFile(path.resolve(__dirname, '../package.json'), 'utf-8').then(res => {
		return JSON.parse(res)
	})
}

let precheck = (filePath) => {
	return pUtil.pReadFile(filePath, 'utf-8').then((textContent) => {
		// 在新加插入功能时注意修改此正则。
		let reg = /<template>.*<\/template>.*<script.*export\sdefault\sdefineComponent.*setup.*\/\/\sref.*\/\/\smethods.*\/\/\sevent\sfn.*\/\/\sexec.*return\s{.*\/\/sref.*\/\/\smethods.*\/\/\sevent\sfn.*<style/s
		return reg.test(textContent)
	})
}
let insertFragment = (fragment, filePath) => {
	// 取出片段中需要的界碑
	// 取出指定文件，判断是否全有需要的界碑。
	// 从配置文件中取position与界碑的对应关系
	let config = require(`../fragment/${fragment}.js`)
	// log('config', config)
	// let {pReadFile, pWriteFile} = pUtil
	return pUtil.pReadFile(filePath, 'utf-8').then((textContent) => {
		config.template.forEach(item => {
			let reg
			switch (item.position) {
				case 'end':
				default:
					reg = /(<\/template>)/s
					textContent = textContent.replace(reg, `${item.content}\n$1`)
					break
			}
		})
		config.script.forEach(item => {
			let reg
			switch (item.position) {
				case 'setup.ref':
					reg = /(?<=setup\s?\(.*)(\/\/\s?ref.*)(?=\/\/\s?computed.*\/\/\s?provide)/s
					textContent = textContent.replace(reg, `$1${item.content}\n\t\t\t`)
					break
				case 'setup.return.ref':
					reg = /(?<=setup\s?\(.*\/\/\s?exec.*return.*)(\/\/\s?ref.*)(?=\/\/\s?computed.*\/\/\s?methods.*)/s
					textContent = textContent.replace(reg, `$1${item.content}\n\t\t\t\t`)
					break
				case 'setup.event':
					reg = /(?<=setup\s?\(.*)(\/\/\s?event\sfn.*)(?=\/\/\s?watch.*\/\/\s?lifeCircle)/s
					textContent = textContent.replace(reg, `$1${item.content}\n\t\t\t`)
					break
				case 'setup.return.event': // x
					reg = /(?<=setup\s?\(.*\/\/\s?exec.*return\s{.*)(\/\/\s?event\sfn.*?)(?=})/s
					textContent = textContent.replace(reg, `$1\t${item.content}\n\t\t\t`)
					break;
			}
		})
		config.style.forEach(item => {
			let reg
			switch (item.position) {
				case 'end':
				default:
					reg = /(<\/style>)/s
					textContent = textContent.replace(reg, `${item.content}\n$1`)
					break;
			}
		})
		Object.entries(config.check) // [[k, v], ...]
		.forEach(([k, v]) => {
			// 是否有中
				// 是否有指定值
					// null
					// 插入单个值
				// 插入整个
			let reg // 正则
			let subString = '' // 取出成块的子串
			let componentStr = '' // 要插入的文本
			let execResult
			switch (k) {
				case 'importUtils':
					reg = /(?<=<script.*\/\/\sutils)(.*)(?=\/\/\scomponents.*export\sdefault\sdefineComponent)/s
					execResult = reg.exec(textContent)
					// log(execResult)
					if (execResult) { // 应该总是存在
						let importArr = execResult[0].split(/(\n)(?=.*import)/)
						// log(importArr)
						Object.entries(v).forEach(([package, eleArr]) => {
							reg = new RegExp(`from\\s['"]${package}['"]`)
							let index = importArr.findIndex(item => reg.test(item)) // 找到引入的包
							// log(index)
							if (index >= 0) {
								// 是否已注释
								reg = /^\s*\/\//
								if (reg.test(importArr[index])) {
									reg = new RegExp(`\\/\\/\\s?import\\s?{.*?}\\s?from\\s?['"]${package}['"]`, 's')
									importArr[index] = importArr[index].replace(reg, `import {${eleArr.join(',\n')}} from '${package}'`)
								} else {
									// 未注释
									reg = new RegExp(`(?<=import\\s?{)(.*)(?=}\\s?from\\s?['"]${package}['"])`, 's')
									let result = reg.exec(importArr[index])
									if (result) {
										let t = result[0]
										let compItemArr = []
										eleArr.forEach(ele => {
											reg = new RegExp(`[\\W]${ele}[\\W]`)
											if (!reg.test(t)) {
												compItemArr.push(ele)
											}
										})
										importArr[index] = `import { ${compItemArr.join(',\n')}, ${result.input.slice(result.index)}`
									}
								}
							} else {
								importArr.push(`import {${eleArr.join(',\n')},\n} from '${package}'\n`)
							}
						})
						textContent = textContent.slice(0, execResult.index) + importArr.join('') + textContent.slice(execResult.index + execResult[0].length)
					}
					break
				case 'importComponents':
					reg = /(?<=<script.*\/\/\scomponents)(.*)(?=\/\/\scheck.*export\sdefault\sdefineComponent)/s
					execResult = reg.exec(textContent)
					if (execResult) { // 应该总是存在
						let importArr = execResult[0].split(/(\n)(?=.*import)/)
						Object.entries(v).forEach(([package, eleArr]) => {
							reg = new RegExp(`from\\s['"]${package}['"]`)
							let index = importArr.findIndex(item => reg.test(item)) // 找到引入的包
							if (index >= 0) {
								// 是否已注释
								reg = /^\s*\/\//
								if (reg.test(importArr[index])) {
									// 已注释，直接插入
									reg = new RegExp(`\\/\\/\\s?import\\s?{.*?}\\s?from\\s?['"]${package}['"]`, 's')
									importArr[index] = importArr[index].replace(reg, `import {${eleArr.join(',\n')}} from '${package}'`)
								} else {
									// 未注释
									reg = new RegExp(`(?<=import\\s?{)(.*)(?=}\\s?from\\s?['"]${package}['"])`, 's')
									let result = reg.exec(importArr[index])
									if (result) { // 应该总是存在
										let t = result[0]
										let compItemArr = []
										eleArr.forEach(ele => {
											reg = new RegExp(`[\\W]${ele}[\\W]`)
											if (!reg.test(t)) {
												compItemArr.push(ele)
											}
										})
										importArr[index] = `import { ${compItemArr.join(',\n')}, ${result.input.slice(result.index)}`
									}
								}
							} else {
								importArr.push(`import {${eleArr.join(',\n')},\n} from '${package}'\n`)
							}
						})
						textContent = textContent.slice(0, execResult.index) + importArr.join('') + textContent.slice(execResult.index + execResult[0].length)
					}
					break
				case 'components':
					// // 取出一块代码。处理后插入。
					reg = /(?<=defineComponent\({.*name:\s?'\w*?',\n\s*)(\S.*)(?=\n\s*\/\/\s?directives)/s
					execResult = reg.exec(textContent)
					if (execResult) {
						// 处理后插入。
						subString = execResult[0]
						let arr = subString.split('\n')
						arr.forEach
						// 是否是注释状态
						reg = /\s*?\/\//
						if (reg.test(subString)) {
							componentStr = `components: {\n${v.join(',\n')}\n},`
						} else {
							reg = /(?<={)(.*)(?=})/s
							let tr = reg.exec(subString)
							let compItemArr = []
							if (tr) {
								let s = tr[0]
								v.forEach(item => {
									if (!s.includes(item)) {
										compItemArr.push(item)
									}
								})
								componentStr = `components: {${compItemArr.join(',\n')},\n${s.slice(1)}},`
							} else {
								// 不应该无匹配
							}
						}
						textContent = textContent.slice(0, execResult.index) + componentStr + textContent.slice(execResult.index + execResult[0].length)
					} else { // 未找到
						// 直接插入
						reg = /(?<=export\sdefault\sdefineComponent.*)(\s*\/\/\s?directives)/s
						componentStr = `components: {${v.join(',\n')}},`
						textContent = textContent.replace(reg, `\n${componentStr}$1`)
					}
					break;
				case 'type':
					reg = /(?<=<script.*\/\/\s?type\/interface)(.*)(?=export\sdefault\sdefineComponent)/s
					execResult = reg.exec(textContent)
					if (execResult) {
						// 处理后插入
						subString = execResult[0]
						let importArr = subString.split(/(\n)(?=.*import)/)
						importArr = importArr.filter(item => !!item)
						Object.entries(v).forEach(([package, eleArr]) => {
							reg = new RegExp(`from\\s['"]${package}['"]`)
							let index = importArr.findIndex(item => reg.test(item))
							// 是否引入引包
							if (index >= 0) {
								reg = /^\s*\/\//
								if (reg.test(importArr[index])) {
									// 有注释，直接插入
									// importArr[index] = `import type { ${eleArr.join(', ')}, } from '${package}'\n`
									reg = new RegExp(`\\/\\/\\s?import\\s?type\\s?{.*?}\\s?from\\s?['"]${package}['"]`, 's')
									importArr[index] = importArr[index].replace(reg, `import type{ ${eleArr.join(', ')}, } from '${package}'`)
								} else {
									// 未注释
									// 取出已经引入的内容
									reg = new RegExp(`(?<=import\\stype\\s?{)(.*)(?=}\\sfrom\\s?['"]${package}['"])`, 's')
									let result = reg.exec(importArr[index])
									if (result) {
										let t = result[0]
										let compItemArr = []
										eleArr.forEach(ele => {
											reg = new RegExp(`[\\W]${ele}[\\W]`)
											if (!reg.test(t)) {
												compItemArr.push(ele)
											}
										})
										importArr[index] = `import type { ${compItemArr.join(', ')}, ${result.input.slice(result.index)}`
									} else {
										// 应该总是存在
									}
								}
							} else {
								importArr.push(`\nimport type {${eleArr.join(', ')}, } from '${package}'\n\n`)
							}
						})
						textContent = textContent.slice(0, execResult.index) + importArr.join('\n') + textContent.slice(execResult.index + execResult[0].length)
					} else {
						// 应该总是有
					}
					break;
			}
		})
		return textContent
	}).then(textContent => {
		// log('textContent', textContent)
		return pUtil.pWriteFile(filePath, textContent, 'utf-8')
	}).then(() => {
		log(chalk.blue(`插入${fragment} - 完成`))
	})
}
// crtp init
// 初始化配置文件
// 测试通过
program
	.command('init')
	.description('初始化配置文件')
	.action(async function () {
		let projPath = path.resolve(process.cwd())
		let cont = await fsPromises.readFile(path.resolve(__dirname, '../assets/crtp.config.js'), 'utf-8')
		fsPromises.writeFile(path.resolve(projPath, './crtp.config.js'), cont)
		log(chalk.blue('初始化完成'))
	})

// crtp initFile <fileType> [--file ...]
// 以指定模板文件为模板创建文件。
// 测试通过
program
	.command('initFile <fileType>')
	// .option('-d, --debug', 'output extra debugging')
	// .option('--debug', 'output extra debugging')
	.description('以指定模板文件创建文件。')
	.option('--file [file...]', 'name and path of file')
	// Macro substitution
	.option('-st, --macroSubstitution [macroSubstitution...]', 'please input origin target') // 设置替换项可优化
	// 为所有模板文件开辟选项
	// .option('--config [configFilePath]', '指定配置文件的路径', './crtp.config.json')
	.option('--registry [registry]', '指定注册器。可选项: npm(default), yarn, tencent, cnpm, taobao, npmMirror, guazi', 'npm')
	.action((fileType, options) => {
		initFile(fileType, options)
	})

// crtp addFile <filename> --file <path/to/file.ext>
// 把指定文件设置为模板文件
// 测试通过
program
	.command('addFile <filename>')
	.description('把指定文件设置为模板文件')
	.option('--file <file>', 'path to file')
	.action((filename, options) => {
		addFile(filename, options)
	})

// crtp initDir <dirName> [--dir ...]
program
	.command('initDir <dirName>')
	.description('按指定模板目录生成目录')
	.option('--dir [dir...]', 'name and path of dir', [])
	.action((dirName, options) => {
		initDir(dirName, options)
	})

// crtp addDir <dirname> --dir <path/to/localDir>
// 把指定目录设置为模板目录
// 测试通过
program
	.command('addDir <dirName>')
	.description('把指定目录设置为模板目录')
	.option('--dir <dir>', 'path to local dir (绝对路径)')
	.action((dirName, options) => {
		addDir(dirName, options)
	})

// crtp list
// 列出所有模板文件
// 测试通过
// crtp ls
program
	.command('list')
	.alias('ls')
	.action(() => {
		list()
	})

// crtp -v
// crtp --Version
// 列出crtp-cli的版本号
// 测试通过
program
	// .command('-v')
	// .option('-v', 'list version of crtp-cli')
	// .option('--Version', 'list version of crtp-cli')
	.option('-v, --Version', 'list version of crtp-cli')
	.action(() => {
		extractPackage().then(json => {
			log(json.version)
		})
		// pUtil.pReadFile(path.resolve(__dirname, '../package.json'), 'utf-8').then(res => {
		// 	log(JSON.parse(res).version)
		// })
	})

// crtp isExistFile <filename>
// 查询指定模板文件是否存在
// 测试通过
program
	.command('isExistFile <filename>')
	.description('查询指定模板文件是否存在')
	.action((filename) => {
		isexist(filename)
	})

// crtp delFile <filename>
// 删除指定模板文件
// 测试通过
program
	.command('delFile <filename>')
	.description('删除指定模板文件')
	.action((filename) => {
		delFile(filename)
	})

// crtp initProj <projName> --path ./
// 待完善
program
	.command('initProj <projName>')
	.option('--path [path]', 'input path of project')
	// 开发几个个性packag.json中字段的选项
	// 以package-开头
	// .option('--packageName [pacme]', 'input name of package.json')
	// 会把中划线命名法改为驼峰命名法。
	.option('--packageName [packageName]',         'input name of package.json')
	.option('--packageVersion [packageVersion]',   'input version of package.json')
	.option('--packageMain [packageMain]',         'input main of package.json')
	.option('--lernaInit [lernaInit]',             '是否使用lerna init初始化项目？')       // 如何限定为boolean
	.option('--readme [readme]',                   '是否生成初始化readme.md', true)
	.option('--no-readme [readme]',                '是否生成初始化readme.md')             // 此选项的默认值是false.
	.option('--gitignore [gitignore]',             '是否生成初始化.gitignore', true)
	.option('--no-gitignore [gitignore]',          '是否生成初始化.gitignore')
	.action((projName, options) => {
		initProj(projName, options)
	})

// 暂定为ip
// crtp ip
// 还有好多工程化的初始化文件
program
	// .command('ip <projName>')
	.command('ip')
	// .option('--path [path]', '项目所在的目录')
	.option('--npmrc [npmrc]', 'npmrc', true)
	.option('--prettier [prettier]', 'prettier', true)
	.option('--readme [readme]', 'readme', true)
	.action((options) => {
		ipFn(options)
	})

// 列出指定时间范围内有改变的文件
// crtp chengedFile <range>
program
	.command('changedFile')
	.description('列出指定时间范围内有改变的文件')
	.option('--after [after]', '开始时间', utils.afterDay(7))
	.option('--before [before]', '结束时间')
	.action((options) => {
		changedFile(options)
	})

// 验证配置文件是否正确
// crtp configValidate --config
// 测试通过
program
	.command('configValidate')
	.description('验证配置文件是否正确')
	// 设置了默认值
	.option('--config [configFilePath]', '指定配置文件的路径', './crtp.config.json')
	.action((options) => {
		configValidate(options)
	})

// 创建express&typescript项目
// crtp configValidate --config
// 测试通过
program
	.command('initProject')
	.description('创建express&typescript项目')
	// 设置了默认值
	.option('--dir [dir]', '指定项目所在的目录', './')
	.option('--projectName [projectName]', '项目的名称', 'project-name')
	.option('--start [start]', '是否启动', false)
	.action((options) => {
		path.resolve(process.cwd(), options.dir, options.projectName)
		// 校验
		// if (path.resolve(process.cwd(), options.dir))
		pUtil.pReaddir(path.resolve(process.cwd(), options.dir)).then((files) => {
			if (files.includes(options.projectName)) {
				log(chalk.red(`已经存在指定目录，不能创建项目。 - 失败`))
			} else {
				// 初始化项目
				initProject(options)
			}
		})
	})

// 插入代码片断
// crtp insert modal --file ./index.vue
program
	.command('insert <fragment>')
	.description('为指定的文件插入指定代码片段')
	.option('--file <file>', '指定文件')
	.action((fragment, options) => {
		// 判断版本。beta版本可用，gamma版本不可用
		extractPackage().then((json) => {
			if (json.version.includes('beta') || json.version.includes('alpha')) {
				return true
			} else {
				log(chalk.red('当前不是alpha/beta版本，不能使用此功能。'))
				return Promise.reject()
			}
		}).then(() => {
			// 预检文件是否满足插入条件
			let filePath = path.resolve(process.cwd(), options.file)
			// 预检通过才能使用。
			if (precheck(filePath)) {
				// log(true)
				insertFragment(fragment, filePath)
			} else {
				log(chalk.red(`${filePath}缺少相关界碑，无法执行此命令。`))
			}

		}).catch(() => {})
	})

// 整理代码
// crtp lint --file ./index.vue
// program
// 	.command('lint')
// 	.description('整理代码')
// 	.option('--file <file>', '指定文件')
// 	.action((fragment, options) => {
// 		// 预检文件是否满足插入条件
// 	})
// 因与eslint/pritter功能相近，先不开发它。

// 




program.parse(process.argv)

