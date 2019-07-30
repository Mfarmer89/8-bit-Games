"use strict";
var selectedColumn;
var selectedRow;
var selectedCell;
var player = "player1";
var gridPosition = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [9, 9, 9, 9, 9, 9, 9]
];

//locate empty row to fill
function findRow(selectedColumn) {
  var i = 0;
  // console.log(gridPosition[i][selectedColumn]);
  while(gridPosition[i][selectedColumn] === 0) {
    // console.log(gridPosition[i][selectedColumn]);
    i++;
  }
  if (player === "player1") {
    gridPosition[i-1][selectedColumn] = 1;
  } else {
    gridPosition[i-1][selectedColumn] = 2;
  }
  selectedRow = i-1;
}

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

//event handler
var grid = document.getElementById("grid");
grid.addEventListener("click", function(event) {
  event.preventDefault(); //what does this do again?
  selectedColumn = event.target.getAttribute("data-column") -1;
  findRow(selectedColumn);
  getSelectedCell(selectedRow, selectedColumn);
  var allCells = document.querySelectorAll(".cell");
  allCells[selectedCell].setAttribute("class", "cell " + player);
  switchPlayer();
});
