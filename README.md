# 从零开始构建 react。使用 webpack+react 全家桶

从无到有的构建 react 应用，再到 webpack 的配置优化

## npm init

现在前端的基础设施已经离不开 `npm`这个大的基础环境了。本文也是在此基础上进行讲解。欲食用，请确保已经成功安装了`node` 及 `npm`

找一个自己心怡的风水宝地，在命令行中按下 npm init，按照提示随便输入一些简介，就生成了如下一个文件。文件内容未必一样，长的像就可以了

```json
{
  "name": "buildreactwithwebpack",
  "version": "1.0.0",
  "description": "从零开始构建react。使用webpack+react全家桶",
  "main": "index.js",
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config webpack/webpack.config.js ",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/starunaway/BuildReactWithWebpack.git"
  },
  "author": "starunaway",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/starunaway/BuildReactWithWebpack/issues"
  },
  "homepage": "https://github.com/starunaway/BuildReactWithWebpack#readme"
}
```

## 为什么使用 webpack

首先来看一下原有的前端开发过程

在项目目录下创建一个 `html` 文件。内容如下：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>起步</title>
    <script src="https://unpkg.com/moment@2.24.0"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```

可以看到在 `index.html`文件中，引入了 `moment`库和本地编写的 `index.js`文件

在项目目录下创建 `src`文件夹，在 `src` 下面创建一个 `index.js`文件。`index.js`文件内容如下，功能是显示当前的时间。（不要问为什么显示个时间还得引入一个库，如果问就是我懒）

```js
function component() {
  var element = document.createElement('div');
  element.innerHTML = 'hello webpack';
  element.innerHTML += moment().format('YYYY-MM-DD HH:mm:ss');
  return element;
}

document.body.appendChild(component());
```

ps:这部分内容是[webpack 官网](https://www.webpackjs.com/concepts/)上的，简单无脑通俗易懂，就直接借用了

如果需要引入一个公共的包，需要在`script`标签中引入网络上的文件路径。如果是本地文件，需要引入本地的相对路径。
这么做在文件数量较少的情况下还好，但是如果有几十上百个文件呢？

1. 如何知道每个依赖包何时被使用？
1. 如何知道哪个文件是否真正的被使用了？
1. 如果保证文件的引入顺序不会出错呢？

## 初次使用 webpack 进行打包

接下来就来尝试一下 `webpack`吧。相信`webpack`，它会帮我们管理好这一切。  
在项目目录下创建`dist`文件夹，在`dist`下面创建 `index.html`文件

```html
<!DOCTYPE html>
<html>
  <head>
    <title>hello</title>
  </head>
  <body>
    <script src="index.js"></script>
  </body>
</html>
```

将 `script` 内引入的资源路径修改一下，接下来使用 `npm i -S moment` 安装一下 `moment` 包。并修改一下`src/index.js`的内容
唔，其实也没啥好修改的，就是在顶部引入一下 `moment`

```js
import moment from 'moment';

// 以下还是原来的
```

接下来就要开始使用 `webpack` 了，是不是有点小激动?

首先运行 `npm i -D webpack webpack-cli`，这俩货缺一不可灰常重要。其中 `webpack-cli`是 `webpack4.0`之后才需要的

接下来在`package.json`中添加一行`start`命令：`npx webpack`

ps：`npx`是调用项目内部安装的模块，主要是在命令行下。这里直接写成`webpack`也是可以的。

```json
//.....
    "start": "npx webpack",


//.....
  "devDependencies": {

    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.11",

  }


//.....

```

在命令行中运行 `npm start` ，将 `dist/index.html` 文件在浏览器中打开瞅一眼。真神奇，和刚才是一样一样的(除了日期，别抬杠)

## 使用 webpack 的配置文件

`webpack` 的配置项有很多很多很多，虽然可以通过命令行的方式一个个传入进去，但是每次都得写一堆配置，怎么能对得起天生懒惰的程序员！所以 `webpack` 提供了通过配置文件写入配置的方法。来试一下

在项目目录下创建 `webpack.config.js`文件

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

简单明了，知道单词的意思就知道是干啥的了。如上。`entry` 就是打包的入口，`output`就是文件输出的路径

现在，把 `dist/index.html` 文件下 `script` 引入的路径由`index.js` 替换为 `bundle.js`。重新运行 `npm start` 试一下

## webpack 打包资源

`webpack` 只有这点功能吗？作为前端三剑客，`css` `就不支持吗？当然不是！webpack` 还可以打包各种资源，包括但不限于 `css/less/scss`，各种图片,字体，数据。但是有一个前提，需要先配置一下 `loader`。来试一下

首先在 `src` 目录下创建一个 `style.less` 文件（用 `less` 习惯了，关键是 `less` 不需要下其他的 `loader`，和`css`通用，省事）

```less
.time {
  color: blue;
}
```

在 `src/index.js` 中给元素加上`time`样式,并引入 `style.less`

```js
import moment from 'moment';
// 引入文件
import './style.less';

