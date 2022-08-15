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
  let head = null,
    node = null;

  function append(value) {
    if (!head) {
      head = Node(value);
    } else {
      const tail = getTail();
      tail.next = Node(value);
    }
  }

  function prepend(value) {
    if (!head) {
      head = Node(value);
    } else {
      node = Node(value);
      node.next = head;
      head = node;
    }
  }

  function size() {
    if (!head) {
      return 0;
    } else {
      let count = 1;
      node = head;
      while (node.next) {
        node = node.next;
        count++;
      }
      return count;
    }
  }

  function getHead() {
    return head;
  }

  function getTail() {
    if (!head) {
      return null;
    } else {
      node = head;
      while (node.next) {
        node = node.next;
      }
      return node;
    }
  }

  function at(index) {
    if (index < 0 || size() - 1 < index) {
      return null;
    } else if (index === 0) {
      return head;
    } else {
      node = head;
      let count = 0;
      while (count < index) {
        node = node.next;
        count++;
      }
      return node;
    }
  }

  function pop() {
    if (!head) {
      return null;
    } else if (!head.next) {
      node = { ...head };
      head = null;
      return node;
    } else {
      node = head;
      let prev = null;
      while (node.next) {
        prev = node;
        node = node.next;
      }
      prev.next = null;
      return node;
    }
  }

  function contains(value) {
    return find(value) ? true : false;
  }

  function find(value) {
    if (!head) {
      return null;
    } else if (head.value === value) {
      return head;
    } else {
      node = head;
      while (node.next) {
        if (node.value === value) {
          return node;
        }
        node = node.next;
      }
      return null;
    }
  }

  function toString() {
    if (!head) {
      return "empty list";
    } else {
      node = head;
      let string = node.value.toString();
      while (node.next) {
        node = node.next;
        string = string + " -> " + node.value.toString();
      }
      return string;
    }
  }

  function insertAt(value, index) {
    const newNode = Node(value);
    node = at(index - 1);
    if (node) {
      newNode.next = node.next;
      node.next = newNode;
    }
    if (index === 0) {
      newNode.next = head;
      head = newNode;
    }
  }

  function removeAt(index) {
    if (index < 0 || size() - 1 < index) {
      return;
    } else if (index === 0) {
      head = head.next;
      return;
    } else {
      node = head;
      prev = null;
      let count = 0;
      while (count < index) {
        prev = node;
        node = node.next;
        count++;
      }
      prev.next = node.next;
      return;
    }
  }

  return {
    append,
    prepend,
    size,
    getHead,
    getTail,
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
myList.prepend(22);
myList.append(3);
myList.prepend(79);
myList.append(8);
myList.append(6);

console.log(myList.toString());
