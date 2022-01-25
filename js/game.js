"use strict";
const WALL = "⏹";
const FOOD = "▫️";
const EMPTY = " ";
const POWER_FOOD = "⚪";
const CHERRY = '🍒'

var gCherryOnBoard = false
var gEatenFood = 0;
var gFoodCount = 0;
var gBoard;
var gGame = {
  score: 0,
  isOn: false,
};

function init() {
  gEatenFood = 0;
  gFoodCount = 0;
  gBoard = buildBoard();
  createGhosts(gBoard);
  createPacman(gBoard);
  printMat(gBoard, ".board-container");
  gGame.isOn = true;
  resetScore();
  setInterval(addCherry, 15000);
}
function resetScore() {
  var elScore = document.querySelector("h2 span");
  elScore.innerText = gGame.score;
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      gFoodCount++;
      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL;
        gFoodCount--;
      }
    }
  }
  board[1][1] = POWER_FOOD;
  board[1][8] = POWER_FOOD;
  board[8][1] = POWER_FOOD;
  board[8][8] = POWER_FOOD;
  gFoodCount -= 4
  return board;
}

// update model and dom
function updateScore(diff) {
  // model
  gGame.score += diff;

  //dom
  var elScore = document.querySelector("h2 span");
  elScore.innerText = gGame.score;
}

function addCherry() {
  if (!gCherryOnBoard) {
      var pos = getEmptyPos();
      if (!pos) return;
      gBoard[pos.i][pos.j] = CHERRY;
      renderCell(pos, CHERRY);
      gCherryOnBoard = true
  }
}

function gameOver(gameRes) {
  if (gameRes) {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    var elModal = document.querySelector(".modal");
    elModal.style.display = "block";
    elModal.innerHTML = `<p>Victory!</p> \n <button onclick="restartGame()">Play Again!</button>`;
  } else {
    var elModal = document.querySelector(".modal");
    elModal.style.display = "block";
    elModal.innerHTML = `<p>Game Over!</p> \n <button onclick="restartGame()">Try Again!</button>`;
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
  }
}

function restartGame() {
  var elModal = document.querySelector(".modal");
  elModal.style.display = "none";
  gGame.score = 0;
  init();
}