function component() {
  var element = document.createElement('div');
  element.innerHTML = 'hello webpack';
  element.innerHTML += moment().format('YYYY-MM-DD HH:mm:ss');

  // 添加类名
  element.classList.add('time');
  return element;
}
document.body.appendChild(component());
```

接下来修改一下 `webpack.config.js`,和 `entry` 平级，创建以下内容

```js

  entry:{},
  output:{},
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
```

顾名思义，模块的规则是什么\_\_\_\_？填空题。更高级的用法，以后慢慢讲

使用`npm i -D style-loader css-loader`,安装一下这俩 `loader`。安装完成后重新运行`npm start`。再次打开 `dist/index.html`，看看文字颜色

## 使用多入口

现在，我们在 html 文件里只引入了一个 js 文件。如果我们需要有多个 js 文件需要引入呢？我们需要手动去添加每一个文件吗？显然，这是不现实的。作为一个懒惰的程序员，怎么可能在这种事情上动手动脚呢。

那么怎么自动添加**文件入口**呢？来搞一下

嗯，现在`src`目录下创建一个新的`js`文件 `src/print.js`

```js
export default function printMe() {
  console.log('I get called from print.js!');
}
```

修改`src/index.js`如下：

```js
import moment from 'moment';
import printMe from './print';
import './style.less';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.innerHTML = 'hello webpack';
  element.innerHTML += moment().format('YYYY-MM-DD HH:mm:ss');

  element.classList.add('time');
  element.appendChild(btn);

  return element;
}
document.body.appendChild(component());
```

什么叫多入口？就是在 `index.html` 里面同时引入多个文件，而不是把这些文件打包到一起。为什么要引入多个文件而不是打包成一个？一个简单的场景，首屏加载速度，一开始的时候加载很多暂时用不到的数据，浪费

言归正传，怎么使用 `webpack` 来进行操作呢？

```js
module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    //....
  },
};
```

很简单，在配置文件里修改 `entry` 和 `output`。其中 `output.filename`里 `[name]` 的 `name`，就是 `entry` 下的 `key` 值。至于怎么优化，接下来用到的时候再讨论。

现在，修改`dist/index.html` 文件

```html
<!DOCTYPE html>
<html>
  <head>
    <title>hello</title>
    <script src="./print.bundle.js"></script>
  </head>
  <body>
    <script src="./app.bundle.js"></script>
  </body>
</html>
```

重新运行 `npm start`,在浏览器打开，瞅一眼

## 使用插件来管理入口

有没有发现每次修改完文件，需要重新打包的时候,都得修改一下 `index.html？`真的麻烦，怎么才能变得更懒呢？那就得借助插件了。插件是什么？不同于`loader`用来处理各式各样的资源，插件目的在于解决 `loader` 无法实现的其他事。`webpack` 提供了很多插件。具体可以查看 [这里](https://webpack.js.org/loaders)

来来来，打开命令行，跟我一起输入 `npm i -D html-webpack-plugin`  
然后修改一下`webpack.config.js`

```js
module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  //    新增这里
  plugins: [
    new HtmlWebpackPlugin({
      title: 'HtmlWebpackPlugin',
    }),
  ],
};
```

接下来可以删除一下`dist`文件夹，运行一下`npm start`，走你~

## 在每次构建前清理文件

如果你细心的话，会发现 dist 文件夹下有一堆东西，每次构建时其实有多文件是占那啥不那啥的，并且如果上生产环境，万一不小心添加一些没用但还产生影响的文件咋办？难道每次构建前都要手动去删除一下吗？这也太**不懒**了!

想想上一节对插件的定义？是不是想找一个插件来帮你做这件事？别说，还真有

命令行,`npm i -D clean-webpack-plugin` 走起

修改`webpack.config.js`，

```js
// ... require 其他的一堆包
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: {},
  //   ...其他的配置
  plugins: [
    new HtmlWebpackPlugin({
      title: 'HtmlWebpackPlugin',
    }),
    //  新增这个插件
    new CleanWebpackPlugin(),
  ],
};
```

再次运行`npm start`，有木有发现 `dist` 每次都只有这次打包的内容 !

## 开发时加入代码原始位置的映射

`webpack` 打包源代码时，把文件都打包到一起了，很难追踪到 `error`(错误) 和 `warning`(警告) 在源代码中的原始位置。  
例如，如果将三个源文件（`a.js`,`b.js`和`c.js`）打包到一个 `bundle(bundle.js)`中，而其中一个源文件包含一个错误，那么堆栈跟踪就会直接指向到 `bundle.js`。 毕竟咱不是神，只是个懒惰的程序员，bug 是肯定存在的，又不想一行行翻代码，所以，就需要开启新的配置项了.

在配置文件中新增一个新的字段

```js
module.exports = {
  //  ...
  devtool: 'inline-source-map',
};
```

随便写个 bug，现在会准确的告诉你是哪一行

## 使用 webpack-dev-server 实时重新加载

## 开启模块热替换

## 引入 react

## 对 webpack 按环境进行配置
