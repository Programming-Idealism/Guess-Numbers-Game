'use strict';

// Create a guess the number game in order to reinforce logical and problem solving skills focusing on the DOM, Conditionals, random numbers et cetera while relying on the GPT professor as less as possible to reinfoce and amplify such skills!

// Psuedo Code:

// 1. Connect the HTML elements with the Javascript specifically the result id to display the generated number and also the buttons themselves.
// 2. Append functionality to the button so it'll react for clicks and respond based upon user input.
// 3. Create a function that generates a random number from 1 to 10. This function should be invoked once after the user has clicked the button.
// 4. Implement a function that determines correctly whether the player has won the game or lost by comparing his choice with the random choice made by the computer.
// 5. Display a message indicating whether the player was correct in his guess.
// 6. Possibly enrich this application by adding several features perhaps having a retry counter and once the count has maxed display a message telling the user he lost.


const resultDisplay = document.getElementById('result');
const startGameButton = document.querySelector('.prompt-btn');
const counterDisplay = document.getElementById('counter');
const resetGamebutton = document.querySelector('.reset-game');
const victoryMessage = document.querySelector('.victory-message');
const closeModalButton = document.querySelector('.close-modal');

let userInput;
let computerGeneratedNumber;
let counter = 0;
let timeOut;

startGameButton.addEventListener('click', () => {
    resetGamebutton.style.display = 'none';
    clearTimeout(timeOut);
    resultDisplay.textContent = '';
    console.log(userInput);
    let rawUserInput = prompt('Guess a number from 1 to 10!');
    if (rawUserInput === null || rawUserInput.trim() === '' || isNaN(rawUserInput) || rawUserInput > 10 || rawUserInput < 1) {
        resultDisplay.textContent = `Invalid input! Please insert a number from 1 to 10!`;
        return;
    }
    userInput = +rawUserInput;
    computerGeneratedNumber = randomNumberGenerator(computerGeneratedNumber);
    console.log(computerGeneratedNumber);
    const determineGame = determineRightGuess(computerGeneratedNumber);
});

resetGamebutton.addEventListener('click', resetGame);
resetGamebutton.style.display = 'none';


const randomNumberGenerator = () => {
    return Math.floor(Math.random() * 2) + 1;
};

const determineRightGuess = function (computerGeneratedNumber) {
    if (counter === 10) {
        counterDisplay.textContent = `You've ran out of tries. You're done for!`;
        startGameButton.disabled = true;
        resetGamebutton.style.display = 'block';
        return;
    }
    if (userInput === computerGeneratedNumber) {
        counterDisplay.textContent = '';
        outputMessageToWinner();
        setTimeout(() => {
            let restartGame = confirm('Would you like to restart the game?');
            if (restartGame) {
                resetGame();
            }
        }, 1500);
    } else {
        resultDisplay.innerHTML = `You've lost! You suck!`;
        raiseCounter();
        console.log(`Current try is: ${counter}`);
        counterDisplay.textContent = `Current attempt: ` + counter;
    }
};

closeModalButton.addEventListener('click', () => victoryMessage.close());

function outputMessageToWinner() {
    document.getElementById('victory-text').textContent =
        `You've guessed correctly despite facing overwhelming odds! It seems you have the luck of the devil himself!`;
    victoryMessage.showModal();
}

function raiseCounter() {
    return counter++;
}

function resetGame() {
    victoryMessage.close();
    counter = 0;
    startGameButton.disabled = false;
    counterDisplay.textContent = '';
    resultDisplay.textContent = 'The game has been restarted!';

    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
        resultDisplay.textContent = '';
    }, 3000);
}