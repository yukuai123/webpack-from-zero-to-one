module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  /**
   * 对于不同项目，如果希望使用相同的 rules，直接复制粘贴显然不是一个好方法，一是 rules 太多，配置文件会显得很乱，二是无法同步更新。
   * 推荐使用的方法是把所需的 rules 抽离成一个 npm 包，需要的时候再通过 extends 引用。而且对于这些抽离出来的包，有着统一的命名规范
   */
  extends: ['eslint-config-alloy/react', 'eslint-config-alloy/typescript'],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {},
};
