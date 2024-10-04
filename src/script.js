import {HashMap} from "./hashmap.js";
const test = new HashMap() // or HashMap() if using a factory
console.log(test);

test.set('apple', 'red');
test.set('apple', 'green');
console.log(test);