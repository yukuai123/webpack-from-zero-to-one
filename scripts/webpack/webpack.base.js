const { dirs, modules, entries } = require("./base");

module.exports = {
  // webpack解析时的路径
  context: dirs.src,
  entry: entries,
  resolve: {
    modules: [dirs.src, dirs.modules],
    extensions: [".js", ".ts", ".tsx", ".jsx", ".json"], // 在引入此类后缀文件时可以不带后缀
    alias: {
      "~": dirs.src,
    },
  },
  module: modules,
};
