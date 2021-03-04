const fs = require('fs');
const path = require('path');
const dirs = require('./dirs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.CURRENT_ENV !== 'dev';

// 处理html文件
const minifyOptions = isDev
  ? {
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

      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyURLs: true
    }
  : {};

const entries = {};
const pages = [];

const files = fs.readdirSync(dirs.pages);
const pageDirs = files.filter((name) => {
  return fs.statSync(path.resolve(dirs.pages, `./${name}`)).isDirectory();
});

pageDirs.forEach((name) => {
  let templatePath = path.resolve(dirs.pages, `./${pageDirs}/index.ejs`);
  if (!fs.existsSync(templatePath)) {
    templatePath = path.resolve(dirs.pages, './common.ejs');
  }

  const indexPath = path.resolve(dirs.pages, `./${name}/index.tsx`);

  entries[name] = [indexPath];

  pages.push(
    new HtmlWebpackPlugin({
      template: templatePath, // 模板文件入口 ejs可以动态读取webpack参数
      filename: `${name}.html`, // 输入html文件名
      hash: false, // 在文件名中以唯一hash值命名文件
      inject: "body", // 1. true body 所有js资源插入body底部 2. head 所有资源插入到head 3. false 不把资源插入到模板中
      compile: true,
      cache: true, // 对应chunck修改后 修改emit文件
      showErrors: true, // 是否把错误信息输出到html页面
      chunks: [name], // 多页面时 需要把每个页面name  对应到 这边来 entry[name] === chunk[name]
      excludeChunks: [], // 多页面时 可以控制哪些页面不注入 chunck 也是使用页面 name 来区分
      title: "Webpack App", // 当模板使用 ejs 时，那么就把对用
      xhtml: false, // link 标签是否自闭合
      favicon: path.resolve(dirs.root, './public/favicon.ico'),
      minify: minifyOptions
    })
  );
});

module.exports = { entries, pages };
