const boardEl = document.querySelector('.board');
const cellAllEl = document.querySelectorAll('.cell');
const winningMsgEl = document.querySelector('.winning-message');
const winningMsgTextEl = document.querySelector('.winning-message-text');
const restartBtnEl = document.querySelector('.restart');
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const xClass = 'x';
const oClass = 'o';
let turnClass = false;
startGameHandler();

restartBtnEl.addEventListener('click', () => {
  winningMsgEl.classList.remove('show');
  cellAllEl.forEach((cellEl) => {
    cellEl.classList.remove(xClass);
    cellEl.classList.remove(oClass);
  });
  boardEl.classList.remove(xClass);
  boardEl.classList.remove(oClass);
  startGameHandler();
});

function startGameHandler() {
  turnClass = false;
  cellAllEl.forEach((cellEl) => {
    cellEl.addEventListener('click', clickHandler, { once: true });
  });
  setBoardHoverClassHandler();
}

function clickHandler(e) {
  const cell = e.target;
  const currentClass = turnClass ? oClass : xClass;
  placeMarkHandler(cell, currentClass);
  if (checkWinHandler(currentClass)) {
    endGameHandler();
  } else if (isDrawHandler()) {
    endGameHandler(true);
  } else {
    switchClassHandler();
    setBoardHoverClassHandler();
  }
}

function placeMarkHandler(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switchClassHandler() {
  turnClass = !turnClass;
}

function setBoardHoverClassHandler() {
  boardEl.classList.remove(xClass);
  boardEl.classList.remove(oClass);
  const currentClass = turnClass ? oClass : xClass;
  boardEl.classList.add(currentClass);
}

function checkWinHandler(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellAllEl[index].classList.contains(currentClass);
    });
  });
}

function isDrawHandler() {
  return [...cellAllEl].every((cellEl) => {
    return (
      cellEl.classList.contains(xClass) || cellEl.classList.contains(oClass)
    );
  });
}

function endGameHandler(draw = false) {
  if (draw) {
    winningMsgTextEl.innerText = 'DRAW !';
  } else {
    winningMsgTextEl.innerText = `${turnClass ? 'O' : 'X'} WIN !`;
  }
  winningMsgEl.classList.add('show');
}
