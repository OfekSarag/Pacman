"use strict";
var pacman = "😷";

var gPacman;
function createPacman(board) {
  gPacman = {
    location: {
      i: 6,
      j: 6,
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = pacman;
  gFoodCount--;
}

function movePacman(ev) {
  if (!gGame.isOn) return;
  // use getNextLocation(), nextCell
  var nextLocation = getNextLocation(ev);
  var nextCellContent = gBoard[nextLocation.i][nextLocation.j];
  // return if cannot move
  if (nextCellContent === WALL) return;
  // hitting a ghost?  call gameOver
  if (nextCellContent === GHOST) {
    if (!gPacman.isSuper) {
      gameOver();
      return;
    }
    var currGhost = getGhostByLoc(nextLocation);
    handleGhost(currGhost);
  }
  if (nextCellContent === FOOD) {
    collectFood();
  }
  if (nextCellContent === CHERRY) {
    updateScore(10);
    gCherryOnBoard = false;
  }
  if (nextCellContent === POWER_FOOD) {
    if (gPacman.isSuper) return;
    BuffPac();
  }

  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // update the DOM
  renderCell(gPacman.location, EMPTY);
  // Move the pacman
  gPacman.location = nextLocation;
  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = pacman;
  // update the DOM
  renderCell(gPacman.location, pacman);
}

function BuffPac() {
  gPacman.isSuper = true;

  setTimeout(resetGhosts, 5000);
}

function collectFood() {
  updateScore(1);
  gEatenFood++;
  if (gEatenFood === gFoodCount) {
    gameOver(true);
  }
}
function getNextLocation(ev) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };
  // figure out nextLocation
  switch (ev.key) {
    case "ArrowDown":
      nextLocation.i++;
      break;
    case "ArrowUp":
      nextLocation.i--;
      break;
    case "ArrowLeft":
      nextLocation.j--;
      break;
    case "ArrowRight":
      nextLocation.j++;
      break;
  }

  return nextLocation;
}
