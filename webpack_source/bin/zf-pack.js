#! /usr/bin/env node

let path = require('path');
// 配置文件
let config = require(path.resolve('webpack/webpack.config.js'));

const Compiler = require('../lib/Compiler');

let compiler = new Compiler(config());
// 运行编译
compiler.run();