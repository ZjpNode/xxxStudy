var aPerson = require("./a");
var bPerson = require("./b");
var aperson = new aPerson("Tony", 33);
var bperson = new bPerson("Tony", 33);
console.log(aperson);       // {name:"Tony", age:33}
console.log(aPerson.sex);   // undefined
console.log(bperson);       // {name:"Tony", age:33}
console.log(bPerson.sex);   // male