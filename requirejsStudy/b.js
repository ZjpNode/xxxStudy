define(function(require){
    console.log('I am b.js')
    var a = require('./a.js');
    console.log(a)
    return {
        color: "red",
        size: "12"
    }
});