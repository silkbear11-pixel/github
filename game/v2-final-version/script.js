(function () {
  'use strict';
  console.log('reading JS');

  const game = document.querySelector('#game');
  const scoreBox = document.querySelector('#score');
  const status = document.querySelector('#status');
  const rollBtn = document.querySelector('#roll');
  const passBtn = document.querySelector('#pass');

  const gameData = {
    dice: ['1die.jpg', '2die.jpg', '3die.jpg', '4die.jpg', '5die.jpg', '6die.jpg'],
    players: ['player 1', 'player 2'],
    score: [0, 0],
    roll1: 0,
    roll2: 0,
    rollSum: 0,
    index: 0,
    gameEnd: 29
  };

  let gameOver = false;

  startGame();

  rollBtn.addEventListener('click', function () {
    if (gameOver === false) {
      throwDice();
    }
  });

  passBtn.addEventListener('click', function () {
    if (gameOver === false) {
      switchPlayer();
      setUpTurn();
    }
  });

  function startGame() {
    gameData.score[0] = 0;
    gameData.score[1] = 0;
    gameData.index = Math.round(Math.random());
    gameOver = false;

    game.innerHTML = '';
    showCurrentScore();
    status.textContent = 'Press Roll to begin.';
  }

  function setUpTurn() {
    status.textContent = `It is ${gameData.players[gameData.index]}'s turn.`;
  }

  function throwDice() {
    gameData.roll1 = Math.floor(Math.random() * 6) + 1;
    gameData.roll2 = Math.floor(Math.random() * 6) + 1;
    gameData.rollSum = gameData.roll1 + gameData.roll2;

    showDice();

    if (gameData.rollSum === 2) {
      status.textContent = 'Snake Eye! Score reset to 0.';
      gameData.score[gameData.index] = 0;
      showCurrentScore();
      switchPlayer();
      setTimeout(setUpTurn, 1200);
    }

    else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
      status.textContent = 'Rolled a 1. Turn ends.';
      switchPlayer();
      setTimeout(setUpTurn, 1200);
    }

    else {
      gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
      showCurrentScore();
      status.textContent = `${gameData.players[gameData.index]} rolled ${gameData.rollSum}. Roll or Pass.`;
      checkWinningCondition();
    }
  }

  function showDice() {
    game.innerHTML = `<img src="images/${gameData.dice[gameData.roll1 - 1]}" alt="die one">
                      <img src="images/${gameData.dice[gameData.roll2 - 1]}" alt="die two">`;
  }

  function switchPlayer() {
    if (gameData.index === 0) {
      gameData.index = 1;
    } else {
      gameData.index = 0;
    }
  }

  function checkWinningCondition() {
    if (gameData.score[gameData.index] > gameData.gameEnd) {
      status.textContent = `${gameData.players[gameData.index]} wins! Click Reset to play again.`;
      gameOver = true;
    }
  }

  function showCurrentScore() {
    scoreBox.innerHTML = `<h2>Score</h2>
                          <p>P1: ${gameData.score[0]}</p>
                          <p>P2: ${gameData.score[1]}</p>`;
  }

})();