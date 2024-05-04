"use strict";
// BUTTON RULES

const ruleBtn = document.querySelector(".rules-styles");
const btnRulesAc = document.getElementById("rules");
const newGameBtn1 = document.getElementById("new-game-id1");
const newGameBtn2 = document.getElementById("new-game-id2");
const playerNameInput = document.getElementById("player-name-input");

const PLAYERS = ["Howard", "Leonard", "Raj"];
const WEAPONS = ["rock", "paper", "scissors", "lizard", "spock",]

const playerContainer = document.querySelector(".logo-bazinga-games-player");
const gameContainer = document.querySelector(".gameboard-play");
const playerSelectOpt = document.querySelectorAll(".player-select");
const imagePlace = document.querySelector(".player-or-machine");
const playerName = document.querySelector(".player-name");
const weaponDivs = document.querySelectorAll('.weapon-to-choose');
const weaponPlayer = document.querySelector('.weapon-player img');
const weaponSheldon = document.querySelector('.weapon-sheldon img');
const textTitleResult = document.querySelector('.text-title-result');
const textParaResult = document.querySelector('.text-para-result');
const scoreText = document.querySelector(".score-text");
const resultBoardFinal = document.querySelector(".result-board-final");
const titleFinalResult = document.querySelector('.text-title-result-final');
const scoreFinalResult = document.querySelector('.score-text-final');
const sendButton = document.querySelector(".form-collect-name .new-game-button");
const errorMessage = document.querySelector(".error-message");
const playerToSelect = document.querySelector(".player-to-select");
const playerAfterName = document.querySelector(".form-collect-name");





let playerSelected = null;
let weaponSelected = null;
let sheldonSelectedWeapon = null;
let result = null;
let playerPoints = 0;
let sheldonPoints = 0;

const openRuleBtn = function () {
  ruleBtn.classList.toggle("hidden");
};

const clickNewGameBtn = function () {
  location.reload();
};

sendButton.addEventListener("click", function () {

  const playerName = playerNameInput.value;
  scoreText.textContent = `Player's Points: ${playerPoints} | Sheldon's Points: ${sheldonPoints} `;
  scoreFinalResult.textContent = `Final Score: ${playerName} : ${playerPoints} | Sheldon : ${sheldonPoints}`;
  sendButton.style.display = 'none';
  playerToSelect.classList.toggle("hidden")
  playerAfterName.classList.toggle("hidden")
});

btnRulesAc.addEventListener("click", openRuleBtn);
newGameBtn1.addEventListener("click", clickNewGameBtn);
newGameBtn2.addEventListener("click", clickNewGameBtn);



// Verify if there is a name and a player.

// sendButton.addEventListener("click", function () {
//   const playerName = playerNameInput.value;
//   const selectedPlayer = document.querySelector('.player-name').textContent;

//   if (!playerName) {
//     errorMessage.textContent = "Coloque seu nome aqui";
//     return;
//   }

//   if (!selectedPlayer) {
//     errorMessage.textContent = "Selecione um jogador";
//     return;
//   }

//   startGame(playerName);
// });


const selectPlayer = function (playerId) {
  playerSelected = PLAYERS[playerId];

  playerContainer.classList.toggle("hidden");

  gameContainer.classList.toggle("hidden");

  // Place the select Player
  playerSelectedDisplay();
  // place the player image
  placePlayerImage();


};

playerSelectOpt.forEach(function (button) {
  button.addEventListener("click", function () {
    const playerId = this.id;
    selectPlayer(playerId);
  });
});

const removeOppacity = function () {
  textTitleResult.classList.remove("oppacity");
  textParaResult.classList.remove("oppacity");
}

// function for select the weapon of the player and play the game
function handleClick(event) {
  weaponSelected = event.currentTarget.querySelector('img').alt;
  placePlayerWeapon();
  sheldonSelectedWeapon = randomWeapon();
  placeSheldonWeapon();
  const result = compareWeapons(weaponSelected, sheldonSelectedWeapon);
  removeOppacity();
  updateScore(result)

  // console.log(weaponSelected, sheldonSelectedWeapon)

}

weaponDivs.forEach(div => {
  div.addEventListener('click', handleClick);
});

