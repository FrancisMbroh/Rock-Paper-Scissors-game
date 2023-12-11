// Define html elements

const startGameContainer = document.querySelector('.start-game')
const gameContainer = document.querySelector('.container')
const rock = document.querySelector('.rock')
const paper = document.querySelector('.paper')
const scissors = document.querySelector('.scissors');
const startButton = document.querySelector('.start');
const autoPlayButton = document.querySelector('.autoplay');
const resetScoreButton = document.querySelector('.reset-score');
const movesText = document.querySelector('.moves');
const resultText = document.querySelector('.result');
const scoreText = document.querySelector('.score');

// Define scores

const score = {
  wins: 0,
  losses: 0,
  ties: 0
}


// Generate computer move

let computerMove = '';

function generateComputerMove() {
  const randomNumber = Math.random();
  if(randomNumber >=0 && randomNumber < 1/3){
    computerMove = 'rock';
  }
  else if(randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'paper';
  }
  else if(randomNumber >= 2/3 && randomNumber <= 1){
    computerMove = 'scissors';
  }
}

// Compare moves function

let result = '';

function compareMoves(playerMove){
  if(playerMove === 'rock'){
    if(computerMove === 'rock'){
      result = 'Tie';
    }else if(computerMove === 'paper'){
      result = 'You lose!';
    }else if(computerMove === 'scissors'){
      result = 'You win!';
    }
  }

  else if(playerMove === 'paper'){
    if(computerMove === 'rock'){
      result = 'You win!';
    }else if(computerMove === 'paper'){
      result = 'Tie';
    }else if(computerMove === 'scissors'){
      result = 'You lose!';
    }
  }

  else if(playerMove === 'scissors'){
    if(computerMove === 'rock'){
      result = 'You lose!';
    }else if(computerMove === 'paper'){
      result = 'You win!';
    }else if(computerMove === 'scissors'){
      result = 'Tie';
    }
  }

  // Update scores

  if(result === 'You win!'){
      score.wins++
    }else if(result === 'You lose!'){
      score.losses++
    }else if(result === 'Tie'){
      score.ties++
    }

    //Display comments

  movesText.textContent = `You picked ${playerMove}, computer picked ${computerMove}`

 resultText.textContent = result;

  scoreText.textContent = `Wins: ${score.wins.toString().padStart(3, '0')}, Losses: ${score.losses.toString().padStart(3, '0')}, Ties: ${score.ties.toString().padStart(3, '0')}`;

  saveScore();
}

//Define auto play moves 

let autoMove = '';

function autoMoves() {
  const randomNumber = Math.random();
  if(randomNumber >=0 && randomNumber < 1/3){
    autoMove = 'rock';
  }
  else if(randomNumber >= 1/3 && randomNumber < 2/3){
    autoMove = 'paper';
  }
  else if(randomNumber >= 2/3 && randomNumber <= 1){
    autoMove = 'scissors';
  }

  saveScore();
  return autoMove;
}

//Make moves interactive

rock.addEventListener('click', ()=>{
  generateComputerMove()
  compareMoves('rock');
})

paper.addEventListener('click', ()=>{
  generateComputerMove()
  compareMoves('paper');
})

scissors.addEventListener('click', ()=>{
  generateComputerMove()
  compareMoves('scissors');
})

//Make buttons interactive

let intervalId;

startButton.addEventListener('click', () => {
  gameContainer.style.display = 'block';
  startGameContainer.style.display = 'none'
})

autoPlayButton.addEventListener('click', () => {
  if(autoPlayButton.textContent === 'Auto Play'){
     intervalId = setInterval(() => {
        generateComputerMove()
      playerMove = autoMoves();
      compareMoves(playerMove);
      autoPlayButton.textContent = 'Stop Play'
      }, 1500);
  }else {
    clearInterval(intervalId);
    autoPlayButton.textContent = 'Auto Play'
  }

})

resetScoreButton.addEventListener('click', () => {

  clearInterval(intervalId);
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  //To enable auto play
  autoPlayButton.textContent = 'Auto Play';

  //Display comments
  movesText.textContent = 'Score was reset';

  resultText.textContent = 'Pick a move';
  
  scoreText.textContent = `Wins: ${score.wins.toString().padStart(3, '0')}, Losses: ${score.losses.toString().padStart(3, '0')}, Ties: ${score.ties.toString().padStart(3, '0')}`
})

// Save score to localStorage

function saveScore() {
  localStorage.setItem('score', JSON.stringify(score));
}

function retrieveScore() {
  JSON.parse(localStorage.getItem('score'))
}
retrieveScore()