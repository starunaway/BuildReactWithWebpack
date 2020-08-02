let path = require('path');
let fs = require('fs');
class Compiler {
  constructor(config) {
    this.config = config;
    // 入口文件的路径
    this.entryId;
    // 所有依赖关系
    this.modules = {};
    //入口路径
    this.entry = config.entry;
    // 工作路径
    this.root = process.cwd();
  }

  getSource(modulePath) {
    return fs.readFileSync(modulePath, 'utf8');
  }

  buildModule(modulePath, isEntry) {
    let source = this.getSource(modulePath);
    let moduleName = './' + path.relative(this.root, modulePath);
    console.log(moduleName);
  }

  emitFile() {}

  run() {
    this.buildModule(path.resolve(this.root, this.entry), true);
    this.emitFile();
  }
}
module.exports = Compiler;

// exports.default.Compiler = Compiler;
