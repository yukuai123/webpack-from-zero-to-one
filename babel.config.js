module.exports = {
  // preset 可以作为 Babel 插件的组合 每一个presets 都包含了所属的所有plugins
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage", // 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加。
        corejs: { version: 3, proposals: true }, // 这样会开启core-js支持的所有提案 ，默认是2
      },
    ],
    "@babel/preset-react", // 能够转换识别jsx语法
    "@babel/preset-typescript",
  ],
  plugins: [
    // babel-plugin-import是一款babel插件, 在编译过程中将import的写法自动转换成按需引入的方式.
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true,
      },
    ],
    /**
     * babel 在转译的过程中，分为syntax 和 api 对 代码进行转义 ，对 syntax 的处理可能会使用到 helper 函数，对 api 的处理会引入 polyfill
     * 默认情况下，babel 在每个需要使用 helper 的地方都会定义一个 helper，导致最终的产物里有大量重复的 helper；引入 polyfill 时会直接修改全局变量及其原型，造成原型污染。
     * @babel/plugin-transform-runtime 的作用是将 helper 和 polyfill 都改为从一个统一的地方引入，并且引入的对象和全局变量是完全隔离的，这样解决了上面的两个问题
     */
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 3, // 设置 corejs 3 版本
      },
    ],
    // 装饰器 (mobx)
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    // 支持 class 类的写法
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    // 解析此语法 import()
    "@babel/plugin-syntax-dynamic-import",
    // 解析 es6解构 语法
    "@babel/plugin-proposal-object-rest-spread",
    // 
    // "@babel/plugin-proposal-nullish-coalescing-operator",
  ],
};
