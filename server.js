// console.log("Dwaipayan");

// function add(a, b) {
//   return a + b;
// }

// var add = function(a,b){
//     return a+b;
// }

// var add = (a, b) => {
//   return a + b;
// };

// var add = (a, b) => a + b;

// let result = add(2, 11);
// console.log(result);

// function callback() {
//   console.log("Dwaipayan is calling a callback function");
// }

// const add = function (a, b, callback) {
//   var result = a + b;
//   console.log(`result: ${result}`);
//   callback();
// };

// add(3, 4, callback);

// const add = function (a, b, dwaipayan) {
//   var result = a + b;
//   console.log(`Result: ${result}`);
//   dwaipayan();
// };

// add(2, 3, function () {
//   console.log("Add Function");
// });

// add(2, 3, () => console.log("Add Completed"));

// const fs = require("fs");
// const os = require("os");

// var user = os.userInfo();

// console.log(user.username);

// fs.appendFile("gretting.txt", "Hi " + user.username + "\n", () => {
//   console.log("File is created");
// });

// console.log(os);

const notes = require("./notes.js");
var _ = require("lodash");

console.log("Server file is available");

var age = notes.age;
console.log(age);

var result = notes.addNumber(4 + age, 6);
console.log(result);

var data = ["person", "person", 1, 2, 3, 4, 1];

var filter = _.uniq(data);
console.log(filter);
