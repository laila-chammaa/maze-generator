
//following the recursive back-tracker, or iterative implementation of maze generation: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker
var cols, rows;
var w = 20;
var grid = [];
var stack = [];

//current cell being visited
var current;

function setup() {
    createCanvas(600, 600);
    cols = Math.floor(width / w);
    rows = Math.floor(height / w);
    frameRate(20);
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            grid.push(cell);
        } 
    }
    current = grid[0];
}

function draw() {
    background(0);
    for (var i = 0; i < grid.length; i++){
        grid[i].show();
    }

    current.visited = true;
    current.highlight();
    //STEP 1: Choose one of the unvisited neighbors
    next = current.nextNeighbor();
    if (next) {
        //STEP 2: Remove the wall between the current cell and the chosen cell
        removeWalls(current, next);
        //STEP 3: Push the current cell to the stack
        stack.push(current);
        // STEP 4: Mark the chosen cell as visited and push it to the stack
        next.visited = true;
        current = next;
    } else if (stack.length > 0) {
        //If no more neighbors (dead end), pop a cell from the stack and make it a current cell
        current = stack.pop();
    }
    
}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;
}

function removeWalls(a, b) {
    var x = a.i - b.i;
    //if the difference in i is +1, then we need to remove a's left wall and b's right
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        //if the difference in i is -1, then we need to remove a's right wall and b's left
        a.walls[1] = false;
        b.walls[3] = false;
    }
    var y = a.j - b.j;

    //if the difference in j is +1, then we need to remove a's top wall and b's bottom
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        //if the difference in j is -1, then we need to remove a's bottom wall and b's top
        a.walls[2] = false;
        b.walls[0] = false;
    }
}