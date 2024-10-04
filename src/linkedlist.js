//node constructor
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList{
    //list constructor
    constructor() {
        this.head = null;
    }
    append(data) {
        //create node
        const newNode = new Node(data);
        //if list is empty, assign this node to head
        if (this.head == null) {
            this.head = newNode;
            return
        } else {
            //traveses the list until it reaches last node and appends new node
            //start at head
            let currentNode = this.head;
            //search until there is a node with a null next
            while (currentNode.next !== null) {
                //move to next node
                currentNode = currentNode.next;
            }
            //whn the while is finished ie when there is a next = null, add this new node as the next
            currentNode.next = newNode;
        }
    }
    preend(data){
        //create node
        const newNode = new Node(data);
        //if theres a head already, newNode.next should be that node (works for null too)
        newNode.next = this.head;
        //change head reference to this node
        this.head = newNode;
    }
    size(){
        let currentNode = this.head;
        let count = 0;
        if (this.head.next == null) {return count}
        count =1;
        while (currentNode.next !== null) {
            count++;
            currentNode = currentNode.next;
        }
        return count
    }
    headFind(){
        return this.head
    }
    tailFind(){
        let currentNode = this.head;
            //search until there is a node with a null next
            while (currentNode.next !== null) {
                //move to next node
                currentNode = currentNode.next;
            }
        return currentNode
    }
    at(index){
        //index 0
        if (index == 0){return this.head}
        let currentNode = this.head
        //loop across list until index and return node
        for(let i=0;i<index;i++){
            if (currentNode.value==null){return null}
            currentNode = currentNode.next;
        }
        return currentNode
    }
    pop(){
        let currentNode = this.head;
            //search while nodes have a next
            while (currentNode.next !== null) {
                //if two after currentNode is null then change next node to empty next
                if(currentNode.next.next == null){
                    currentNode.next = null;
                    return
                }
                //otherwise move to next node
                currentNode = currentNode.next;
            }
    }
    contains(valueToFind){
        let currentNode = this.head;
        //search while nodes have values
        while (currentNode !== null) {
            if(currentNode.data == valueToFind){
                return true
            }
            //otherwise move to next node
            currentNode = currentNode.next;
        }
        return false
    }
    find(valueToFind){
        let currentNode = this.head;
        let index = 0;
        //search while nodes have values
        while (currentNode.data !== null) {
            if(currentNode.data == valueToFind){
                return index
            }
            if (currentNode.next==null){return null}
            //otherwise move to next node
            currentNode = currentNode.next;
            index++;
        }
    }
    toString(){
        //( value ) -> ( value ) -> ( value ) -> null
        let string = "( " + this.head.data+ " )"
        let currentNode = this.head.next;
        //search while nodes have values
        while (currentNode !== null) {
            string = string + " -> ( " + currentNode.data + " )"
            //otherwise move to next node
            currentNode = currentNode.next;
        }
        string = string + " -> null";
        return string
    }
    insertAt(value,index){
        const newNode = new Node(value)
        //if index is 0 then preend
        if(index == 0){
            newNode.next = this.head;
            this.head = newNode;
            return
        }
        //otherwise slot in
        //find node current node at that index = nodeAfter
        let currentNode = this.head
        for(let i=1;i<index;i++){
            console.log("i is "+i);
            currentNode = currentNode.next;
            if (currentNode.next==null){break}
        }
        console.log(currentNode);
        let nodeAfter = currentNode.next;
        let nodeBefore = currentNode;
        newNode.next = nodeAfter;
        nodeBefore.next = newNode;
    }
   
}

export {Node,LinkedList}

