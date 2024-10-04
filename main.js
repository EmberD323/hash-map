/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/hashmap.js":
/*!************************!*\
  !*** ./src/hashmap.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HashMap: () => (/* binding */ HashMap)\n/* harmony export */ });\n/* harmony import */ var _linkedlist_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linkedlist.js */ \"./src/linkedlist.js\");\n\n\n//use this when accessing a bucket through an index.Want to throw an error if we try to access an out of bound index\n//if (index < 0 || index >= buckets.length) {\n//   throw new Error(\"Trying to access index out of bound\");\n//}\nclass HashMap{\n    constructor() {\n        //hashMap with 10 buckets (will grow if too full)\n        let bucketSize = 16; \n        \n        this.buckets = new Array(bucketSize);\n      }\n      \n\n    hash(key) {\n        let hashCode = 0;\n           \n        const primeNumber = 31;\n        for (let i = 0; i < key.length; i++) {\n          hashCode = primeNumber * hashCode + key.charCodeAt(i);\n          \n        }\n     \n        return hashCode % this.buckets.length //to make hash matach buckets;\n    } \n    checkToGrow(){//if entries go above 0.75*capacity, double capacity.\n        let loadFactor = 0.75;\n        let capacity = this.buckets.length;\n        let numberToGrowAt = Math.round(capacity * loadFactor);\n        let numberOfEntries = this.length();\n        if(numberToGrowAt == numberOfEntries){\n            //save previous entries\n            let oldHashMap = this.entries();\n            //create new list\n            this.buckets = new Array(2*capacity);\n            //copy old ones to new\n            for (let i=0;i<oldHashMap.length;i++){\n                this.set(oldHashMap[i][0],oldHashMap[i][1]);\n            }\n        }\n    }\n    set(newKey,newValue){\n        \n        //run grow check for capacity\n        this.checkToGrow();\n        let thisHash = this.hash(newKey);\n        \n        //if this bucket is empty put this in there\n        if(this.buckets[thisHash] == undefined ){\n            this.buckets[thisHash] = new _linkedlist_js__WEBPACK_IMPORTED_MODULE_0__.LinkedList();\n            this.buckets[thisHash].append({key:newKey,value:newValue});\n            return\n        }\n\n        //check if linked list had key by moving through linked list while data is not empty\n        let currentNode = this.buckets[thisHash].head;\n        while(currentNode !== null){\n            if(currentNode.data.key == newKey){\n                currentNode.data.value = newValue;  \n                return\n            }\n            currentNode = currentNode.next\n        }\n        //there has been a collision - add to end of linked list\n        this.buckets[thisHash].append({key:newKey,value:newValue});\n        return\n        \n\n    }\n    get(keyToFind){\n        //find value assosicated with key\n        let thisHash = this.hash(keyToFind);\n        //if this bucket is empty return null\n        if(this.buckets[thisHash] == undefined){\n            return null\n        }\n        //traverse through linked list and get value\n        let currentNode = this.buckets[thisHash].head;\n        \n        while(currentNode !== null){\n\n            if(currentNode.data.key == keyToFind){\n                return currentNode.data.value;  \n            }\n            currentNode = currentNode.next\n        }\n        return null\n    }\n    has(keyToFind){\n        let value = this.get(keyToFind);\n        if(value == null){return false}\n        return true\n    }\n    remove(keyToRemove){\n        let valueToRemove = this.get(keyToRemove);\n        if(valueToRemove == null){return false};\n        let thisHash = this.hash(keyToRemove);\n       \n        let currentNode = this.buckets[thisHash].head;\n        let nodeBefore;\n        //if its the head that matches key\n        if(currentNode.data.key == keyToRemove){\n            if(currentNode.next == null){\n                this.buckets[thisHash] = undefined;\n                return true\n            }\n            this.buckets[thisHash].head = currentNode.next\n            return true\n        }\n        //find key in linked list\n        while(currentNode.data.key !== null){\n            if(currentNode.next.data.key == keyToRemove){\n                nodeBefore = currentNode;\n                currentNode = currentNode.next\n                break\n            }\n            currentNode = currentNode.next\n        }\n        let nodeAfter = currentNode.next;\n        nodeBefore.next = nodeAfter;\n        return true\n    }\n    length(){\n        //cycle through, if undefined count and check size of each list within each bucket\n        let hashLength = this.buckets.length;\n        let count = 0;\n        for(let i=0;i<hashLength;i++){\n            if(this.buckets[i] !== undefined){\n                let listLength = this.buckets[i].size();\n                count = count + listLength;\n            }\n        }\n        return count;\n    }\n    clear(){\n        //remove all\n        this.buckets = new Array(100);\n        return\n    }\n    keys(){\n        //returns array with all keys\n        let keyArray = [];\n        let hashLength = this.buckets.length;\n        for(let i=0;i<hashLength;i++){\n            if(this.buckets[i] !== undefined){\n                let currentNode = this.buckets[i].head;\n                while(currentNode !== null){\n                    let thisKey = currentNode.data.key;\n                    keyArray.push(thisKey);\n                    currentNode = currentNode.next\n                }\n            }\n        }\n        return keyArray;\n\n    }\n    values(){\n        //returns array with all keys\n        let valueArray = [];\n        let hashLength = this.buckets.length;\n        for(let i=0;i<hashLength;i++){\n            if(this.buckets[i] !== undefined){\n                let currentNode = this.buckets[i].head;\n                while(currentNode !== null){\n                    let thisValue = currentNode.data.value;\n                    valueArray.push(thisValue);\n                    currentNode = currentNode.next\n                }\n            }\n        }\n        return valueArray;\n\n    }\n    entries(){\n        let entryArray = [];\n        let keyArray = this.keys();\n        let valueArray = this.values();\n        for(let i = 0; i<keyArray.length; i++){\n            let thisEntry = [keyArray[i],valueArray[i]];\n            entryArray.push(thisEntry);\n        }\n        return entryArray\n\n\n    }\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaGFzaG1hcC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUEyQzs7QUFFM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdCQUFnQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsb0JBQW9CO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxzREFBVTtBQUNuRCwyQ0FBMkMsMEJBQTBCO0FBQ3JFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsMEJBQTBCO0FBQ2pFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsYUFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixhQUFhO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsYUFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RlbXBsYXRlLy4vc3JjL2hhc2htYXAuanM/Mzk1YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xpbmtlZExpc3R9IGZyb20gXCIuL2xpbmtlZGxpc3QuanNcIjtcblxuLy91c2UgdGhpcyB3aGVuIGFjY2Vzc2luZyBhIGJ1Y2tldCB0aHJvdWdoIGFuIGluZGV4LldhbnQgdG8gdGhyb3cgYW4gZXJyb3IgaWYgd2UgdHJ5IHRvIGFjY2VzcyBhbiBvdXQgb2YgYm91bmQgaW5kZXhcbi8vaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSBidWNrZXRzLmxlbmd0aCkge1xuLy8gICB0aHJvdyBuZXcgRXJyb3IoXCJUcnlpbmcgdG8gYWNjZXNzIGluZGV4IG91dCBvZiBib3VuZFwiKTtcbi8vfVxuY2xhc3MgSGFzaE1hcHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy9oYXNoTWFwIHdpdGggMTAgYnVja2V0cyAod2lsbCBncm93IGlmIHRvbyBmdWxsKVxuICAgICAgICBsZXQgYnVja2V0U2l6ZSA9IDE2OyBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYnVja2V0cyA9IG5ldyBBcnJheShidWNrZXRTaXplKTtcbiAgICAgIH1cbiAgICAgIFxuXG4gICAgaGFzaChrZXkpIHtcbiAgICAgICAgbGV0IGhhc2hDb2RlID0gMDtcbiAgICAgICAgICAgXG4gICAgICAgIGNvbnN0IHByaW1lTnVtYmVyID0gMzE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaGFzaENvZGUgPSBwcmltZU51bWJlciAqIGhhc2hDb2RlICsga2V5LmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgXG4gICAgICAgIHJldHVybiBoYXNoQ29kZSAlIHRoaXMuYnVja2V0cy5sZW5ndGggLy90byBtYWtlIGhhc2ggbWF0YWNoIGJ1Y2tldHM7XG4gICAgfSBcbiAgICBjaGVja1RvR3Jvdygpey8vaWYgZW50cmllcyBnbyBhYm92ZSAwLjc1KmNhcGFjaXR5LCBkb3VibGUgY2FwYWNpdHkuXG4gICAgICAgIGxldCBsb2FkRmFjdG9yID0gMC43NTtcbiAgICAgICAgbGV0IGNhcGFjaXR5ID0gdGhpcy5idWNrZXRzLmxlbmd0aDtcbiAgICAgICAgbGV0IG51bWJlclRvR3Jvd0F0ID0gTWF0aC5yb3VuZChjYXBhY2l0eSAqIGxvYWRGYWN0b3IpO1xuICAgICAgICBsZXQgbnVtYmVyT2ZFbnRyaWVzID0gdGhpcy5sZW5ndGgoKTtcbiAgICAgICAgaWYobnVtYmVyVG9Hcm93QXQgPT0gbnVtYmVyT2ZFbnRyaWVzKXtcbiAgICAgICAgICAgIC8vc2F2ZSBwcmV2aW91cyBlbnRyaWVzXG4gICAgICAgICAgICBsZXQgb2xkSGFzaE1hcCA9IHRoaXMuZW50cmllcygpO1xuICAgICAgICAgICAgLy9jcmVhdGUgbmV3IGxpc3RcbiAgICAgICAgICAgIHRoaXMuYnVja2V0cyA9IG5ldyBBcnJheSgyKmNhcGFjaXR5KTtcbiAgICAgICAgICAgIC8vY29weSBvbGQgb25lcyB0byBuZXdcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPG9sZEhhc2hNYXAubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXQob2xkSGFzaE1hcFtpXVswXSxvbGRIYXNoTWFwW2ldWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQobmV3S2V5LG5ld1ZhbHVlKXtcbiAgICAgICAgXG4gICAgICAgIC8vcnVuIGdyb3cgY2hlY2sgZm9yIGNhcGFjaXR5XG4gICAgICAgIHRoaXMuY2hlY2tUb0dyb3coKTtcbiAgICAgICAgbGV0IHRoaXNIYXNoID0gdGhpcy5oYXNoKG5ld0tleSk7XG4gICAgICAgIFxuICAgICAgICAvL2lmIHRoaXMgYnVja2V0IGlzIGVtcHR5IHB1dCB0aGlzIGluIHRoZXJlXG4gICAgICAgIGlmKHRoaXMuYnVja2V0c1t0aGlzSGFzaF0gPT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgICB0aGlzLmJ1Y2tldHNbdGhpc0hhc2hdID0gbmV3IExpbmtlZExpc3QoKTtcbiAgICAgICAgICAgIHRoaXMuYnVja2V0c1t0aGlzSGFzaF0uYXBwZW5kKHtrZXk6bmV3S2V5LHZhbHVlOm5ld1ZhbHVlfSk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vY2hlY2sgaWYgbGlua2VkIGxpc3QgaGFkIGtleSBieSBtb3ZpbmcgdGhyb3VnaCBsaW5rZWQgbGlzdCB3aGlsZSBkYXRhIGlzIG5vdCBlbXB0eVxuICAgICAgICBsZXQgY3VycmVudE5vZGUgPSB0aGlzLmJ1Y2tldHNbdGhpc0hhc2hdLmhlYWQ7XG4gICAgICAgIHdoaWxlKGN1cnJlbnROb2RlICE9PSBudWxsKXtcbiAgICAgICAgICAgIGlmKGN1cnJlbnROb2RlLmRhdGEua2V5ID09IG5ld0tleSl7XG4gICAgICAgICAgICAgICAgY3VycmVudE5vZGUuZGF0YS52YWx1ZSA9IG5ld1ZhbHVlOyAgXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHRcbiAgICAgICAgfVxuICAgICAgICAvL3RoZXJlIGhhcyBiZWVuIGEgY29sbGlzaW9uIC0gYWRkIHRvIGVuZCBvZiBsaW5rZWQgbGlzdFxuICAgICAgICB0aGlzLmJ1Y2tldHNbdGhpc0hhc2hdLmFwcGVuZCh7a2V5Om5ld0tleSx2YWx1ZTpuZXdWYWx1ZX0pO1xuICAgICAgICByZXR1cm5cbiAgICAgICAgXG5cbiAgICB9XG4gICAgZ2V0KGtleVRvRmluZCl7XG4gICAgICAgIC8vZmluZCB2YWx1ZSBhc3Nvc2ljYXRlZCB3aXRoIGtleVxuICAgICAgICBsZXQgdGhpc0hhc2ggPSB0aGlzLmhhc2goa2V5VG9GaW5kKTtcbiAgICAgICAgLy9pZiB0aGlzIGJ1Y2tldCBpcyBlbXB0eSByZXR1cm4gbnVsbFxuICAgICAgICBpZih0aGlzLmJ1Y2tldHNbdGhpc0hhc2hdID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG4gICAgICAgIC8vdHJhdmVyc2UgdGhyb3VnaCBsaW5rZWQgbGlzdCBhbmQgZ2V0IHZhbHVlXG4gICAgICAgIGxldCBjdXJyZW50Tm9kZSA9IHRoaXMuYnVja2V0c1t0aGlzSGFzaF0uaGVhZDtcbiAgICAgICAgXG4gICAgICAgIHdoaWxlKGN1cnJlbnROb2RlICE9PSBudWxsKXtcblxuICAgICAgICAgICAgaWYoY3VycmVudE5vZGUuZGF0YS5rZXkgPT0ga2V5VG9GaW5kKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudE5vZGUuZGF0YS52YWx1ZTsgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgaGFzKGtleVRvRmluZCl7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0KGtleVRvRmluZCk7XG4gICAgICAgIGlmKHZhbHVlID09IG51bGwpe3JldHVybiBmYWxzZX1cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmVtb3ZlKGtleVRvUmVtb3ZlKXtcbiAgICAgICAgbGV0IHZhbHVlVG9SZW1vdmUgPSB0aGlzLmdldChrZXlUb1JlbW92ZSk7XG4gICAgICAgIGlmKHZhbHVlVG9SZW1vdmUgPT0gbnVsbCl7cmV0dXJuIGZhbHNlfTtcbiAgICAgICAgbGV0IHRoaXNIYXNoID0gdGhpcy5oYXNoKGtleVRvUmVtb3ZlKTtcbiAgICAgICBcbiAgICAgICAgbGV0IGN1cnJlbnROb2RlID0gdGhpcy5idWNrZXRzW3RoaXNIYXNoXS5oZWFkO1xuICAgICAgICBsZXQgbm9kZUJlZm9yZTtcbiAgICAgICAgLy9pZiBpdHMgdGhlIGhlYWQgdGhhdCBtYXRjaGVzIGtleVxuICAgICAgICBpZihjdXJyZW50Tm9kZS5kYXRhLmtleSA9PSBrZXlUb1JlbW92ZSl7XG4gICAgICAgICAgICBpZihjdXJyZW50Tm9kZS5uZXh0ID09IG51bGwpe1xuICAgICAgICAgICAgICAgIHRoaXMuYnVja2V0c1t0aGlzSGFzaF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYnVja2V0c1t0aGlzSGFzaF0uaGVhZCA9IGN1cnJlbnROb2RlLm5leHRcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgLy9maW5kIGtleSBpbiBsaW5rZWQgbGlzdFxuICAgICAgICB3aGlsZShjdXJyZW50Tm9kZS5kYXRhLmtleSAhPT0gbnVsbCl7XG4gICAgICAgICAgICBpZihjdXJyZW50Tm9kZS5uZXh0LmRhdGEua2V5ID09IGtleVRvUmVtb3ZlKXtcbiAgICAgICAgICAgICAgICBub2RlQmVmb3JlID0gY3VycmVudE5vZGU7XG4gICAgICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dFxuICAgICAgICB9XG4gICAgICAgIGxldCBub2RlQWZ0ZXIgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICBub2RlQmVmb3JlLm5leHQgPSBub2RlQWZ0ZXI7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIGxlbmd0aCgpe1xuICAgICAgICAvL2N5Y2xlIHRocm91Z2gsIGlmIHVuZGVmaW5lZCBjb3VudCBhbmQgY2hlY2sgc2l6ZSBvZiBlYWNoIGxpc3Qgd2l0aGluIGVhY2ggYnVja2V0XG4gICAgICAgIGxldCBoYXNoTGVuZ3RoID0gdGhpcy5idWNrZXRzLmxlbmd0aDtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgZm9yKGxldCBpPTA7aTxoYXNoTGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBpZih0aGlzLmJ1Y2tldHNbaV0gIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgbGV0IGxpc3RMZW5ndGggPSB0aGlzLmJ1Y2tldHNbaV0uc2l6ZSgpO1xuICAgICAgICAgICAgICAgIGNvdW50ID0gY291bnQgKyBsaXN0TGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3VudDtcbiAgICB9XG4gICAgY2xlYXIoKXtcbiAgICAgICAgLy9yZW1vdmUgYWxsXG4gICAgICAgIHRoaXMuYnVja2V0cyA9IG5ldyBBcnJheSgxMDApO1xuICAgICAgICByZXR1cm5cbiAgICB9XG4gICAga2V5cygpe1xuICAgICAgICAvL3JldHVybnMgYXJyYXkgd2l0aCBhbGwga2V5c1xuICAgICAgICBsZXQga2V5QXJyYXkgPSBbXTtcbiAgICAgICAgbGV0IGhhc2hMZW5ndGggPSB0aGlzLmJ1Y2tldHMubGVuZ3RoO1xuICAgICAgICBmb3IobGV0IGk9MDtpPGhhc2hMZW5ndGg7aSsrKXtcbiAgICAgICAgICAgIGlmKHRoaXMuYnVja2V0c1tpXSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudE5vZGUgPSB0aGlzLmJ1Y2tldHNbaV0uaGVhZDtcbiAgICAgICAgICAgICAgICB3aGlsZShjdXJyZW50Tm9kZSAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0aGlzS2V5ID0gY3VycmVudE5vZGUuZGF0YS5rZXk7XG4gICAgICAgICAgICAgICAgICAgIGtleUFycmF5LnB1c2godGhpc0tleSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2V5QXJyYXk7XG5cbiAgICB9XG4gICAgdmFsdWVzKCl7XG4gICAgICAgIC8vcmV0dXJucyBhcnJheSB3aXRoIGFsbCBrZXlzXG4gICAgICAgIGxldCB2YWx1ZUFycmF5ID0gW107XG4gICAgICAgIGxldCBoYXNoTGVuZ3RoID0gdGhpcy5idWNrZXRzLmxlbmd0aDtcbiAgICAgICAgZm9yKGxldCBpPTA7aTxoYXNoTGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBpZih0aGlzLmJ1Y2tldHNbaV0gIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnROb2RlID0gdGhpcy5idWNrZXRzW2ldLmhlYWQ7XG4gICAgICAgICAgICAgICAgd2hpbGUoY3VycmVudE5vZGUgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGhpc1ZhbHVlID0gY3VycmVudE5vZGUuZGF0YS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVBcnJheS5wdXNoKHRoaXNWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWVBcnJheTtcblxuICAgIH1cbiAgICBlbnRyaWVzKCl7XG4gICAgICAgIGxldCBlbnRyeUFycmF5ID0gW107XG4gICAgICAgIGxldCBrZXlBcnJheSA9IHRoaXMua2V5cygpO1xuICAgICAgICBsZXQgdmFsdWVBcnJheSA9IHRoaXMudmFsdWVzKCk7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGk8a2V5QXJyYXkubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgbGV0IHRoaXNFbnRyeSA9IFtrZXlBcnJheVtpXSx2YWx1ZUFycmF5W2ldXTtcbiAgICAgICAgICAgIGVudHJ5QXJyYXkucHVzaCh0aGlzRW50cnkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbnRyeUFycmF5XG5cblxuICAgIH1cbn1cblxuXG5leHBvcnQge0hhc2hNYXB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/hashmap.js\n");

