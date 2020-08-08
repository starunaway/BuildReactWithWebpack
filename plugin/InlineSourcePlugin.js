const HtmlWebpackPlugin = require('html-webpack-plugin');

class InlineSourcePlugin {
  constructor(options) {
    this.reg = options.match;
  }

  processTags = (data, compilation) => {
    let headTags = [];
    let bodyTags = [];
    data.headTags.forEach((headTag) => {
      headTags.push(this.processTag(headTag, compilation));
    });

    data.headTags.forEach((bodyTag) => {
      bodyTags.push(this.processTag(bodyTag, compilation));
    });
    return {
      ...data,
      headTags,
      bodyTags,
    };
  };

  processTag = (tag, compilation) => {
    console.log(tag);
    let newTag, url;
    if (tag.tagName === 'link' && this.reg.test(tag.attributes.href)) {
      newTag = {
        tagName: 'style',
      };
      url = tag.attributes.href;
    }
    if (tag.tagName === 'script' && this.reg.test(tag.attributes.src)) {
      newTag = {
        tagName: 'script',
      };
      url = tag.attributes.src;
    }
    if (url) {
      newTag.innerHTML = compilation.assets[url].source();
      delete compilation.assets[url];
      return newTag;
    }

    return tag;
  };

  apply(compiler) {
    compiler.hooks.compilation.tap('InlineSourcePlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('alterPlugin', (data, cb) => {
        console.log(data);
        data = this.processTags(data, compilation);
        cb(null, data);
      });
    });
  }
}

module.exports = InlineSourcePlugin;
