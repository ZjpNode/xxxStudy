/**
 * Created by Zjp on 2017/09/05.
 */
// require all test files using special Webpack feature
var testsContext = require.context('.', true, /\.spec$/);
testsContext.keys().forEach(testsContext);