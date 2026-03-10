(function () {
  'use strict';

  const volumeSlider = document.querySelector('#volume');
  let masterVolume = 0.7;

  if (volumeSlider) {
    volumeSlider.addEventListener('input', function () {
      masterVolume = volumeSlider.value / 100;
    });
  }

  //reduce the html to 1. Make a section for each page. so when start is pressed, the homepage becomes none. Try to keep the volume mixer floated or outside the page, so it doesnt get effected by script.

  //The pop-up screen can be inside the section(game screen) for none again. Or put it as another section and work on that.

  //probability -> javascript. HTML is content, so having 9 dice span is not correct.


  const startBtn = document.querySelector('#start');

  if (startBtn) {
    startBtn.addEventListener('click', function () {
      window.location.href = 'index.html';
    });
  }

  const die1El = document.querySelector('#die1');
  const die2El = document.querySelector('#die2');

  const game = document.querySelector('#game');
  const scoreBox = document.querySelector('#score');
  const status = document.querySelector('#status');
  const rollBtn = document.querySelector('#roll');
  const passBtn = document.querySelector('#pass');

  if (game && scoreBox && status && rollBtn && passBtn && die1El && die2El) {

    const gameData = {
      players: ['player 1', 'player 2'],
      score: [0, 0],
      roll1: 0,
      roll2: 0,
      rollSum: 0,
      index: Math.round(Math.random()),
      gameEnd: 30
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
      }
    });

    function throwDice() {
      // set random iteration number
     
      let iteration = Math.floor(Math.random() * 6) + 1; //keep it at *6 and +1 for a random number from 1 to 6. But it should be random, is it ok to have a fixed range the same as dice?
      // need counter start at 0
      let counter = 0;
      let die1;
      let die2;
      // setInterval to run until counter > iteration at maybe 250ms
      let diceInterval = setInterval(function () {
      // if counter <= iteration {
      if (counter <= iteration) {
         // show random die number (code below)
          die1 = Math.floor(Math.random() * 6) + 1;
          die2 = Math.floor(Math.random() * 6) + 1;

          // wrong code noted out because actionArea is not defined and gameData.dice does not exist
          // actionArea.innerHTML = `<img src="images/${gameData.dice[die1 - 1]}" alt="die ${die1}">  
          //                         <img src="images/${gameData.dice[die2 - 1]}" alt="die ${die2}">`;

          die1El.setAttribute('data-face', die1);
          die2El.setAttribute('data-face', die2);
                                 
         // increment counter
         counter++; //++ because my dice count is going up not down
         // else {
         } else {
         // clearInterval when counter > iteration
         clearInterval(diceInterval);

         gameData.roll1 = die1;
         gameData.roll2 = die2;
         gameData.rollSum = gameData.roll1 + gameData.roll2;

         if (gameData.rollSum === 2) {
           status.textContent = 'Snake Eye! Score reset to 0.';
           gameData.score[gameData.index] = 0;
           showCurrentScore();
           switchPlayer();
           return;
         }
         
         else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
           status.textContent = 'Rolled a 1. Turn ends.';
           switchPlayer();
           return;
         }
         
         else {
           gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
           showCurrentScore();
           status.textContent = `${gameData.players[gameData.index]} rolled ${gameData.rollSum}. Roll or Pass.`;
         }

         if (gameData.score[gameData.index] > gameData.gameEnd) {
           status.textContent = `${gameData.players[gameData.index]} wins! Click Reset to play again.`;
           gameOver = true;
         }
       
         }
        }, 250); //250ms, this input changes the rolls done for dice animation


      
     // gameData.roll1 = Math.floor(Math.random() * 6) + 1;
      //gameData.roll2 = Math.floor(Math.random() * 6) + 1;
     // gameData.rollSum = gameData.roll1 + gameData.roll2;

      //die1El.setAttribute('data-face', gameData.roll1);
      //die2El.setAttribute('data-face', gameData.roll2);

      


      // change it to if else if for code below
      /*if (gameData.rollSum === 2) {
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
      status.textContent = `${gameData.players[gameData.index]} rolled ${gameData.rollSum}. Roll or Pass.`; */

       //checkRolledDice(die1, die2); this code should be placed here before the result is given. Figure out where it should be placed by testing. 

     /* if (gameData.score[gameData.index] > gameData.gameEnd) {
        status.textContent = `${gameData.players[gameData.index]} wins! Click Reset to play again.`;
        gameOver = true;
      }
    } */

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