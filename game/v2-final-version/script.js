(function () {
  'use strict';

  // volume control
  const volumeSlider = document.querySelector('#volume');
  let masterVolume = 0.7;

  if (volumeSlider) {
    const savedVolume = localStorage.getItem('pigVolume');

    if (savedVolume !== null) {
      volumeSlider.value = savedVolume;
      masterVolume = savedVolume / 100;
    }

    volumeSlider.addEventListener('input', function () {
      masterVolume = volumeSlider.value / 100;
      localStorage.setItem('pigVolume', volumeSlider.value);
    });
  }

  // page sections
  const stage = document.querySelector('.stage');
  const home = document.querySelector('#home');
  const game = document.querySelector('#game');
  const popup = document.querySelector('#popup');

  // buttons
  const startBtn = document.querySelector('#start');
  const goHomeBtn = document.querySelector('#goHome');
  const resetBtn = document.querySelector('#reset');
  const yesResetBtn = document.querySelector('#yesReset');
  const noResetBtn = document.querySelector('#noReset');

  // dice
  const die1El = document.querySelector('#die1');
  const die2El = document.querySelector('#die2');

  // game display
  const scoreBox = document.querySelector('#score');
  const status = document.querySelector('#status');
  const rollBtn = document.querySelector('#roll');
  const passBtn = document.querySelector('#pass');

  // game data
  const gameData = {
    players: ['player 1', 'player 2'],
    score: [0, 0],
    roll1: 0,
    roll2: 0,
    rollSum: 0,
    index: Math.round(Math.random()),
    gameEnd: 30
  };

  // game state
  let gameOver = false;

  // score display
  function showCurrentScore() {
    scoreBox.innerHTML = `<h2>Score</h2>
                          <p><span class="p1-label">P1:</span> <span class="score-num">${gameData.score[0]}</span></p>
                          <p><span class="p2-label">P2:</span> <span class="score-num">${gameData.score[1]}</span></p>`;
  }

  // reset game
  function resetRound() {
    gameData.score = [0, 0];
    gameData.roll1 = 0;
    gameData.roll2 = 0;
    gameData.rollSum = 0;
    gameData.index = Math.round(Math.random());
    gameOver = false;

    die1El.setAttribute('data-face', 1);
    die2El.setAttribute('data-face', 1);
    die1El.classList.add('hidden');
    die2El.classList.add('hidden');

    showCurrentScore();
    status.textContent = `It is ${gameData.players[gameData.index]}'s turn.`;
  }

  // switch player
  function switchPlayer(message) {
    if (gameData.index === 0) {
      gameData.index = 1;
    } else {
      gameData.index = 0;
    }

    if (message) {
      status.textContent = message;
    } else {
      status.textContent = `It is ${gameData.players[gameData.index]}'s turn.`;
    }
  }

  // roll dice
  function throwDice() {
    let iteration = Math.floor(Math.random() * 6) + 1;
    let counter = 0;
    let die1;
    let die2;

    die1El.classList.remove('hidden');
    die2El.classList.remove('hidden');

    let diceInterval = setInterval(function () {
      if (counter <= iteration) {
        die1 = Math.floor(Math.random() * 6) + 1;
        die2 = Math.floor(Math.random() * 6) + 1;

        die1El.setAttribute('data-face', die1);
        die2El.setAttribute('data-face', die2);
        counter++;
      } else {
        clearInterval(diceInterval);

        gameData.roll1 = die1;
        gameData.roll2 = die2;
        gameData.rollSum = die1 + die2;

        if (die1 === 1 && die2 === 1) {
          gameData.score[gameData.index] = 0;
          showCurrentScore();
          switchPlayer('Snake Eye! Score reset to 0.');
          return;
        }

        if (die1 === 1 || die2 === 1) {
          switchPlayer('Rolled a 1. Turn ends.');
          return;
        }

        gameData.score[gameData.index] += gameData.rollSum;
        showCurrentScore();

        if (gameData.score[gameData.index] >= gameData.gameEnd) {
          status.textContent = `${gameData.players[gameData.index]} wins! Click Reset to play again.`;
          gameOver = true;
        } else {
          status.textContent = `${gameData.players[gameData.index]} rolled ${gameData.rollSum}. Roll or Pass.`;
        }
      }
    }, 250);
  }

  // starting screen setup
  die1El.classList.add('hidden');
  die2El.classList.add('hidden');
  stage.classList.add('home-screen');
  showCurrentScore();

  // start button
  if (startBtn) {
    startBtn.addEventListener('click', function () {
      home.classList.add('hidden');
      game.classList.remove('hidden');
      goHomeBtn.classList.remove('hidden');
      resetBtn.classList.remove('hidden');
      popup.classList.add('hidden');
      stage.classList.remove('home-screen');
      stage.classList.add('game-screen');
      resetRound();
    });
  }

  // home button
  if (goHomeBtn) {
    goHomeBtn.addEventListener('click', function () {
      home.classList.remove('hidden');
      game.classList.add('hidden');
      goHomeBtn.classList.add('hidden');
      resetBtn.classList.add('hidden');
      popup.classList.add('hidden');
      stage.classList.remove('game-screen');
      stage.classList.add('home-screen');
      die1El.classList.add('hidden');
      die2El.classList.add('hidden');
    });
  }

  // reset popup open
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      popup.classList.remove('hidden');
    });
  }

  // reset yes button
  if (yesResetBtn) {
    yesResetBtn.addEventListener('click', function () {
      popup.classList.add('hidden');
      stage.classList.remove('home-screen');
      stage.classList.add('game-screen');
      resetRound();
    });
  }

  // reset no button
  if (noResetBtn) {
    noResetBtn.addEventListener('click', function () {
      popup.classList.add('hidden');
    });
  }

  // roll button
  if (rollBtn) {
    rollBtn.addEventListener('click', function () {
      if (!gameOver) {
        throwDice();
      }
    });
  }

  // pass button
  if (passBtn) {
    passBtn.addEventListener('click', function () {
      if (!gameOver) {
        switchPlayer();
      }
    });
  }
})();