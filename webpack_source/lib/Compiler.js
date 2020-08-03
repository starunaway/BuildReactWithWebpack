let path = require('path');
let fs = require('fs');
let babylon = require('babylon');
let t = require('@babel/types');
let traverse = require('@babel/traverse').default;
let generator = require('@babel/generator').default;
let ejs = require('ejs');

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

  parse(source, parentPath) {
    // AST解析语法树
    let ast = babylon.parse(source);
    let dependencies = []; // 依赖数组
    traverse(ast, {
      CallExpression(p) {
        let node = p.node;
        if (node.callee.name === 'require') {
          node.callee.name = '__webpack_require__';
          let moduleName = node.arguments[0].value;
          moduleName = moduleName + (path.extname(moduleName) ? '' : '.js');
          moduleName = './' + path.join(parentPath, moduleName);
          dependencies.push(moduleName);
          node.arguments = [t.stringLiteral(moduleName)];
        }
      },
    });
    let sourceCode = generator(ast).code;
    return {sourceCode, dependencies};
  }

  buildModule(modulePath, isEntry) {
    let source = this.getSource(modulePath);
    let moduleName = './' + path.relative(this.root, modulePath);
    if (isEntry) {
      //保存入口
      this.entryId = moduleName;
    }
    // 解析 把source进行改造，返回一个依赖列表
    let {sourceCode, dependencies} = this.parse(source, path.dirname(moduleName));
    //  把相对路径和模块中的内容对应起来

    this.modules[moduleName] = sourceCode;

    dependencies.forEach((dep) => {
      this.buildModule(path.join(this.root, dep), false);
    });
  }

  emitFile() {
    // 输出路径
    let main = path.join(this.config.output.path, this.config.output.filename);
    // 模板路径
    let templateStr = this.getSource(path.join(__dirname, 'main.ejs'));
    let code = ejs.render(templateStr, {
      entryId: this.entryId,
      modules: this.modules,
    });
    this.assets = {};
    this.assets[main] = code;
    fs.writeFileSync(main, this.assets[main]);
  }

  run() {
    this.buildModule(path.resolve(this.root, this.entry), true);
    console.log(this.modules, this.entryId);
    this.emitFile();
  }
}
module.exports = Compiler;

// exports.default.Compiler = Compiler;
