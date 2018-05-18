// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  globals: {
    AMap: true,
    Messaging: true,
    EZUIPlayer: true
  },
  // add your custom rules here
  rules: {
    //0:关闭，1:警告，2:异常
    "semi": 2,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'no-multiple-empty-lines': [2, { max: 4 }],
    // 忽略 “函数定义时括号前面要不要有空格”这条规则，因为无法使用eslint规则来格式化vue文件的代码
    'space-before-function-paren': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
