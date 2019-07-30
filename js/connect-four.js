"use strict";
var selectedColumn;
var selectedRow;
var selectedCell;
var player = "player1";
// var singlePlayer = false;
var gridPosition = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [9, 9, 9, 9, 9, 9, 9]
];

// var numbPlayers = prompt("singleplayer? (yes or no)").toLowerCase();
// if (numbPlayers === "yes") {
//   singlePlayer = true;
// }

//locate empty row to fill
function findRow(selectedColumn) { 
  var i = 0;
  while(gridPosition[i][selectedColumn] === 0) {
    i++;
  }
  //add player # to array
  if (player === "player1") {
    gridPosition[i-1][selectedColumn] = 1;
  } else {
    gridPosition[i-1][selectedColumn] = 2;
  }
  //save selected row number
  selectedRow = i-1;
}

//find cell location in single array of cells
function getSelectedCell(selectedRow, selectedColumn) {
  selectedCell = selectedColumn + (selectedRow * 7);
  return selectedCell;
}

function switchPlayer() {
  if (player === "player1") {
    player = "player2";
  } else {
    player = "player1";
  }
}

function checkHorizontal(playerNumber) {
  var rowCount = 0;
  for(var i = 0; i < gridPosition.length; i++) {
    for(var j = 0; j < gridPosition[i].length; j++) {
      if(gridPosition[i][j] === playerNumber) {
        rowCount++;
        if(rowCount === 4) {
          alert(`Player${playerNumber} wins!`);
          break;
        }
      } else {
        rowCount = 0;
      }
    }
    rowCount = 0;
  }
}

function checkVertical(playerNumber) {
  var colCount = 0;
  for(var j = 0; j < gridPosition[0].length; j++) {
    for(var i = 0; i < gridPosition.length; i++) {
      if(gridPosition[i][j] === playerNumber) {
        colCount++;
        if(colCount === 4) {
          alert(`Player${playerNumber} wins!`);
          break;
        }
      } else {
        colCount = 0;
      }
    }
    colCount = 0;
  }
}

function checkDiagonal1(playerNumber) {
  for(var j = 0; j < 7; j++) {
    for (var row = 6; row >= 0; row--) {
      if (
        gridPosition[row][j] === playerNumber &&
        gridPosition[row-1][j+1] === playerNumber &&
        gridPosition[row-2][j+2] === playerNumber &&
        gridPosition[row-3][j+3] === playerNumber
      ) {
        alert(`Player${playerNumber} wins!`);
      }
    }
  }
}

function checkDiagonal2(playerNumber) {
  for(var j = 0; j < 7; j++) {
    for (var row = 6; row >= 0; row--) {
      if (
        gridPosition[row][j] === playerNumber &&
        gridPosition[row+1][j+1] === playerNumber &&
        gridPosition[row+2][j+2] === playerNumber &&
        gridPosition[row+3][j+3] === playerNumber
      ) {
        alert(`Player${playerNumber} wins!`);
      }
    }
  }
}

function checkForWin () {
  checkHorizontal(1);
  checkHorizontal(2);
  checkVertical(1);
  checkVertical(2);
  checkDiagonal1(1);
  checkDiagonal1(2);
  checkDiagonal2(1);
  checkDiagonal2(2);
}

//event handler
var grid = document.getElementById("grid");
grid.addEventListener("click", function(event) {
  event.preventDefault(); //what does this do again?
  selectedColumn = event.target.getAttribute("data-column") -1;
  findRow(selectedColumn);
  getSelectedCell(selectedRow, selectedColumn);
  var allCells = document.querySelectorAll(".cell");
  allCells[selectedCell].setAttribute("class", "cell " + player);
  checkForWin();
  switchPlayer();
});

// if (player === player2 && singlePlayer) {
//   // grid.click();
//   document.getElementById("grid").click()
// }