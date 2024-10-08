import {LinkedList} from "./linkedlist.js";

//use this when accessing a bucket through an index.Want to throw an error if we try to access an out of bound index
//if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bound");
//}
class HashMap{
    constructor() {
        //hashMap with 10 buckets (will grow if too full)
        let bucketSize = 16; 
        
        this.buckets = new Array(bucketSize);
      }
      

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
          
        }
     
        return hashCode % this.buckets.length //to make hash matach buckets;
    } 
    checkToGrow(){//if entries go above 0.75*capacity, double capacity.
        let loadFactor = 0.75;
        let capacity = this.buckets.length;
        let numberToGrowAt = Math.round(capacity * loadFactor);
        let numberOfEntries = this.length();
        if(numberToGrowAt == numberOfEntries){
            //save previous entries
            let oldHashMap = this.entries();
            //create new list
            this.buckets = new Array(2*capacity);
            //copy old ones to new
            for (let i=0;i<oldHashMap.length;i++){
                this.set(oldHashMap[i][0],oldHashMap[i][1]);
            }
        }
    }
    set(newKey,newValue){
        
        //run grow check for capacity
        this.checkToGrow();
        let thisHash = this.hash(newKey);
        
        //if this bucket is empty put this in there
        if(this.buckets[thisHash] == undefined ){
            this.buckets[thisHash] = new LinkedList();
            this.buckets[thisHash].append({key:newKey,value:newValue});
            return
        }

        //check if linked list had key by moving through linked list while data is not empty
        let currentNode = this.buckets[thisHash].head;
        while(currentNode !== null){
            if(currentNode.data.key == newKey){
                currentNode.data.value = newValue;  
                return
            }
            currentNode = currentNode.next
        }
        //there has been a collision - add to end of linked list
        this.buckets[thisHash].append({key:newKey,value:newValue});
        return
        

    }
    get(keyToFind){
        //find value assosicated with key
        let thisHash = this.hash(keyToFind);
        //if this bucket is empty return null
        if(this.buckets[thisHash] == undefined){
            return null
        }
        //traverse through linked list and get value
        let currentNode = this.buckets[thisHash].head;
        
        while(currentNode !== null){

            if(currentNode.data.key == keyToFind){
                return currentNode.data.value;  
            }
            currentNode = currentNode.next
        }
        return null
    }
    has(keyToFind){
        let value = this.get(keyToFind);
        if(value == null){return false}
        return true
    }
    remove(keyToRemove){
        let valueToRemove = this.get(keyToRemove);
        if(valueToRemove == null){return false};
        let thisHash = this.hash(keyToRemove);
       
        let currentNode = this.buckets[thisHash].head;
        let nodeBefore;
        //if its the head that matches key
        if(currentNode.data.key == keyToRemove){
            if(currentNode.next == null){
                this.buckets[thisHash] = undefined;
                return true
            }
            this.buckets[thisHash].head = currentNode.next
            return true
        }
        //find key in linked list
        while(currentNode.data.key !== null){
            if(currentNode.next.data.key == keyToRemove){
                nodeBefore = currentNode;
                currentNode = currentNode.next
                break
            }
            currentNode = currentNode.next
        }
        let nodeAfter = currentNode.next;
        nodeBefore.next = nodeAfter;
        return true
    }
    length(){
        //cycle through, if undefined count and check size of each list within each bucket
        let hashLength = this.buckets.length;
        let count = 0;
        for(let i=0;i<hashLength;i++){
            if(this.buckets[i] !== undefined){
                let listLength = this.buckets[i].size();
                count = count + listLength;
            }
        }
        return count;
    }
    clear(){
        //remove all
        this.buckets = new Array(100);
        return
    }
    keys(){
        //returns array with all keys
        let keyArray = [];
        let hashLength = this.buckets.length;
        for(let i=0;i<hashLength;i++){
            if(this.buckets[i] !== undefined){
                let currentNode = this.buckets[i].head;
                while(currentNode !== null){
                    let thisKey = currentNode.data.key;
                    keyArray.push(thisKey);
                    currentNode = currentNode.next
                }
            }
        }
        return keyArray;

    }
    values(){
        //returns array with all keys
        let valueArray = [];
        let hashLength = this.buckets.length;
        for(let i=0;i<hashLength;i++){
            if(this.buckets[i] !== undefined){
                let currentNode = this.buckets[i].head;
                while(currentNode !== null){
                    let thisValue = currentNode.data.value;
                    valueArray.push(thisValue);
                    currentNode = currentNode.next
                }
            }
        }
        return valueArray;

    }
    entries(){
        let entryArray = [];
        let keyArray = this.keys();
        let valueArray = this.values();
        for(let i = 0; i<keyArray.length; i++){
            let thisEntry = [keyArray[i],valueArray[i]];
            entryArray.push(thisEntry);
        }
        return entryArray


    }
}


export {HashMap}