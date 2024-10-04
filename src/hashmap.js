import {LinkedList} from "./linkedlist.js";
//console.log(greeting);

//use this when accessing a bucket through an index.Want to throw an error if we try to access an out of bound index
//if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bound");
//}
class HashMap{
    constructor() {
        //hashMap with 100 buckets
        this.buckets = new Array(100);
      }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
          
        }
        console.log("hash code is")
        console.log(hashCode)
        console.log("bucket is")
        console.log(hashCode % this.buckets.length)
     
        return hashCode % this.buckets.length //to make hash matach buckets;
    } 
    
    set(newKey,newValue){
        let thisHash = this.hash(newKey);

        console.log("bucket is")
        console.log(this.buckets[thisHash])
        
        //if this bucket is empty put this in there
        if(this.buckets[thisHash] == undefined){
            this.buckets[thisHash] = new LinkedList();
            this.buckets[thisHash].append({key:newKey,value:newValue});
            console.log("when set method used i was placed in an empty bucket. My data is ")
            console.log({key:newKey,value:newValue})
            return
        }

        //check if linked list had key by moving through linked list while data is not empty
        let currentNode = this.buckets[thisHash].head;
        if(currentNode.data !== null){
            if(currentNode.data.key == newKey){
                currentNode.data.value = newValue;  
                console.log("when set method used, my key was already in the bucket so i repalced the value in that bucket. My data is ")
                console.log({key:newKey,value:newValue}) 
                return
            }
            currentNode = currentNode.next
        }
        //there has been a collision - add to end of linked list
        console.log("when set method used, there was already something else in my bucket so I joined the linekd list. My data is ")
        console.log({key:newKey,value:newValue}) 
        this.buckets[thisHash].append({key:newKey,value:newValue});
        return
        

    }
    get(key){
        //find value assosicated with key
    }
}


export {HashMap}