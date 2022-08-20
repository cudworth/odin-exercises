function Tree(array) {
  let root = buildTree(array);

  function Node(data) {
    let left = null,
      right = null;
    return { data, left, right };
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

  function print() {
    console.log("### PRINT TREE ###");
    levelOrder(_print);
    console.log("##################");
    function _print(node) {
      const left = node.left ? node.left.data.toString() + " <- " : "";
      const right = node.right ? " -> " + node.right.data.toString() : "";
      console.log(left + "(" + node.data.toString() + ")" + right);
    }
  }

  function levelOrder(fn, node = root) {
    if (!root) {
      return;
    }
    let stack = [node];
    while (stack.length) {
      node = stack.shift();
      if (node.left) {
        stack.push(node.left);
      }
      if (node.right) {
        stack.push(node.right);
      }
      fn(node);
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
    levelOrder((node) => array.push(node.data));
    root = buildTree(array);
  }

  function findNode(value) {
    const query = _find(value);
    return query.node;
  }

  function find(value) {
    let node = root;
    let parent = null;
    let depth = null;

    if (!root) {
      return buildObj();
    }
    depth = 0;
    while (node.data !== value) {
      parent = node;
      depth++;
      if (value < node.data && node.left) {
        node = node.left;
      } else if (node.data < value && node.right) {
        node = node.right;
      } else {
        node = null;
        depth = null;
        return buildObj();
      }
    }
    return buildObj();

    function buildObj() {
      return {
        node,
        parent,
        depth,
      };
    }
  }

  function height(node) {
    if (!node) {
      return null;
    }
    let max_height = 0;
    _height(node);
    function _height(node, height = 0) {
      if (!node) {
        return;
      } else {
        max_height = max_height < height ? height : max_height;
        _height(node.left, height + 1);
        _height(node.right, height + 1);
      }
    }
    return max_height;
  }

  function depth(node) {
    if (!node) {
      return null;
    } else {
      const query = find(node.data);
      return query.depth;
    }
  }

  function isBalanced() {
    if (!root) {
      return true;
    }

    let isTrue = true;
    _checkBalance(root);

    function _checkBalance(node) {
      if (!node) {
        return 0;
      } else {
        const left = _checkBalance(node.left);
        const right = _checkBalance(node.right);
        const diff = left - right;
        if (1 < diff || diff < -1) {
          isTrue = false;
        }
        return 1 + left + right;
      }
    }
    return isTrue;
  }

  function insertNode(value) {
    if (!root) {
      root = Node(value);
      return;
    } else {
      const { node, parent } = find(value);
      if (!node) {
        const new_node = Node(value);
        if (new_node.data < parent.data) {
          parent.left = new_node;
        } else {
          parent.right = new_node;
        }
      }
    }
  }

  function deleteNode(value) {
    if (!root) {
      return;
    } else {
      const { node, parent } = find(value);
      if (node) {
        // no children of node
        if (!node.left && !node.right) {
          if (!parent) {
            root = null;
            return;
          }
          if (parent.left === node) {
            parent.left = null;
          }
          if (parent.right === node) {
            parent.right = null;
          }
        }

        // single child of node
        if ((!node.left && node.right) || (node.left && !node.right)) {
          if (!parent) {
            root = node.left ? node.left : node.right;
            return;
          }
          if (parent.left === node) {
            parent.left = node.left ? node.left : node.right;
          }
          if (parent.right === node) {
            parent.right = node.left ? node.left : node.right;
          }
        }

        // two children of node
        if (node.left && node.right) {
          let nearest = node.right;
          while (nearest.left) {
            nearest = nearest.left;
          }
          const temp_data = nearest.data;
          deleteNode(temp_data);
          node.data = temp_data;
        }
      }
    }
  }

  return {
    print,
    insertNode,
    deleteNode,
    find,
    rebalance,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
  };
}

function testDrive() {
  const myArray = randomUniqueIntegerArray(4, 0, 30);
  const myTree = Tree(myArray);
  myTree.print();
  console.log(
    myTree.isBalanced() ? "\n Tree is balanced" : "\n Tree is not balanced"
  );
  testPrint();
  myTree.insertNode(Math.floor(Math.random() * 100) + 100);
  myTree.insertNode(Math.floor(Math.random() * 100) + 100);
  myTree.insertNode(Math.floor(Math.random() * 100) + 100);
  console.log(
    myTree.isBalanced() ? "\n Tree is balanced" : "\n Tree is not balanced"
  );
  myTree.rebalance();
  console.log(
    myTree.isBalanced() ? "\n Tree is balanced" : "\n Tree is not balanced"
  );
  testPrint();

  function testPrint() {
    const printFn = (node) => console.log(node.data);

    console.log("\n Level Order Traversal:");
    myTree.levelOrder(printFn);
    console.log("\n Pre-Order Traversal:");
    myTree.preOrder(printFn);
    console.log("\n Post-Order Traversal:");
    myTree.postOrder(printFn);
    console.log("\n In-Order Traversal:");
    myTree.inOrder(printFn);
  }

  function randomUniqueIntegerArray(n, min, max) {
    const array = [];
    const range = max - min + 1;
    if (range < n) {
      return null;
    }
    while (array.length < n) {
      const val = Math.floor(Math.random() * range) + min;
      if (!array.includes(val)) {
        array.push(val);
      }
    }
    return array;
  }
}

testDrive();
