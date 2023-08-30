const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
//const numberOfGuessesMessage = document.getElementById('num-of-guesses');
function createParagraphAndSetClassNameToMessage() {
  const message = document.createElement('p');
  message.className = 'message';
  return message;
}
/*
const numberOfGuessesMessage = document.createElement('p');
numberOfGuessesMessage.className = 'message';
const outOfRangeLowMessage = document.createElement('p');
outOfRangeLowMessage.className = 'message';
*/
const numberOfGuessesMessage = createParagraphAndSetClassNameToMessage();
const outOfRangeLowMessage = createParagraphAndSetClassNameToMessage();

/* Pass a string that either says 'below 1' or 'above 99' as an argument to this function. */
function createOutOfRangeHighOrLowMessage(stringAboutHowNumIsOutOfRange) {
  return `You guessed a number ${stringAboutHowNumIsOutOfRange}. <br>This did not count as a turn. Please try again. <br>Only numbers between 1 and 99 are allowed guesses.`;
}
outOfRangeLowMessage.innerHTML = createOutOfRangeHighOrLowMessage('below 1');
/*
outOfRangeLowMessage.innerHTML = 'You guessed a number below 1. <br>This did not count as a turn. Please try again. <br>Only numbers between 1 and 99 are allowed guesses.';
*/
outOfRangeLowMessage.style.textAlign = 'center';
outOfRangeLowMessage.style.color = 'red';
const outOfRangeHighMessage = document.createElement('p');
outOfRangeHighMessage.className = 'message';
outOfRangeHighMessage.innerHTML = 'You guessed above 99. <br>This did not count as a turn. Please try again. <br>Only numbers between 1 and 99 are allowed guesses.';
outOfRangeHighMessage.style.textAlign = 'center';
outOfRangeHighMessage.style.color = 'red';
const notANumberMessage = document.createElement('p');
notANumberMessage.className = 'message';
notANumberMessage.innerHTML = 'You tried submitting a guess that is not a number by <br>pressing the submit button without any value in the input field. <br>This is not a valid input. Please submit a number. <br>Only numbers between 1 and 99 are allowed guesses.';
notANumberMessage.style.textAlign = 'center';
notANumberMessage.style.color = 'red';
const messages = document.getElementsByClassName('message');
//console.log(`${messages[4]}`);

/* The code below find the div that stores the paragraphs with the class of message, and appends the new paragraph, which is stored in the variable numberOfGuessesMessage, to it. */
const divWithParagraphs = tooHighMessage.parentNode;
divWithParagraphs.appendChild(numberOfGuessesMessage);
divWithParagraphs.appendChild(outOfRangeLowMessage);
divWithParagraphs.appendChild(outOfRangeHighMessage);
divWithParagraphs.appendChild(notANumberMessage);
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  hideAllMessages();
  const guess = parseInt(guessInput.value, 10);
  if ((guess >= 1) && (guess <= 99) && (guess !== 'NaN')) {
    attempts = attempts + 1;

    if (guess === targetNumber) {
      numberOfGuessesMessage.style.display = '';
      numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
  
      correctMessage.style.display = '';
  
      submitButton.disabled = true;
      guessInput.disabled = true;
    }

    if (guess !== targetNumber) {
      if (guess < targetNumber) {
        tooLowMessage.style.display = '';
      } else {
        tooHighMessage.style.display = '';
      }
  
      let remainingAttempts = maxNumberOfAttempts - attempts;
  
      numberOfGuessesMessage.style.display = '';
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
    }

    if (attempts === maxNumberOfAttempts) {
      submitButton.disabled = true;
      guessInput.disabled = true;
    }
  
    guessInput.value = '';
  
    resetButton.style.display = '';
  } else if (guess < 1) {
    outOfRangeLowMessage.style.display = '';
  } else if (guess > 99) {
    outOfRangeHighMessage.style.display = '';
  } else { 
    /* This condition will run if guess === 'NaN', such as if the user presses the submit button without first either typing in or selecting a number. */
    notANumberMessage.style.display = '';
  }
  
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0; /* It is possible that this remaining attempts should be reset to 5, and not to 0. remainingAttempts = 5*/

  // Enable the input and submit button 
  submitButton.disabled = false; //fixed the spelling of disabled
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', function () {
  setup();
  hideAllMessages();
});

setup();