// function for place the name of the player
const playerSelectedDisplay = function () {
  playerName.textContent = playerSelected;
};

// function for place the image of the player
const placePlayerImage = function () {
  imagePlace.src = `./images/${playerSelected}.png`;
};


// function for place the image of the weapon's player
const placePlayerWeapon = function () {
  weaponPlayer.src = `./images/${weaponSelected}.png`;

};

// function for place the image of the Sheldon's weapon
const placeSheldonWeapon = function () {
  weaponSheldon.src = `./images/${sheldonSelectedWeapon}.png`;

};

// function for random number
const randomNumber = function () {
  return Math.floor(Math.random() * WEAPONS.length);
}

// function for associate the random number to the array weapons
function randomWeapon() {
  const randomIndex = randomNumber();
  return WEAPONS[randomIndex];
}


// Function to show the rules based on the weapons selected
function displayRules(playerWeapon, sheldonWeapon, result) {
  const rules = {
    rock: {
      scissors: "Rock crushes Scissors",
      lizard: "Rock crushes Lizard",
    },
    paper: {
      rock: "Paper covers Rock",
      spock: "Paper disproves Spock"
    },
    scissors: {
      paper: "Scissors cuts Paper",
      lizard: "Scissors decapitates Lizard"
    },
    lizard: {
      spock: "Lizard poisons Spock",
      paper: "Lizard eats Paper"
    },
    spock: {
      scissors: "Spock smashes Scissors",
      rock: "Spock vaporizes Rock"
    }
  };

  let ruleMessage = "";

  if (result === "Player wins") {
    ruleMessage = rules[playerWeapon][sheldonWeapon];
  } else if (result === "Sheldon wins") {
    ruleMessage = rules[sheldonWeapon][playerWeapon];
  }

  textParaResult.textContent = ruleMessage;
}


// Function to know the rules of the game and to verify the winner
function compareWeapons(playerWeapon, sheldonWeapon) {
  const rules = {
    rock: { beats: ["scissors", "lizard"] },
    paper: { beats: ["rock", "spock"] },
    scissors: { beats: ["paper", "lizard"] },
    lizard: { beats: ["spock", "paper"] },
    spock: { beats: ["scissors", "rock"] }
  };

  // Verify if is a DRAW
  if (playerWeapon === sheldonWeapon) {
    textTitleResult.textContent = `It's a Draw`;
    textParaResult.textContent = `Good Luck on next`;
    return "Draw";
  }

  // Verify if is player wins
  if (rules[playerWeapon].beats.includes(sheldonWeapon)) {
    textTitleResult.textContent = `You win`;
    displayRules(playerWeapon, sheldonWeapon, "Player wins");
    return "Player wins";
  }

  // Sheldon Wins
  textTitleResult.textContent = `Sheldon wins`;
  displayRules(playerWeapon, sheldonWeapon, "Sheldon wins");
  return "Sheldon wins";
}

// Function to update the scoreboard in the screen
function updateScoreboard() {
  scoreText.textContent = `${playerNameInput.value} Points: ${playerPoints} | Sheldon's Points: ${sheldonPoints} `;
}

// Function to update points and scoreboard after each round
function updateScore(result) {
  if (result === "Player wins") {
    playerPoints++;
  } else if (result === "Sheldon wins") {
    sheldonPoints++;
  }

  if (playerPoints === 10 || sheldonPoints === 10) {
    console.log(' Player venceu');
    resultBoardFinal.classList.toggle("hidden");
    gameContainer.classList.toggle("hidden");
    setFinalResult()
  }

  updateScoreboard();
}

function setFinalResult() {

  if (playerPoints === 10) {
    titleFinalResult.textContent = 'You Win!';
  } else if (sheldonPoints === 10) {
    titleFinalResult.textContent = 'Sheldon Wins!';
  }
  scoreFinalResult.textContent = `Final Score: ${playerNameInput.value} : ${playerPoints} | Sheldon : ${sheldonPoints}`;
}



// Function to reset the scoreboard
function resetScoreboard() {
  playerPoints = 0;
  sheldonPoints = 0;
  updateScoreboard();
}


