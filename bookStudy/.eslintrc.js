module.exports = {
  extends: ['airbnb/legacy'],
  globals: {
    jQuery: false,
    sysConfigData: true,
    proCode: false
  },
  rules: {
    'vars-on-top': 1,
    'no-param-reassign': 1,
    'no-alert': 1,
    'no-console': 1,
    'func-names': 0,
    'no-var': 0,
    'prefer-arrow-callback': 0
  }
};
