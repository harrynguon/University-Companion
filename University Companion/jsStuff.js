// Load JS in an HTML file
// <script src="myscript.js"></script>

// Primitive Types
// string
// number
// boolean
// undefined

// Complex Types
// function
// Object -> objects cannot be compared

// Object vs. Array
// Objects use named indexes whereas Array uses numbered indexes


// In JavaScript there are 5 different data types that can contain values:

// string
// number
// boolean
// object
// function

// There are 3 types of objects:
// Object
// Date
// Array

// And 2 data types that cannot contain values:
// null
// undefined

// Objects
var person = {
    firstName: "John",
    lastName : "Doe",
    id       : 5566,
    fullName : function() {
        return this.firstName + " " + this.lastName;
    }
};

person["firstName"] == "John";
person.fullName() == "John Doe";

// Strings
length();
indexOf();
trim();
substr();
slice();
replace();
concact();

// Numbers
toString();
toFixed(); // dp
toPrecision(); // length
valueOf();
parseInt();
parseFloat();
Number("1"); // to a number

// Arrays
var arr = [1, 2, "3", 4, 5];
toString();
join();
pop();
push();
shift();
unshift();
splice();
concat();
find();
indexOf();
lastIndexOf();

// Lambda-ready
forEach();
map();
filter();
reduce();
every();
some();

// Dates
new Date(year, month, .. , milliseconds);
toString(); // redundant
toUTCString();
toDateString();

// Booleans
// Everything with a value is true,
// everything without a value (e.g. NaN, undefined, null) is false


// Labels
// Can be used to jump out of a code block
var cars = ["BMW", "Volvo", "Saab", "Ford"];
list: {
    text += cars[0] + "<br>"; 
    break list;
    text += cars[1] + "<br>"; 
}

// Let
// Let variables do not belong to window objects (e.g. !window.carName)
// Cannot redeclare let variables within the same block
var x = 10;
{
	let x = 2; // Declare a varible with block scope
}

let i = 5;
for (let i = 0; i < 10; i++) {
    // some statements
}
// -> Over here, i = 5

// Const - a variable that cannot be changed
// Cannot be redeclared/modified unless it is in another block
const test = 0;

// Regular Expression
var str = "Visit W3Schools!";
var n = str.search("W3Schools");
var pattern = /w3schools/i;
var n = str.search(pattern); // Case insensitive
pattern.test("Visit W3Schools!"); // This can be done instead. Returns a boolean

// Try & Catch & Finally & Throw
try {
    adddlert("Welcome guest!");
}
catch(err) {
    document.getElementById("demo").innerHTML = err.message;
}
finally {
	console.log("done");
}
throw "Too big";    // throw a text
throw 500;          // throw a number

// Hoisting
// A variable can be used before it has been declared
{
	q = 10;
	console.log(q);
	var q;
}

// Strict Mode
// Restrains from being able to use undeclared variables,
// mistyped variables (which creates a global variable), etc.
// It uses the regular scope conventions
"use strict";
// Con:
"use strict";
function myFunction() {
    return this; // returns undefined (default binding is not allowed?)
}

// Omitting a function parameter
function myFunction(x, y) {
    if (y === undefined) {
        y = 0;
    }    
    return x * y;
}
document.getElementById("demo").innerHTML = myFunction(4);
// == 0.

// Floats
var x = 0.1;
var y = 0.2;
var z = x + y // the result in z will not be 0.3
// Solution:
var z = (x * 10 + y * 10) / 10; // z will be 0.3

// Testing if an object exists
if (typeof myObj !== "undefined" && myObj !== null) {...}

// JSON Stuff
// JSON Syntax Rules
// Data is in name/value pairs
// Data is separated by commas
// Curly braces hold objects
// Square brackets hold arrays


// Constructors

function Person(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.testFunction = function() {
        return "This is a test function";
    };
    this.nationality = "nationality";
}

var testPerson = new Person("h", "n", 100);

// Sometimes you want to add new properties (or methods) to all existing objects of a given type.
// Sometimes you want to add new properties (or methods) to an object constructor.

Person.prototype.testProperty = "this is a test";
Person.prototype.testMethod = function() {
    return 1;
}