/***/ }),

/***/ "./src/linkedlist.js":
/*!***************************!*\
  !*** ./src/linkedlist.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LinkedList: () => (/* binding */ LinkedList),\n/* harmony export */   Node: () => (/* binding */ Node)\n/* harmony export */ });\n//node constructor\nclass Node {\n    constructor(data) {\n        this.data = data;\n        this.next = null;\n    }\n}\n\nclass LinkedList{\n    //list constructor\n    constructor() {\n        this.head = null;\n    }\n    append(data) {\n        //create node\n        const newNode = new Node(data);\n        //if list is empty, assign this node to head\n        if (this.head == null) {\n            this.head = newNode;\n            return\n        } else {\n            //traveses the list until it reaches last node and appends new node\n            //start at head\n            let currentNode = this.head;\n            //search until there is a node with a null next\n            while (currentNode.next !== null) {\n                //move to next node\n                currentNode = currentNode.next;\n            }\n            //whn the while is finished ie when there is a next = null, add this new node as the next\n            currentNode.next = newNode;\n        }\n    }\n    preend(data){\n        //create node\n        const newNode = new Node(data);\n        //if theres a head already, newNode.next should be that node (works for null too)\n        newNode.next = this.head;\n        //change head reference to this node\n        this.head = newNode;\n    }\n    size(){\n        let currentNode = this.head;\n        let count = 1;\n        if (this.head.next == null) {return count}\n        while (currentNode.next !== null) {\n            count++;\n            currentNode = currentNode.next;\n        }\n        return count\n    }\n    headFind(){\n        return this.head\n    }\n    tailFind(){\n        let currentNode = this.head;\n            //search until there is a node with a null next\n            while (currentNode.next !== null) {\n                //move to next node\n                currentNode = currentNode.next;\n            }\n        return currentNode\n    }\n    at(index){\n        //index 0\n        if (index == 0){return this.head}\n        let currentNode = this.head\n        //loop across list until index and return node\n        for(let i=0;i<index;i++){\n            if (currentNode.value==null){return null}\n            currentNode = currentNode.next;\n        }\n        return currentNode\n    }\n    pop(){\n        let currentNode = this.head;\n            //search while nodes have a next\n            while (currentNode.next !== null) {\n                //if two after currentNode is null then change next node to empty next\n                if(currentNode.next.next == null){\n                    currentNode.next = null;\n                    return\n                }\n                //otherwise move to next node\n                currentNode = currentNode.next;\n            }\n    }\n    contains(valueToFind){\n        let currentNode = this.head;\n        //search while nodes have values\n        while (currentNode !== null) {\n            if(currentNode.data == valueToFind){\n                return true\n            }\n            //otherwise move to next node\n            currentNode = currentNode.next;\n        }\n        return false\n    }\n    find(valueToFind){\n        let currentNode = this.head;\n        let index = 0;\n        //search while nodes have values\n        while (currentNode.data !== null) {\n            if(currentNode.data == valueToFind){\n                return index\n            }\n            if (currentNode.next==null){return null}\n            //otherwise move to next node\n            currentNode = currentNode.next;\n            index++;\n        }\n    }\n    toString(){\n        //( value ) -> ( value ) -> ( value ) -> null\n        let string = \"( \" + this.head.data+ \" )\"\n        let currentNode = this.head.next;\n        //search while nodes have values\n        while (currentNode !== null) {\n            string = string + \" -> ( \" + currentNode.data + \" )\"\n            //otherwise move to next node\n            currentNode = currentNode.next;\n        }\n        string = string + \" -> null\";\n        return string\n    }\n    insertAt(value,index){\n        const newNode = new Node(value)\n        //if index is 0 then preend\n        if(index == 0){\n            newNode.next = this.head;\n            this.head = newNode;\n            return\n        }\n        //otherwise slot in\n        //find node current node at that index = nodeAfter\n        let currentNode = this.head\n        for(let i=1;i<index;i++){\n            console.log(\"i is \"+i);\n            currentNode = currentNode.next;\n            if (currentNode.next==null){break}\n        }\n        console.log(currentNode);\n        let nodeAfter = currentNode.next;\n        let nodeBefore = currentNode;\n        newNode.next = nodeAfter;\n        nodeBefore.next = newNode;\n    }\n   \n}\n\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGlua2VkbGlzdC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVtcGxhdGUvLi9zcmMvbGlua2VkbGlzdC5qcz8xODUwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vbm9kZSBjb25zdHJ1Y3RvclxuY2xhc3MgTm9kZSB7XG4gICAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLm5leHQgPSBudWxsO1xuICAgIH1cbn1cblxuY2xhc3MgTGlua2VkTGlzdHtcbiAgICAvL2xpc3QgY29uc3RydWN0b3JcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5oZWFkID0gbnVsbDtcbiAgICB9XG4gICAgYXBwZW5kKGRhdGEpIHtcbiAgICAgICAgLy9jcmVhdGUgbm9kZVxuICAgICAgICBjb25zdCBuZXdOb2RlID0gbmV3IE5vZGUoZGF0YSk7XG4gICAgICAgIC8vaWYgbGlzdCBpcyBlbXB0eSwgYXNzaWduIHRoaXMgbm9kZSB0byBoZWFkXG4gICAgICAgIGlmICh0aGlzLmhlYWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkID0gbmV3Tm9kZTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy90cmF2ZXNlcyB0aGUgbGlzdCB1bnRpbCBpdCByZWFjaGVzIGxhc3Qgbm9kZSBhbmQgYXBwZW5kcyBuZXcgbm9kZVxuICAgICAgICAgICAgLy9zdGFydCBhdCBoZWFkXG4gICAgICAgICAgICBsZXQgY3VycmVudE5vZGUgPSB0aGlzLmhlYWQ7XG4gICAgICAgICAgICAvL3NlYXJjaCB1bnRpbCB0aGVyZSBpcyBhIG5vZGUgd2l0aCBhIG51bGwgbmV4dFxuICAgICAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlLm5leHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvL21vdmUgdG8gbmV4dCBub2RlXG4gICAgICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy93aG4gdGhlIHdoaWxlIGlzIGZpbmlzaGVkIGllIHdoZW4gdGhlcmUgaXMgYSBuZXh0ID0gbnVsbCwgYWRkIHRoaXMgbmV3IG5vZGUgYXMgdGhlIG5leHRcbiAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBuZXdOb2RlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByZWVuZChkYXRhKXtcbiAgICAgICAgLy9jcmVhdGUgbm9kZVxuICAgICAgICBjb25zdCBuZXdOb2RlID0gbmV3IE5vZGUoZGF0YSk7XG4gICAgICAgIC8vaWYgdGhlcmVzIGEgaGVhZCBhbHJlYWR5LCBuZXdOb2RlLm5leHQgc2hvdWxkIGJlIHRoYXQgbm9kZSAod29ya3MgZm9yIG51bGwgdG9vKVxuICAgICAgICBuZXdOb2RlLm5leHQgPSB0aGlzLmhlYWQ7XG4gICAgICAgIC8vY2hhbmdlIGhlYWQgcmVmZXJlbmNlIHRvIHRoaXMgbm9kZVxuICAgICAgICB0aGlzLmhlYWQgPSBuZXdOb2RlO1xuICAgIH1cbiAgICBzaXplKCl7XG4gICAgICAgIGxldCBjdXJyZW50Tm9kZSA9IHRoaXMuaGVhZDtcbiAgICAgICAgbGV0IGNvdW50ID0gMTtcbiAgICAgICAgaWYgKHRoaXMuaGVhZC5uZXh0ID09IG51bGwpIHtyZXR1cm4gY291bnR9XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZS5uZXh0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3VudFxuICAgIH1cbiAgICBoZWFkRmluZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5oZWFkXG4gICAgfVxuICAgIHRhaWxGaW5kKCl7XG4gICAgICAgIGxldCBjdXJyZW50Tm9kZSA9IHRoaXMuaGVhZDtcbiAgICAgICAgICAgIC8vc2VhcmNoIHVudGlsIHRoZXJlIGlzIGEgbm9kZSB3aXRoIGEgbnVsbCBuZXh0XG4gICAgICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUubmV4dCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vbW92ZSB0byBuZXh0IG5vZGVcbiAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50Tm9kZVxuICAgIH1cbiAgICBhdChpbmRleCl7XG4gICAgICAgIC8vaW5kZXggMFxuICAgICAgICBpZiAoaW5kZXggPT0gMCl7cmV0dXJuIHRoaXMuaGVhZH1cbiAgICAgICAgbGV0IGN1cnJlbnROb2RlID0gdGhpcy5oZWFkXG4gICAgICAgIC8vbG9vcCBhY3Jvc3MgbGlzdCB1bnRpbCBpbmRleCBhbmQgcmV0dXJuIG5vZGVcbiAgICAgICAgZm9yKGxldCBpPTA7aTxpbmRleDtpKyspe1xuICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlLnZhbHVlPT1udWxsKXtyZXR1cm4gbnVsbH1cbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudE5vZGVcbiAgICB9XG4gICAgcG9wKCl7XG4gICAgICAgIGxldCBjdXJyZW50Tm9kZSA9IHRoaXMuaGVhZDtcbiAgICAgICAgICAgIC8vc2VhcmNoIHdoaWxlIG5vZGVzIGhhdmUgYSBuZXh0XG4gICAgICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUubmV4dCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vaWYgdHdvIGFmdGVyIGN1cnJlbnROb2RlIGlzIG51bGwgdGhlbiBjaGFuZ2UgbmV4dCBub2RlIHRvIGVtcHR5IG5leHRcbiAgICAgICAgICAgICAgICBpZihjdXJyZW50Tm9kZS5uZXh0Lm5leHQgPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9vdGhlcndpc2UgbW92ZSB0byBuZXh0IG5vZGVcbiAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgfVxuICAgIGNvbnRhaW5zKHZhbHVlVG9GaW5kKXtcbiAgICAgICAgbGV0IGN1cnJlbnROb2RlID0gdGhpcy5oZWFkO1xuICAgICAgICAvL3NlYXJjaCB3aGlsZSBub2RlcyBoYXZlIHZhbHVlc1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmKGN1cnJlbnROb2RlLmRhdGEgPT0gdmFsdWVUb0ZpbmQpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL290aGVyd2lzZSBtb3ZlIHRvIG5leHQgbm9kZVxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBmaW5kKHZhbHVlVG9GaW5kKXtcbiAgICAgICAgbGV0IGN1cnJlbnROb2RlID0gdGhpcy5oZWFkO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAvL3NlYXJjaCB3aGlsZSBub2RlcyBoYXZlIHZhbHVlc1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUuZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYoY3VycmVudE5vZGUuZGF0YSA9PSB2YWx1ZVRvRmluZCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3VycmVudE5vZGUubmV4dD09bnVsbCl7cmV0dXJuIG51bGx9XG4gICAgICAgICAgICAvL290aGVyd2lzZSBtb3ZlIHRvIG5leHQgbm9kZVxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b1N0cmluZygpe1xuICAgICAgICAvLyggdmFsdWUgKSAtPiAoIHZhbHVlICkgLT4gKCB2YWx1ZSApIC0+IG51bGxcbiAgICAgICAgbGV0IHN0cmluZyA9IFwiKCBcIiArIHRoaXMuaGVhZC5kYXRhKyBcIiApXCJcbiAgICAgICAgbGV0IGN1cnJlbnROb2RlID0gdGhpcy5oZWFkLm5leHQ7XG4gICAgICAgIC8vc2VhcmNoIHdoaWxlIG5vZGVzIGhhdmUgdmFsdWVzXG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc3RyaW5nID0gc3RyaW5nICsgXCIgLT4gKCBcIiArIGN1cnJlbnROb2RlLmRhdGEgKyBcIiApXCJcbiAgICAgICAgICAgIC8vb3RoZXJ3aXNlIG1vdmUgdG8gbmV4dCBub2RlXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgc3RyaW5nID0gc3RyaW5nICsgXCIgLT4gbnVsbFwiO1xuICAgICAgICByZXR1cm4gc3RyaW5nXG4gICAgfVxuICAgIGluc2VydEF0KHZhbHVlLGluZGV4KXtcbiAgICAgICAgY29uc3QgbmV3Tm9kZSA9IG5ldyBOb2RlKHZhbHVlKVxuICAgICAgICAvL2lmIGluZGV4IGlzIDAgdGhlbiBwcmVlbmRcbiAgICAgICAgaWYoaW5kZXggPT0gMCl7XG4gICAgICAgICAgICBuZXdOb2RlLm5leHQgPSB0aGlzLmhlYWQ7XG4gICAgICAgICAgICB0aGlzLmhlYWQgPSBuZXdOb2RlO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgLy9vdGhlcndpc2Ugc2xvdCBpblxuICAgICAgICAvL2ZpbmQgbm9kZSBjdXJyZW50IG5vZGUgYXQgdGhhdCBpbmRleCA9IG5vZGVBZnRlclxuICAgICAgICBsZXQgY3VycmVudE5vZGUgPSB0aGlzLmhlYWRcbiAgICAgICAgZm9yKGxldCBpPTE7aTxpbmRleDtpKyspe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpIGlzIFwiK2kpO1xuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlLm5leHQ9PW51bGwpe2JyZWFrfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnROb2RlKTtcbiAgICAgICAgbGV0IG5vZGVBZnRlciA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgIGxldCBub2RlQmVmb3JlID0gY3VycmVudE5vZGU7XG4gICAgICAgIG5ld05vZGUubmV4dCA9IG5vZGVBZnRlcjtcbiAgICAgICAgbm9kZUJlZm9yZS5uZXh0ID0gbmV3Tm9kZTtcbiAgICB9XG4gICBcbn1cblxuZXhwb3J0IHtOb2RlLExpbmtlZExpc3R9XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/linkedlist.js\n");

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _hashmap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hashmap.js */ \"./src/hashmap.js\");\n\nconst test = new _hashmap_js__WEBPACK_IMPORTED_MODULE_0__.HashMap() // or HashMap() if using a factory\n\ntest.set('apple', 'red')\ntest.set('banana', 'yellow')\ntest.set('carrot', 'orange')\ntest.set('dog', 'brown')\ntest.set('elephant', 'gray')\ntest.set('frog', 'green')\ntest.set('grape', 'purple')\ntest.set('hat', 'black')\ntest.set('ice cream', 'white')\ntest.set('jacket', 'blue')\ntest.set('kite', 'pink')\ntest.set('lion', 'golden')\ntest.set('moon', 'silver')\n\nconsole.log(\"final HashMap\");\nconsole.log(test);\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0LmpzIiwibWFwcGluZ3MiOiI7O0FBQXFDO0FBQ3JDLGlCQUFpQixnREFBTzs7QUFFeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RlbXBsYXRlLy4vc3JjL3NjcmlwdC5qcz82OGIwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SGFzaE1hcH0gZnJvbSBcIi4vaGFzaG1hcC5qc1wiO1xuY29uc3QgdGVzdCA9IG5ldyBIYXNoTWFwKCkgLy8gb3IgSGFzaE1hcCgpIGlmIHVzaW5nIGEgZmFjdG9yeVxuXG50ZXN0LnNldCgnYXBwbGUnLCAncmVkJylcbnRlc3Quc2V0KCdiYW5hbmEnLCAneWVsbG93JylcbnRlc3Quc2V0KCdjYXJyb3QnLCAnb3JhbmdlJylcbnRlc3Quc2V0KCdkb2cnLCAnYnJvd24nKVxudGVzdC5zZXQoJ2VsZXBoYW50JywgJ2dyYXknKVxudGVzdC5zZXQoJ2Zyb2cnLCAnZ3JlZW4nKVxudGVzdC5zZXQoJ2dyYXBlJywgJ3B1cnBsZScpXG50ZXN0LnNldCgnaGF0JywgJ2JsYWNrJylcbnRlc3Quc2V0KCdpY2UgY3JlYW0nLCAnd2hpdGUnKVxudGVzdC5zZXQoJ2phY2tldCcsICdibHVlJylcbnRlc3Quc2V0KCdraXRlJywgJ3BpbmsnKVxudGVzdC5zZXQoJ2xpb24nLCAnZ29sZGVuJylcbnRlc3Quc2V0KCdtb29uJywgJ3NpbHZlcicpXG5cbmNvbnNvbGUubG9nKFwiZmluYWwgSGFzaE1hcFwiKTtcbmNvbnNvbGUubG9nKHRlc3QpO1xuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/script.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/script.js");
/******/ 	
/******/ })()
;