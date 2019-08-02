"use strict";
var selectedColumn;
var selectedRow;
var selectedCell;
var player = "player1";
var singlePlayer;
var playing = "false";
var win;
var winMsg;
var gridPosition = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [9, 9, 9, 9, 9, 9, 9]
];

//draw grid
function drawGrid() {
  grid = document.getElementById("grid");
  for(var j = 0; j < 6; j++) {
    for(var i = 1; i < 8; i++) {
      var div = document.createElement("div");
      div.setAttribute("class", "cell");
      div.setAttribute("data-column", i);
      grid.appendChild(div);
    }
  }
  return grid;
}
drawGrid();

//select single or 2 player mode
var startModal = document.getElementById("modal");
document.querySelectorAll("#modal div:first-child")[0].addEventListener("click", function() {
  singlePlayer = "true";
  startModal.setAttribute("style", "display: none;");
});
document.querySelectorAll("#modal div:nth-child(2n)")[0].addEventListener("click", function() {
  singlePlayer = "false";
  startModal.setAttribute("style", "display: none;");
});

//Audios
var blop = new Audio();
blop.src = "audio/Blop.mp3";
var cheer = new Audio();
cheer.src = "audio/1_person_cheering.mp3";

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
          win = true;
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
          win = true;
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
  for(var i = 0; i < 3; i++) {
    for (var j = 6; j > 2; j--) {
      if (
        gridPosition[i][j] === playerNumber &&
        gridPosition[i+1][j-1] === playerNumber &&
        gridPosition[i+2][j-2] === playerNumber &&
        gridPosition[i+3][j-3] === playerNumber
      ) {
        win = true;
        break;
      }
    }
  }
}

function checkDiagonal2(playerNumber) {
  for(var i = 0; i < 3; i++) {
    for (var j = 0; j < 4; j++) {
      if (
        gridPosition[i][j] === playerNumber &&
        gridPosition[i+1][j+1] === playerNumber &&
        gridPosition[i+2][j+2] === playerNumber &&
        gridPosition[i+3][j+3] === playerNumber
      ) {
        win = true;
        break;
      }
    }
  }
}

function won(enterplayernumber) {
  winMsg = `Player ${enterplayernumber} wins!`;
  cheer.play();
  document.getElementsByTagName("h3")[0].innerHTML = winMsg;
  document.querySelector("div.winModal").className = "show-modal";
  // working with error msg ^
}

function checkForWin () {
  for(var i = 1; i < 3; i++) {
    checkHorizontal(i);
    checkVertical(i);
    checkDiagonal1(i);
    checkDiagonal2(i);
    if (win === true) {
      won(i);
      break;
    }
  }
}

//event listener
var grid = document.getElementById("grid");
grid.addEventListener("click", addPiece);


//event function
function addPiece(event){

  if (playing !== "false" || !event.target.className.includes("cell")) {
    return;
  }
  playing = "true";
  selectedColumn = event.target.getAttribute("data-column") -1;
  findRow(selectedColumn);
  getSelectedCell(selectedRow, selectedColumn);
  var allCells = document.querySelectorAll(".cell");
  blop.play();
  allCells[selectedCell].setAttribute("class", "cell " + player);
  checkForWin();
  switchPlayer();
  //computer as player 2
  if(singlePlayer === "true") {
    selectedColumn = Math.floor(Math.random() * 7);
    console.log("computer", selectedColumn);
    findRow(selectedColumn);
    getSelectedCell(selectedRow, selectedColumn);
    blop.play();
    allCells[selectedCell].setAttribute("class", "cell " + player);
    checkForWin();
    switchPlayer();
  }
  playing = "false";
}

//reset
document.getElementById("close").addEventListener("click", function() {
  // document.querySelector("div.show-modal").className = "winModal";
  // // document.querySelectorAll("#grid>div").setAttribute("class", "cell");
  // document.getElementById("grid").innerHTML = "";
  // drawGrid();
  // gridPosition = [
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [9, 9, 9, 9, 9, 9, 9]
  // ];
  document.location.reload(true);
});

