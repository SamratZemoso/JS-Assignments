// 1. Passing function as parameter in a function

const functionArg = () => {
    console.log("Function called");
}

const result = (x, y, functionArg) => {

    const sum = x + y;

    // call the function
    functionArg();

    return sum;
}

// console the results 
console.log(result(10, 20, functionArg));


// 2. Arrow function returns first letters of both first & last Name
const trimString = (firstName, lastName) => firstName.charAt(0) + lastName.charAt(0);

console.log(trimString("Roger", "Waters"));