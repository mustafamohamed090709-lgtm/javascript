let fruits = ["Apple", "Banana", "Orange"];
console.log(fruits[1]); // Output: Banana
console.log(fruits.length); // Output: 3
console.log(fruits[fruits.length - 1]); // Output: Orange
console.log(fruits.indexOf("Apple")); // Output: 0
fruits.push("Grapes");
console.log(fruits); // Output: ["Apple", "Banana", "Orange", "Grapes"]

fruits.pop();
console.log(fruits); // Output: ["Apple", "Banana", "Orange"]

fruits.shift();
console.log(fruits); // Output: ["Banana", "Orange"]