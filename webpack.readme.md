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

## eslint 支持环境变量

配置 eslint 后，eslint 需要支持浏览器的全局变量
在 package.json 中配置

```json

eslintConfig:{
	"extends":"airbnb-base",
	"env":{
		"browser":true
	}
}

```

## js 懒加载和预加载

需要在自己写的 js 代码中 ，自己处理

```js
//  import {aaa} from "./aaa"
// 使用懒加载时，可以指定一个名字，避免每次生成新的
// 开启预加载，在网络空闲时在后台慢慢下载，有兼容性问题
import(/* webpackChunkName:'test',webpackPreload:true */ './aaa').then(({aaa}) => {
  aaa();
});
```
