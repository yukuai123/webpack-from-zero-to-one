const path = require('path');
const root = path.resolve(__dirname, '../../../');

const dirs = {
  // 根目录
  root: root,
  // 配置目录
  config: path.resolve(root, './scripts/webpack'),
  // 源码目录
  src: path.resolve(root, './src'),
  // 生成目录
  dist: path.resolve(root, './dist'),
  // modules
  modules: path.resolve(root, './node_modules'),
  // src/pages
  pages: path.resolve(root, './src/pages')
};

module.exports = dirs;
