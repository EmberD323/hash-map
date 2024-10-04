import {HashMap} from "./hashmap.js";
const test = new HashMap() // or HashMap() if using a factory

test.set('apple', 'red')//10
test.set('banana', 'yellow')//69
test.set('carrot', 'orange')//71
test.set('dog', 'brown')//44
test.set('elephant', 'gray')//69 - linked with banana
test.set('frog', 'green')//80
test.set('grape', 'purple')//27
test.set('hat', 'black')//67
test.set('ice cream', 'white')//37
test.set('jacket', 'blue')//26
test.set('kite', 'pink')//39
test.set('lion', 'golden')//84

console.log("final HashMap");
console.log(test);

console.log(test.length());

