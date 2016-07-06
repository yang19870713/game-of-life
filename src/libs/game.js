import { DEFAULT_WORLD } from 'configs/world';
console.log(DEFAULT_WORLD)
/*
Game of Life(http://www.bitstorm.org/gameoflife/)
In this algorithm, there are two equivalent data form to hode the state of the "world":
1. matrix: the "world" is represented by a matrix, where any position which is occupied by a living cell will be given the value "1" and empty positions are given the value "0".
2. data: as the matrix is sparse, we can draw the populated points from it and reprensent these points by [x,y].
*/
//coordinator of neighbours of a cell
const NEIGHBOURS = [
    [-1,-1], [0, -1], [1, -1],
    [-1, 0],          [1, 0],
    [-1, 1], [0, 1], [1, 1]
];

let _data = [];
let _world = DEFAULT_WORLD;

/***********************utilities*****************************************/

/*create an empty matrix with given width and height*/
let makeEmptyMatrix = (w, h) => {
    //r for row, c for column
    let matrix = [];
    for(let r = 0; r < w; r++){
      matrix.push([]);
      for(let c = 0; c < h; c++){
       matrix[r].push(0);
      }
    }
    return matrix;
}


/*get matrix form from data form*/
let fillDataToMatrix = (data, matrix) => {
    data.map((point)=>{
        matrix[point[0]][point[1]] = 1;
  });
}


/*get data form from matrix form*/
let drawDataFromMatrix = (matrix) => {
    let data = [];
    if(matrix.length && matrix[0].length){
        for(let x = 0 ; x < matrix.length; x++){
            for(let y = 0; y< matrix[0].length; y++){
                if(matrix[x][y]) {
                    data.push([x, y]);
                }
            }
        }
    }
    return data;
}

/*Each time when we calculate the new state of the world, some of the points(empty points) will not be affected.
This function estimate the the minimun matrix(workspace) which need to be caulcutated, accoridng to current state(in data form)*/
let getWorkSpace = (data, world) => {
    let x_min,
        y_min,
        x_max,
        y_max,
        x=[],
        y=[];
    data.map(point=>{
        x.push(point[0]);
        y.push(point[1]);
    });
    x.sort(function(a,b){
        return a>b;
    });
    y.sort(function(a,b){
        return a>b;
    });
    x_min = x.shift();
    y_min = y.shift();
    x_max = x.pop();
    y_max = y.pop();

    return {
        x_min: x_min === 0? x_min: x_min-1,
        y_min: y_min === 0? y_min: y_min-1,
        x_max: x_max === world.width-1? x_max: x_max+1,
        y_max: y_max === world.height-1? y_max: y_max+1
    }
}

/*give the [x,y] coordinator of a point and the world matrix state, get the next state of this point*/
let getNextCellState = (x, y, matrix) => {
    let count = 0;    //count of living data

    if(matrix[x][y]){  //the cell is populated
        NEIGHBOURS.map((n)=>{
            if(x+n[0]>=0 && x+n[0]<matrix.length){
                let n_state = matrix[x+n[0]][y+n[1]];
                if(n_state){
                    count ++;
                }
            }
        });
        if(count<=1 || count>=4) {
            return 0;
        }
        else {
            return 1;
        }
    }
    else {
        NEIGHBOURS.map((n)=>{
            if(x+n[0]>=0 && x+n[0]<matrix.length){
                let n_state = matrix[x+n[0]][y+n[1]];
                if(n_state){
                    count ++;
                }
            }
        });

        if(count === 3) {
            return 1;
        }
        else {
            return 0;
        }
    }
}

/*
given a data-formed state and a workspace, get next state of the world
*/
let getNextWorldState = () => {
    let { x_min, x_max, y_min, y_max } = getWorkSpace(_data, _world);
    console.log("old data", _data);

    let width = x_max-x_min+1,
        height = y_max-y_min+1,
        matrix = makeEmptyMatrix(width, height),
        newMatrix = makeEmptyMatrix(width, height),
        newData;

    let normalizedData = _data.map((point)=>{
        return [point[0]-x_min, point[1]-y_min];
    })
    fillDataToMatrix(normalizedData, matrix);

    for(let x = 0; x < width; x++ ){
        for(let y = 0; y < height; y++){
            newMatrix[x][y] = getNextCellState(x, y, matrix);
        }
    }

    newData = drawDataFromMatrix(newMatrix).map((point)=>{
        return [point[0]+x_min, point[1]+y_min];
    })

    console.log("new data", newData);
    return newData;
}

let Game;
export default Game = {
    setData(data){
        _data = data;
    },
    setWorld(w, h){
        _world = {
            width: w,
            heigth: h
        }
    },
    getNext(data){
         if(data){
             this.setData(data);
         }
         _data = getNextWorldState();
         return _data;
    }
}
