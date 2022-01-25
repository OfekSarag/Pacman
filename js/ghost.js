"use strict";
const GHOST = "👻";

var gGhosts = [];
var gIntervalGhosts;
var gDeadGhosts = [];

function createGhost(board) {
  var ghost = {
    location: {
      i: 3,
      j: 3,
    },
    currCellContent: FOOD,
    color: getRandomColor(),
  };

  gGhosts.push(ghost);
  //model
  board[ghost.location.i][ghost.location.j] = GHOST;
}

// 3 ghosts and an interval
function createGhosts(board) {
  gGhosts = [];
  createGhost(board);
  createGhost(board);
  createGhost(board);
  gIntervalGhosts = setInterval(moveGhosts, 1000);
}

// loop through ghosts
function moveGhosts() {
  for (var i = 0; i < gGhosts.length; i++) {
    moveGhost(gGhosts[i]);
  }
}
function moveGhost(ghost) {
  // figure out moveDiff, nextLocation, nextCell
  var moveDiff = getMoveDiff();
  var nextLocation = {
    i: ghost.location.i + moveDiff.i,
    j: ghost.location.j + moveDiff.j,
  };
  var nextCellContent = gBoard[nextLocation.i][nextLocation.j];

  // return if cannot move
  if (nextCellContent === WALL) return;
  if (nextCellContent === GHOST) return;
  // hitting a pacman?  call gameOver
  if (nextCellContent === pacman) {
    if (!gPacman.isSuper) {
      gameOver();
      return;
    }
    return;
  }
  

  // update the model
  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
  // update the DOM
  renderCell(ghost.location, ghost.currCellContent);
  // Move the ghost
  ghost.location = nextLocation;
  ghost.currCellContent = nextCellContent;
  // update the model
  gBoard[ghost.location.i][ghost.location.j] = GHOST;
  // update the DOM
  renderCell(ghost.location, getGhostHTML(ghost));
}

function resetGhosts() {
  gPacman.isSuper = false;
  for (var i = 0; i < gDeadGhosts.length; i++) {
    gGhosts.push(gDeadGhosts[i]);
  }
  gDeadGhosts = [];
}

function handleGhost(ghost) {
  if (ghost.currCellContent === FOOD) {
    updateScore(1);
    gEatenFood++
    ghost.currCellContent = EMPTY;
  }
  var deadGhost = gGhosts.splice(gGhosts.indexOf(ghost), 1)[0];
  gDeadGhosts.push(deadGhost);
}

function getGhostByLoc(loc) {
  for (var i = 0; i < gGhosts.length; i++) {
    if (gGhosts[i].location.i === loc.i && gGhosts[i].location.j === loc.j) {
      return gGhosts[i];
    }
  }
}

function getMoveDiff() {
  var randNum = getRandomIntInclusive(0, 100);
  if (randNum < 25) {
    return { i: 0, j: 1 };
  } else if (randNum < 50) {
    return { i: -1, j: 0 };
  } else if (randNum < 75) {
    return { i: 0, j: -1 };
  } else {
    return { i: 1, j: 0 };
  }
}

function getGhostHTML(ghost) {
  if (gPacman.isSuper) return `<span style="color:cyan">${GHOST}</span>`;
  return `<span style="color: ${ghost.color}">${GHOST}</span>`;
}
