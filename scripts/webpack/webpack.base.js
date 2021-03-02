const path = require("path");
const { dirs, modules } = require("./base");

module.exports = {
  // webpack解析时的路径
  context: dirs.src,
  entry: path.join(dirs.pages, "./index/index"),
  resolve: {
    modules: [dirs.src, dirs.modules],
    extensions: [".js", ".ts", ".tsx", ".jsx", ".json"], // 在引入此类后缀文件时可以不带后缀
    alias: {
      "~": dirs.src,
    },
  },
  output: {
    path: dirs.dist,
    filename: "index.js",
    publicPath: "./",
  },
  module: modules,
};
