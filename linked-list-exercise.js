console.log("---");

/*
You will need two classes or factories:

    LinkedList class / factory, which will represent the full list.
    Node class / factory, containing a value function and a link to the nextNode, set both as null by default.

Build the following functions in your linked list class:

    append(value) adds a new node containing value to the end of the list
    prepend(value) adds a new node containing value to the start of the list
    size returns the total number of nodes in the list
    head returns the first node in the list
    tail returns the last node in the list
    at(index) returns the node at the given index
    pop removes the last element from the list
    contains(value) returns true if the passed in value is in the list and otherwise returns false.
    find(value) returns the index of the node containing value, or null if not found.
    toString represents your LinkedList objects as strings, so you can print them out and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null

Extra Credit

    insertAt(value, index) that inserts a new node with the provided value at the given index.
    removeAt(index) that removes the node at the given index.

*/

function LinkedList() {
  let head = null;

  function append(value) {
    if (!head) {
      head = Node(value);
    } else {
      let node = head;
      while (node.next) {
        node = node.next;
      }
      node.next = Node(value);
    }
  }
  function prepend(value) {}

  function size() {}

  function tail() {}

  function at(index) {}

  function pop() {}

  function contains(value) {}

  function find(value) {}

  function toString() {
    if (!head) {
      return "empty list";
    } else {
      let node = head;
      let string = head.value.toString();
      while (node.next) {
        node = node.next;
        string += node.value.toString();
      }
      return string;
    }
  }

  function insertAt(value, index) {}

  function removeAt(index) {}

  return {
    append,
    prepend,
    size,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
}

function Node(value) {
  let next = null;
  return { value, next };
}

const myList = LinkedList();

myList.append(5);
myList.append(3);
myList.append(8);
myList.append(6);

console.log(myList.toString());
