// let today = "Monday";

// if (today === "Monday") {
//     console.log("It's Monday, time to start the week!"); 
// } else {
//     console.log("It's not Monday, enjoy your day!");
// }
 
 let age = 80;
// if (age >= 18) {
//     console.log("You are an adult.");
// } else {
//     console.log("You are a minor.");
// }

// if (age > 0 && age <= 2) {
//     console.log("You are a toddler.");
// } else if (age > 2 && age <= 12) {
//     console.log("You are a child.");
// } else if (age > 12 && age <= 19) {
//     console.log("You are a teenager.");
// } else if (age > 19 && age <= 64) {
//     console.log("You are an adult.");
// } else {
//     console.log("You are a senior citizen.");
// } 
switch (true) {
    case (age >= 0 && age <= 2):
        console.log("You are a toddler.");
        break;

    case (age >= 3 && age <= 12):
        console.log("You are a child.");
        break;

    case (age >= 13 && age <= 19):
        console.log("You are a teenager.");
        break;

    case (age >= 20 && age <= 64):
        console.log("You are an adult.");
        break;


    default:
         console.log("You are an adult or senior citizen.");
}


