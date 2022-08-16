/*

    Build a Node class / factory. It should have an attribute for the data it stores as well as its left and right children.

    Build a Tree class / factory which accepts an array when initialized. The Tree class should have a root attribute which uses the return value of buildTree which you’ll write next.

    Write a buildTree function which takes an array of data (e.g. [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.

    Write an insert and delete functions which accepts a value to insert/delete (you’ll have to deal with several cases for delete such as when a node has children or not). If you need additional resources, check out these two articles on inserting and deleting, or this video with several visual examples.

    Write a find function which accepts a value and returns the node with the given value.

    Write a levelOrder function which accepts another function as a parameter. levelOrder should traverse the tree in breadth-first level order and provide each node as the argument to the provided function. This function can be implemented using either iteration or recursion (try implementing both!). The method should return an array of values if no function is given. Tip: You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list (as you saw in the video).

    Write inorder, preorder, and postorder functions that accept a function parameter. Each of these functions should traverse the tree in their respective depth-first order and yield each node to the provided function given as an argument. The functions should return an array of values if no function is given.

    Write a height function which accepts a node and returns its height. Height is defined as the number of edges in longest path from a given node to a leaf node.

    Write a depth function which accepts a node and returns its depth. Depth is defined as the number of edges in path from a given node to the tree’s root node.

    Write a isBalanced function which checks if the tree is balanced. A balanced tree is one where the difference between heights of left subtree and right subtree of every node is not more than 1.

    Write a rebalance function which rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.

Tie it all together

Write a simple driver script that does the following:

    Create a binary search tree from an array of random numbers. You can create a function if you want that returns an array of random numbers each time you call it.
    Confirm that the tree is balanced by calling isBalanced
    Print out all elements in level, pre, post, and in order
    Unbalance the tree by adding several numbers > 100
    Confirm that the tree is unbalanced by calling isBalanced
    Balance the tree by calling rebalance
    Confirm that the tree is balanced by calling isBalanced
    Print out all elements in level, pre, post, and in order


*/

function Node(data) {
  let left = null,
    right = null;
  return { data, left, right };
}

function Tree(array) {
  let root = buildTree(array);

  function print() {
    levelOrder(console.log);
  }

  function levelOrder(fn, node = root) {
    let stack = [node];
    while (stack.length) {
      node = stack.shift();
      if (node.left) {
        stack.push(node.left);
      }
      if (node.right) {
        stack.push(node.right);
      }
      fn(node.data);
    }
    return;
  }

  function inOrder(fn = null, node = root) {
    return _depthFirstTraversal("in", fn, node);
  }
  function preOrder(fn = null, node = root) {
    return _depthFirstTraversal("pre", fn, node);
  }
  function postOrder(fn = null, node = root) {
    return _depthFirstTraversal("post", fn, node);
  }
  function _depthFirstTraversal(type, fn, node) {
    const array = [];
    const _fn = fn ? fn : (node) => array.push(node.data);
    if (type === "in") _inOrder(node);
    if (type === "pre") _preOrder(node);
    if (type === "post") _postOrder(node);

    if (array.length) {
      return array;
    } else {
      return null;
    }

    function _inOrder(node) {
      if (node) {
        _inOrder(node.left);
        _fn(node);
        _inOrder(node.right);
      } else {
        return;
      }
    }

    function _preOrder(node) {
      if (node) {
        _fn(node);
        _preOrder(node.left);
        _preOrder(node.right);
      } else {
        return;
      }
    }

    function _postOrder(node) {
      if (node) {
        _postOrder(node.left);
        _postOrder(node.right);
        _fn(node);
      } else {
        return;
      }
    }
  }

  function rebalance() {
    const array = [];
    levelOrder((val) => array.push(val));
    root = buildTree(array);
  }

  function insertNode(value) {}

  function deleteNode(value) {}

  function find(value) {
    let node = root;
    let parent = null;
    while (node.data !== value) {
      if (value < node.data && node.left) {
        parent = node;
        node = node.left;
      } else if (node.data < value && node.right) {
        parent = node;
        node = node.right;
      } else {
        return { node: null, parent };
      }
    }
    return { node, parent };
  }

  function height(node) {}

  function depth(node) {}

  return {
    root,
    print,
    insertNode,
    deleteNode,
    find,
    rebalance,
    inOrder,
    preOrder,
    postOrder,
  };
}

function buildTree(array) {
  array = array
    .reduce((arr, elem) => {
      if (!arr.includes(elem)) {
        arr.push(elem);
      }
      return arr;
    }, [])
    .sort((a, b) => a - b); //filter duplicates & sort array
  return _build(array);

  function _build(array) {
    if (array.length === 0) {
      return null;
    }
    if (array.length === 1) {
      return Node(array[0]);
    } else {
      const mid = Math.floor(array.length / 2);
      const node = Node(array[mid]);
      const left = array.slice(0, mid);
      const right = array.slice(mid + 1);
      node.left = _build(left);
      node.right = _build(right);
      return node;
    }
  }
}

console.log("########");
const myArray = [1, 6, 4, 9, 5];
const myTree = Tree(myArray);

//myTree.print();
//console.log(myTree.find(5));
//console.log(myTree.inOrder());
//console.log(myTree.preOrder());
//console.log(myTree.postOrder());
