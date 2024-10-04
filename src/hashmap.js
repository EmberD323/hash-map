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
     
        return hashCode % this.buckets.length //to make hash matach buckets;
    } 
    set(newKey,newValue){//comeback here and insert grow logic

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
        console.log(currentNode);
        while(currentNode.data.key !== null){
            if(currentNode.next.data.key == keyToRemove){
                nodeBefore = currentNode;
                currentNode = currentNode.next
                break
            }
            currentNode = currentNode.next
        }
        console.log("nodeBefore");
        console.log(nodeBefore);
        //not before.next = node after
        let nodeAfter = currentNode.next;
        console.log("nodeAfter");
        console.log(nodeAfter);
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
}


export {HashMap}