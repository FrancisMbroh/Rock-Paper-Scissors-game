// pick daddys move
let daddysMove = '';
function pickDaddysMove() {
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    daddysMove = 'rock';
  }
  else if (randomNumber >= 1 /3 && randomNumber < 2 /3) {
    daddysMove = 'paper';
  }
  else if (randomNumber >= 2 /3 && randomNumber < 1) {
    daddysMove = 'scissors';
  }
  return daddysMove
}

// compare results
let result = ''
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
}

function playGame(nanasMove) {
  if (nanasMove === 'rock') {
    if (daddysMove === 'rock') {
      result = 'Tie';
    }
    else if (daddysMove === 'paper') {
      result = 'You Lose!';
    }
    else if (daddysMove === 'scissors') {
      result = 'You Win!';
    }
  }

  else if (nanasMove === 'paper') {
    if (daddysMove === 'rock') {
      result = 'You Win!';
    }
    else if (daddysMove === 'paper') {
      result = 'Tie';
    }
    else if (daddysMove === 'scissors') {
      result = 'You Lose!' ;   }
  }

  else if (nanasMove === 'scissors') {
    if (daddysMove === 'rock') {
      result = 'You Lose!';
    }
    else if (daddysMove === 'paper') {
      result = 'You Win!';
    }
    else if (daddysMove === 'scissors') {
      result = 'Tie';    }
  }
  

  if (result === 'You Win!') {
    score.wins += 1;
  }
  else if (result === 'You Lose!') {
    score.losses +=1;
  }
  else if (result === 'Tie') {
    score.ties += 1;
  }

   localStorage.setItem('score', JSON.stringify(score));

   document.querySelector('.js-comment').innerHTML = `Nana picked ${nanasMove}. Daddy picked ${daddysMove}`;

  document.querySelector('.js-result').innerHTML = `${result}`;

  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
  

}

// to remove score immediately from screen

function removeScore() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`; 
}