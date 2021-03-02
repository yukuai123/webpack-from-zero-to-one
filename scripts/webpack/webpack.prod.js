const path = require("path");
const webpack = require("webpack");
const { dirs } = require("./base");
const basic = require("./webpack.base");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  ...basic,

  mode: "production",

  output: {
    path: dirs.dist,
    filename: "js/bundle_[name].[chunkhash:8].min.js",
    chunkFilename: "js/[name].[chunkhash:8].chunk.js",
    publicPath: "/",
    jsonpFunction: `webpackJsonp${appName}`,
    globalObject: "this",
  },

  devtool: "#cheap-module-eval-source-map", // source-map 调试时使用

  plugins: [
    // 结合 cross-env 进行生产 开发环境区分
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),

    // 多页面就实例化多次
    new HtmlWebpackPlugin({
      template: path.resolve(dirs.pages, "./common.ejs"), // 模板文件入口 ejs可以动态读取webpack参数
      filename: "index.html", // 输入html文件名
      hash: false, // 在文件名中以唯一hash值命名文件
      inject: "body", // 1. true body 所有js资源插入body底部 2. head 所有资源插入到head 3. false 不把资源插入到模板中
      compile: true,
      favicon: path.resolve(dirs.root, "./public/favicon.ico"), // 网站图标
      minify: false, // false || {} 压缩混淆配置 html-minifier参数配置
      cache: true, // 对应chunck修改后 修改emit文件
      showErrors: true, // 是否把错误信息输出到html页面
      chunks: "all", // 多页面时 需要把每个页面name  对应到 这边来 entry[name] === chunk[name]
      excludeChunks: [], // 多页面时 可以控制哪些页面不注入 chunck 也是使用页面 name 来区分
      title: "Webpack App", // 当模板使用 ejs 时，那么就把对用
      xhtml: false, // link 标签是否自闭合

      minify: {
        //清除script标签引号
        removeAttributeQuotes: true,
        //清除html中的注释
        removeComments: true,
        //清除html中的空格、换行符
        //将html压缩成一行
        collapseWhitespace: false,
        //压缩html的行内样式成一行
        minifyCSS: true,
        //清除内容为空的元素（慎用）
        removeEmptyElements: false,
        //清除style和link标签的type属性
        removeStyleLinkTypeAttributes: false,
      },
    }),
  ],
};
