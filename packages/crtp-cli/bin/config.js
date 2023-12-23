// 相对于<root>/bin/index.js文件。
module.exports = {
	'ASSETSREADMEMD': '../assets/readme.md',
	'ASSETSDEMOMD': '../assets/demo.md',
	'ASSETSBASECARS': '../assets/baseCars.vue',
	'ASSETSBASEDEMOPAGE': '../assets/baseDemoPage.vue',
	'ASSETSCOMPDOC': '../assets/compDoc.md',
	FRAGEMENTDIR: '../fragment',
	template: {
		positionEnum: ['end'],
		contentConstructorStringEnum: ['String'],
	},
	script: {
		positionEnum: ['setup.ref', "setup.event", "setup.return.ref", "setup.return.event"],
		contentConstructorStringEnum: ['String'],
	},
	style: {
		positionEnum: ['end'],
		contentConstructorStringEnum: ['String'],
	},
	check: {
		keyEnum: ['importUtils', 'importComponents', 'type', 'components'],
		valueValueConstructorStringEnum: 'String[]',
	}
}