(function () {
  'use strict';

  const startBtn = document.querySelector('#start');

  if (startBtn) {
    startBtn.addEventListener('click', function () {
      window.location.href = 'index.html';
    });
  }

  const game = document.querySelector('#game');
  const scoreBox = document.querySelector('#score');
  const status = document.querySelector('#status');
  const rollBtn = document.querySelector('#roll');
  const passBtn = document.querySelector('#pass');

  if (game && scoreBox && status && rollBtn && passBtn) {

    const gameData = {
      dice: ['1die.jpg', '2die.jpg', '3die.jpg', '4die.jpg', '5die.jpg', '6die.jpg'],
      players: ['player 1', 'player 2'],
      score: [0, 0],
      roll1: 0,
      roll2: 0,
      rollSum: 0,
      index: Math.round(Math.random()),
      gameEnd: 29
    };

    let gameOver = false;

    showCurrentScore();
    status.textContent = `It is ${gameData.players[gameData.index]}'s turn.`;

    rollBtn.addEventListener('click', function () {
      if (gameOver === false) {
        throwDice();
      }
    });

    passBtn.addEventListener('click', function () {
      if (gameOver === false) {
        switchPlayer();
        status.textContent = `It is ${gameData.players[gameData.index]}'s turn.`;
      }
    });

    function throwDice() {
      gameData.roll1 = Math.floor(Math.random() * 6) + 1;
      gameData.roll2 = Math.floor(Math.random() * 6) + 1;
      gameData.rollSum = gameData.roll1 + gameData.roll2;

      game.innerHTML = `<img src="images/${gameData.dice[gameData.roll1 - 1]}" alt="die one">
                        <img src="images/${gameData.dice[gameData.roll2 - 1]}" alt="die two">`;

      if (gameData.rollSum === 2) {
        status.textContent = 'Snake Eye! Score reset to 0.';
        gameData.score[gameData.index] = 0;
        showCurrentScore();
        switchPlayer();
        return;
      }

      if (gameData.roll1 === 1 || gameData.roll2 === 1) {
        status.textContent = 'Rolled a 1. Turn ends.';
        switchPlayer();
        return;
      }

      gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
      showCurrentScore();
      status.textContent = `${gameData.players[gameData.index]} rolled ${gameData.rollSum}. Roll or Pass.`;

      if (gameData.score[gameData.index] > gameData.gameEnd) {
        status.textContent = `${gameData.players[gameData.index]} wins! Click Reset to play again.`;
        gameOver = true;
      }
    }

    function switchPlayer() {
      if (gameData.index === 0) {
        gameData.index = 1;
      } else {
        gameData.index = 0;
      }
      status.textContent = `It is ${gameData.players[gameData.index]}'s turn.`;
    }

    function showCurrentScore() {
      scoreBox.innerHTML = `<h2>Score</h2>
                            <p>P1: ${gameData.score[0]}</p>
                            <p>P2: ${gameData.score[1]}</p>`;
    }
  }

})();