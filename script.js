'use strict';

const rollBtn = document.querySelector('#rollBtn');
const holdBtn = document.querySelector('#holdBtn');
const gameStatus = document.querySelector('#gameStatus');
const resetBtn = document.querySelector('#resetBtn');

const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const diceValue1 = document.querySelector('#diceValue1');
const diceValue2 = document.querySelector('#diceValue2');
const score1 = document.querySelector('#score1');
const score2 = document.querySelector('#score2');
const player1El = document.querySelector('.player1');
const player2El = document.querySelector('.player2');

let currentPlayer = 1;          
let diceValues = [0, 0];         
let scores = [0, 0];            
let gameOver = false;

function setActivePlayer() {
  if (currentPlayer === 1) {
    player1El.classList.add('active');
    player2El.classList.remove('active');
  } else {
    player2El.classList.add('active');
    player1El.classList.remove('active');
  }
}

function updateUI() {
  img1.src = `./dice${diceValues[0]}.png`;
  img2.src = `./dice${diceValues[1]}.png`;

  diceValue1.textContent = diceValues[0];
  diceValue2.textContent = diceValues[1];

  score1.textContent = scores[0];
  score2.textContent = scores[1];

  setActivePlayer();

  if (!gameOver) {
    gameStatus.value = `Player ${currentPlayer}'s Turn`;
  }
}

function rollDice() {
  if (gameOver) return;

  const roll = Math.floor(Math.random() * 6) + 1;
  diceValues[currentPlayer - 1] = roll;

  if (roll === 1) {
    updateUI();
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateUI();
    return;
  } else {
    scores[currentPlayer - 1] += roll;
    updateUI();

    if (scores[currentPlayer - 1] >= 100) {
      gameStatus.value = `Player ${currentPlayer} Wins! 🎉`;
      rollBtn.disabled = true;
      holdBtn.disabled = true;
      player1El.classList.remove('active');
      player2El.classList.remove('active');
      gameOver = true;
      return;
    }
  }
}

function holdDice() {
  if (gameOver) return;
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateUI();
}

function resetGame() {
  diceValues = [0, 0];
  scores = [0, 0];
  currentPlayer = 1;
  gameOver = false;

  img1.src = './dice0.png';
  img2.src = './dice0.png';
  diceValue1.textContent = '0';
  diceValue2.textContent = '0';
  score1.textContent = '0';
  score2.textContent = '0';

  rollBtn.disabled = false;
  holdBtn.disabled = false;

  setActivePlayer();
  gameStatus.value = `Player ${currentPlayer}'s Turn`;
}

resetGame();
rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', holdDice);
resetBtn.addEventListener('click', resetGame);
