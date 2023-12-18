// import 
// const childProcess = require('child_process')
import spawn from 'cross-spawn'

let clog = console.log

let fn = () => {
    clog('"hi!" by crtp-cli')
}

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
initFile = () => {
    // chil
    const child = spawn.sync('npm', ['run', 'hi']);
}
// const spawn = require('cross-spawn');
 
// // Spawn NPM asynchronously
// const child = spawn.sync('npm', ['list', '-g', '-depth', '0'], { stdio: 'inherit' });
 

export default fn
export {
    fn,
    initFile,
}