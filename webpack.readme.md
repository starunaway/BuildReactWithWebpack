# webpack 参数

## js 兼容性处理

使用 babel 对 js 进行处理，做版本转换
基本 js 处理： @babel/preset-env
需要做兼容性处理时，要按需加载,使用 core-js

```json
	presets:[
		'@babel/preset-env',
		{
			// 按需加载
			useBuiltIns: 'usage',
			// 指定core-js 版本
			corejs: {
				version: 3,
			},
			// 指定兼容到哪个版本的浏览器
			targets: {
				chrome: '60',
				ie: '9',
			},
		},
	]

```
