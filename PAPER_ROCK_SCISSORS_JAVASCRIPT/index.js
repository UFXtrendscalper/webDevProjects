
let reset = document.getElementById("reset");

reset.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = `Player: ${playerScore}`;
    computerScoreDisplay.textContent = `Computer: ${computerScore}`;
    player.textContent = "Player";
    computer.textContent = "Computer";
    result.textContent = "Result";
});


let buttons = document.querySelectorAll(".playerHand");

buttons.forEach((button) => { 
   
    button.addEventListener("click", startRound);
});

let player = document.getElementById("playerChoice");
let computer = document.getElementById("computerChoice");
let result = document.getElementById("result");
let playerScoreDisplay = document.getElementById("playerScore");
let computerScoreDisplay = document.getElementById("computerScore");

let playerScore = 0;
let computerScore = 0;

let hands = ["👊", "✋", "✌️"];

function startRound(e) {

    let computerChoice = Math.floor(Math.random() * 3);

    computer.textContent = `Computer ${hands[computerChoice]}`;
    player.textContent = `Player ${this.textContent}`;


    if (this.textContent === "👊") { 

        if (computerChoice === 0) { // computer chose rock
            result.textContent = "It's a tie!";
        } else if (computerChoice === 1) { // computer chose paper
            result.textContent = "Computer wins!";
            computerScore++;
        } else {
            result.textContent = "Player wins!";
            playerScore++;
        }

    } else if (this.textContent === "✋") { 

        if (computerChoice === 0) { // computer chose rock
            result.textContent = "Player wins!";
            playerScore++;
        } else if (computerChoice === 1) { // computer chose paper
            result.textContent = "It's a tie!";
        } else {
            result.textContent = "Computer wins!";
            computerScore++;
        }

    } else { 

        if (computerChoice === 0) { // computer chose rock
            result.textContent = "Computer wins!";
            computerScore++;
        } else if (computerChoice === 1) { // computer chose paper
            result.textContent = "Player wins!";
            playerScore++;
        } else {
            result.textContent = "It's a tie!";
        }

    }

    playerScoreDisplay.textContent = `Player: ${playerScore}`;
    computerScoreDisplay.textContent = `Computer: ${computerScore}`;

}