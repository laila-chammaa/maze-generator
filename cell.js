function Cell(i, j) {
    this.i = i;
    this.j = j;
    //top, right, bottom, left
    this.walls = [true, true, true, true]
    this.visited = false;

    this.nextNeighbor = function () {
        var neighbors = [];
        var top = grid[index(i, j - 1)];
        var right = grid[index(i + 1, j)];
        var bottom = grid[index(i, j + 1)];
        var left = grid[index(i - 1, j)];

        //if out of bound: top,right,bottom,left will be undefined
        //if not visited return it in the neighbors array
        if (top && !top.visited) {
            neighbors.push(top)
        }
        if (right && !right.visited) {
            neighbors.push(right)
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom)
        }
        if (left && !left.visited) {
            neighbors.push(left)
        }

        if (neighbors.length > 0) {
            var r = Math.floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    this.show = function () {
        var x = this.i * w;
        var y = this.j * w;
        stroke(255);
        strokeWeight(2);

        //top
        if (this.walls[0]) {
            line(x, y, x + w, y);
        }
        //right
        if (this.walls[1]) {
            line(x + w, y, x + w, y + w);
        }
        //bottom
        if (this.walls[2]) {
            line(x + w, y + w, x, y + w);
        }
        //left
        if (this.walls[3]) {
            line(x, y, x, y + w);
        }

        //if visited, draw rect with changed color
        if (this.visited) {
            fill(102, 0, 204, 200);
            noStroke();
            rect(x, y, w, w);
        }
    }

    this.highlight = function () {
        var x = this.i * w;
        var y = this.j * w;
        noStroke()
        fill(0, 255, 0);
        rect(x, y, w, w);
    }
}