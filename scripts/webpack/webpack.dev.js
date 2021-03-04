const webpack = require('webpack');
const { dirs, pages } = require('./base');
const basic = require('./webpack.base');

module.exports = {
  ...basic,

  mode: 'development',

  output: {
    path: dirs.dist,
    publicPath: '/',
    filename: 'js/bundle_[name].js'
  },

  devtool: '#cheap-module-eval-source-map', // source-map 调试时使用

  devServer: {
    //启动服务器端口
    port: 8500,
    //默认是localhost，只能本地访问
    host: '0.0.0.0',
    //自动打开浏览器
    open: false,
    //启用模块热替换
    hot: true,
    //启用gzip压缩
    compress: true,
    // 告诉开发服务器禁止显示诸如 Webpack 捆绑包信息之类的消息。 错误和警告仍将显示。
    // noInfo: true,
    quiet: true,
    // 出现编译器错误或警告时，在浏览器中显示全屏覆盖。 如果只想显示编译器错误：
    overlay: true,
    // 当使用 HTML5 History API 时, 所有的 404 请求都会响应 index.html 的内容
    historyApiFallback: true
    // 告诉服务器内容的来源。仅在需要提供静态文件时才进行配置。devServer.publicPath 将用于确定 bundle 的来源，并具有优先级高于 contentBase。
    // contentBase: dirs.dist,
  },

  plugins: [
    ...pages,
    // 结合 cross-env 进行生产 开发环境区分
    new webpack.DefinePlugin({
      'process.env.CURRENT_ENV': JSON.stringify(process.env.CURRENT_ENV),
    }),
  ]
};
