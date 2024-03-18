'use strict';

/**
 * 1. genertate random number between 1 and 20
 * 2. generated number should be inside the div of classname number
 * 3. value of the input of classname guess should be checked
 * 4. if correct display winner in the message and score should be displayed in highscore
 * 5. else continue guessing
 * 6. again btn will reset the number, but highscore is not changed until another highscore
 */

// Architecture Requirements
const secretNumber = document.querySelector('.number');
const againBtn = document.querySelector('.again');
const guessInput = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');
const scoreContent = document.querySelector('.score');
const displayMessage = document.querySelector('.message');
const highscoreContent = document.querySelector('.highscore');

const leftSection = document.querySelector('section.left');
const warning = document.createElement('span');
warning.classList.add('warning');
leftSection.insertBefore(warning, leftSection.childNodes[2]);
console.log(leftSection.innerHTML);

class App {
  // Private fields
  #randomNumber = Math.trunc(Math.random() * 20) + 1; // generating random no between 1 to 20
  #isListenerActive = true;
  #keyPressed = false;
  // Public Fields
  score = 20;
  highscore = 0;
  tries = 0;

  constructor() {
    console.log(this.#randomNumber);
    // Event Listeners
    guessInput.addEventListener('input', this.displayWarning.bind(this));
    checkBtn.addEventListener('click', this.checkNumber.bind(this));
    againBtn.addEventListener('click', this.reset.bind(this));
    // window.addEventListener('keydown', this.checkNumber.bind(this));
  }
  // assigning randomNumber as value of secretNumber

  checkNumber() {
    if (!this.#isListenerActive) return;
    const guess = +guessInput.value;
    if (!guess) {
      if (typeof guessInput.value !== 'number') {
        warning.textContent = `Only numbers between 1 and 20!`;
        warning.style.marginBottom = '1.5rem';
        warning.style.color = 'red';
      } else {
        displayMessage.textContent = 'Empty input field!';
      }
    }
    // winner
    if (guess === this.#randomNumber) {
      document.querySelector('body').style.backgroundColor = '#60b347';
      displayMessage.textContent = `Horray🎉! You have guessed the right number in  ${(this.tries =
        1 ? 'first try' : `${++this.tries}tries`)}!`;
      secretNumber.textContent = this.#randomNumber;
      secretNumber.style.width = '18rem';
      if (scoreContent.textContent > highscoreContent.textContent) {
        highscoreContent.textContent = scoreContent.textContent;
        //persist the highscore
        this.highscore = highscoreContent.textContent;
      }
      // disabling event listener
      this.isListenerActive = false;
    } else if (guess !== this.#randomNumber) {
      if (!guess) return;
      if (this.score > 1) {
        //clear input field
        guessInput.value = '';
        this.score--;
        scoreContent.textContent = this.score;
        displayMessage.textContent =
          guess > this.#randomNumber ? `Too High!` : `Too Low!`;
      } else {
        displayMessage.textContent = 'You lost the Game!';
        scoreContent.textContent = 0;
      }
    }
  }

  reset() {
    this.score = 20;
    this.#randomNumber = Math.trunc(Math.random() * 20) + 1;
    secretNumber.textContent = '?';
    displayMessage.textContent = 'Start guessing...';
    scoreContent.textContent = this.score;
    guessInput.value = '';
    warning.textContent= ''
    // guessInput.focus();
    document.querySelector('body').style.backgroundColor = '#222';
    this.isListenerActive = true;
  }

  displayWarning() {
    const guess = +guessInput.value;
    if (guess < 1 || guess >= 20 || typeof guess === typeof guessInput.value) {
      warning.textContent = `Only numbers between 1 and 20!`;
      warning.style.marginBottom = '1.5rem';
      warning.style.color = 'red';
    } else {
      warning.textContent = ``;
    }
    if (!guess) {
      warning.textContent = ``;
    }
  }
}

const app = new App();
