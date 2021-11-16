// Refactor the following function into a one-liner:
// const printName = (name) => {
//     return "Hi" + name;
// }

const printName = (name) => "Hi " + name;

console.log(printName("ZeMoSo"));

// Rewrite the following code using template literals
// const printBill = (name, bill) => {
//     return “Hi “ + name + “, please pay: “ + bill;
// }

const printBill = (name, bill) => `Hi ${name}, Please pay : ${bill} bill`;

console.log(printBill("ZeMoSo", 1090));

// Modify the following code such that the object properties are destructured and logged.

const person = {
    name: "Noam Chomsky",
    age: 92
}

// let name = person.name;
// let age = person.age;

// Destructuring
let { name, age } = person;

console.log(name);
console.log(age);