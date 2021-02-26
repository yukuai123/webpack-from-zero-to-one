// 生产 与 开发环境的modules
const isDev = process.env.NODE_ENV !== 'prod';

const dirs = require("./dirs");

const rules = [
  {
    test: /\.(tsx?|jsx?)$/,
    include: dirs.src,
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          compact: !isDev,
        },
      },
    ],
  },
  {
    test: /\.(ts|tsx)$/,
    include: dirs.src,
    exclude: /node-modules/,
    use: ["babel-loader", "ts-loader"],
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?/, // 图片处理
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 5 * 1000,
          include: dirs.src,
          name: "images/[path][name].[ext]",
          // fallback: 'file-loader', 超过limit大小时 可使用 file-loader 进行图片处理
        },
      },
    ],
  },
  {
    test: /\.ejs$/,
    loader: "ejs-loader",
    options: {
      esModule: false, // 使用 commonJs进行加载模块
    },
  },
  {
    test: /\.(json|conf)$/,
    include: dirs.src, // 哪些模块需要使用此loader加载
    exclude: dirs.modules, // 哪些模块不需要
    loader: "json-loader",
  },
];

module.exports = {
  strictExportPresence: true,
  rules,
};
