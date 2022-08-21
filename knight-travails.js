function knightMoves(start, end) {
  //breadth first search to find shortest route (queue)
  const visited = new Set();
  let shortestPath = null;
  const queue = [[start]];
  while (!shortestPath) {
    const path = queue.shift();
    const space = path[path.length - 1];
    visited.add(hash(space));
    getValidMoves(space).forEach((move) => {
      if (!visited.has(hash(move))) {
        const newPath = [...path, move];

        if (hash(move) === hash(end)) {
          shortestPath = newPath;
        }

        queue.push(newPath);
      }
    });
  }
  return shortestPath;

  function hash([row, col]) {
    return row * 10 + col;
  }
}

class gameBoard {
  constructor() {
    this.board = [];
    for (let i = 0; i < 10; i++) {
      const arr = Array(10);
      arr.fill(" ");
      this.board.push(arr);
    }
  }

  print() {
    console.log("-------------------------------");
    this.board.forEach((row) => {
      let str = "|";
      row.forEach((cell) => {
        str += cell.toString().padStart(2, " ") + "|";
      });
      console.log(str);
      console.log("-------------------------------");
    });
  }

  setPath(path) {
    path.forEach((step, index) => {
      const [row, col] = step;
      this.board[row][col] = index + 0;
    });
  }
}

function getValidMoves(origin) {
  const [row, col] = origin;
  const valid = [];
  const steps = [
    [1, 2],
    [2, 1],
    [-1, 2],
    [2, -1],
    [1, -2],
    [-2, 1],
    [-1, -2],
    [-2, -1],
  ];
  steps.forEach((step) => {
    const newRow = row + step[0];
    const newCol = col + step[1];
    if (_isValid(newRow, newCol)) {
      valid.push([newRow, newCol]);
    }
  });
  return valid;

  function _isValid(row, col) {
    if (0 <= row && row < 10 && 0 <= col && col < 10) {
      return true;
    } else {
      return false;
    }
  }
}

const myBoard = new gameBoard();
const [start, end] = [
  [3, 3],
  [7, 4],
];
console.log(
  `BFS search for shortest path between board spaces ${start} and ${end}.`
);
const path = knightMoves(start, end);
myBoard.setPath(path);
myBoard.print();
