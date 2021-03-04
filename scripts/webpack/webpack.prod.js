const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const PostcssSafeParser = require('postcss-safe-parser');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const basic = require('./webpack.base');
const { dirs, pages } = require('./base');

const isDev = process.env.CURRENT_ENV !== 'prod';
const isAnalysis = !!process.env.ANAL;
const { name } = require(dirs.package);

let plugins = [
  ...pages,
  new MiniCssExtractPlugin({
    filename: 'css/[name].[chunkhash:8].css',
    chunkFilename: 'css/[name].[chunkhash:8].chunk.css'
  }),
  new CompressionPlugin({
    algorithm: 'gzip', // 压缩
    test: /\.(js|css)$/,
    threshold: 10240,
    minRatio: 0.8
  }),
  // 结合 cross-env 进行生产 开发环境区分
  new webpack.DefinePlugin({
    'process.env.CURRENT_ENV': JSON.stringify(process.env.CURRENT_ENV),
    'process.env.ANAL': !!process.env.ANAL
  }),
];

isAnalysis && (plugins = [new BundleAnalyzerPlugin()].concat(plugins));

module.exports = {
  ...basic,

  mode: 'production',

  devtool: false,

  output: {
    path: dirs.dist,
    publicPath: '/',
    globalObject: 'this',
    jsonpFunction: `webpackJsonp${name}`, // webpack内部唯一的全局变量
    filename: 'js/bundle_[name].[chunkhash:8].min.js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
  },

  optimization: {
    minimize: !isDev,
    runtimeChunk: {
      name: (entrypoint) => {
        return `runtime-${entrypoint.name}`;
      }
    },
    splitChunks: {
      // 代码分割时默认对异步代码生效，all：所有代码有效，inital：同步代码有效
      chunks: 'all',
      name: false
    },

    minimizer: [
      new TerserPlugin({
        // tree shake
        terserOptions: {
          parse: {
            // terser官方推荐，如果不想兼容ie11的话，最好是配置为最新的
            ecma: 8
          },
          compress: {
            ecma: 3,
            warnings: false,
            // true的时候有bug，官方有介绍
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            inline: 2
          },
          mangle: {
            // 支持safari
            safari10: true
          },
          keep_classnames: false,
          keep_fnames: false,
          output: {
            ecma: 5,
            comments: false,
            // 关闭的时候对emoji有影响
            ascii_only: true
          }
        },
        sourceMap: false
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          parse: PostcssSafeParser,
          // eslint-disable-next-line indent
          map: false,
          cssProcessorPluginOptions: {
            preset: ['default', { minifyFontValues: { removeQuotes: false } }]
          }
        }
      })
    ]
  },

  plugins
};
