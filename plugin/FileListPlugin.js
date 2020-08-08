class FileListPlugin {
  constructor(options) {
    this.filename = options.filename;
  }

  apply(compiler) {
    compiler.hooks.emit.tap('FileListPlugin', (compilcation) => {
      //   console.log('FileListPlugin', compilcation.assets);
      let assets = compilcation.assets;
      let content = '##   FileName    Siz \n';
      Object.entries(assets).forEach(([filename, statObj]) => {
        // console.log(filename, statObj.node());

        content += `- ${filename} ${statObj.size()} \n`;
      });
      assets[this.filename] = {
        source() {
          return content;
        },
        size() {
          return content.length;
        },
      };
    });
  }
}

module.exports = FileListPlugin;
