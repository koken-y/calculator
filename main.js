let currentValue = 0;
let arrayOfValues = [];
let arrayOfOperators = [];

const add = (firstNumber, secondNumber) => (
  parseInt(firstNumber, 10) + parseInt(secondNumber, 10)
);

const subtract = (firstNumber, secondNumber) => (
  parseInt(firstNumber, 10) - parseInt(secondNumber, 10)
);

const multiply = (firstNumber, secondNumber) => (
  parseInt(firstNumber, 10) * parseInt(secondNumber, 10)
);

const divide = (firstNumber, secondNumber) => (
  parseInt(firstNumber, 10) / parseInt(secondNumber, 10)
);

function checkOperator(char) {
  return (char === '+' || char === '-' || char === '*' || char === '/');
}

/* Helper function to return a button node */
function createButton(value, id) {
  const newButton = document.createElement('input');
  newButton.setAttribute('type', 'button');
  newButton.setAttribute('value', value);
  newButton.setAttribute('id', `button${id}`);
  return newButton;
}

/* Display Area */

/* Make display element which shows current value */
const display = document.querySelector('#display');
const result = document.createElement('h1');
result.textContent = currentValue;
display.appendChild(result);

function pushDisplay(number) {
  if (result.textContent.length < 40) {
    if (result.textContent === '0') {
      result.textContent = number;
    } else {
      result.textContent += `${number}`;
    }
  }
}

/* Button Area */

/* Create buttons 1-9 */
const buttonContainer = document.querySelector('.buttons');
for (let i = 2; i >= 0; i -= 1) {
  const row = document.createElement('div');
  row.classList.add('row');
  row.setAttribute('id', `row${i + 1}`);

  for (let j = 1; j <= 3; j += 1) {
    const button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', j + (i * 3));
    button.setAttribute('id', `button${j + (i * 3)}`);
    row.appendChild(button);
  }

  buttonContainer.appendChild(row);
}

/* Add event listeners to buttons 1-9 which pushes its value to the display */
for (let i = 1; i <= 9; i += 1) {
  const button = document.querySelector(`#button${i}`);
  button.addEventListener('click', () => {
    pushDisplay(i);
  });
}

/* Create row 0 buttons (0, CE, AC, =) */
const row0 = document.createElement('div');
row0.classList.add('row');
for (let i = 0; i < 4; i += 1) {
  const button = document.createElement('input');
  button.setAttribute('type', 'button');
  row0.appendChild(button);
}
buttonContainer.appendChild(row0);

/* Add values, id and event listeners to row 0 buttons */
const row0Array = Array.from(row0.childNodes);
row0Array[0].setAttribute('id', 'button0');
row0Array[0].setAttribute('value', '0');
row0Array[0].addEventListener('click', () => {
  pushDisplay(0);
});

row0Array[1].setAttribute('id', 'buttonAC');
row0Array[1].setAttribute('value', 'AC');
row0Array[1].classList.add('function');
row0Array[1].addEventListener('click', () => {
  result.textContent = 0;
});

row0Array[2].setAttribute('id', 'buttonDel');
row0Array[2].setAttribute('value', 'DEL');
row0Array[2].classList.add('function');
row0Array[2].addEventListener('click', () => {
  if (result.textContent.length === 1) {
    result.textContent = 0;
  } else if (result.textContent !== '0') {
    result.textContent = result.textContent.substring(0, result.textContent.length - 1);
  }
});

row0Array[3].setAttribute('id', 'buttonAdd');
row0Array[3].setAttribute('value', '+');
row0Array[3].classList.add('operator');
row0Array[3].addEventListener('click', () => {
  /* Can't input multiple operators in a row */
  if (!checkOperator(result.textContent[result.textContent.length - 1])) {
    pushDisplay('+');
  }
});

/* Create operator buttons (type, id, value) */
const buttonSubtract = document.createElement('input');
buttonSubtract.setAttribute('type', 'button');
buttonSubtract.setAttribute('id', 'buttonSubtract');
buttonSubtract.setAttribute('value', '-');
buttonSubtract.classList.add('operator');
buttonSubtract.addEventListener('click', () => {
  if (!checkOperator(result.textContent[result.textContent.length - 1])) {
    pushDisplay('-');
  }
});
document.getElementById('row1').appendChild(buttonSubtract);

const buttonMultiply = document.createElement('input');
buttonMultiply.setAttribute('type', 'button');
buttonMultiply.setAttribute('id', 'buttonMultiply');
buttonMultiply.setAttribute('value', '*');
buttonMultiply.classList.add('operator');
buttonMultiply.addEventListener('click', () => {
  if (!checkOperator(result.textContent[result.textContent.length - 1])) {
    pushDisplay('*');
  }
});
document.getElementById('row2').appendChild(buttonMultiply);

const buttonDivide = document.createElement('input');
buttonDivide.setAttribute('type', 'button');
buttonDivide.setAttribute('id', 'buttonDivide');
buttonDivide.setAttribute('value', '/');
buttonDivide.classList.add('operator');
buttonDivide.addEventListener('click', () => {
  if (!checkOperator(result.textContent[result.textContent.length - 1])) {
    pushDisplay('/');
  }
});
document.getElementById('row3').appendChild(buttonDivide);

const buttonEquals = document.getElementById('buttonEquals');
buttonEquals.classList.add('operator');
buttonEquals.addEventListener('click', () => {
  /* can't press equals if the last value is an operator */
  /* Can't press equals if there is a divide by 0 in the expression */
  if (!checkOperator(result.textContent[result.textContent.length - 1]) && !(result.textContent.includes('/0'))) {
    arrayOfValues = result.textContent.split(/[*+-/]/);

    /* Obtain an array of operators */
    arrayOfOperators = result.textContent.split('').filter((character) => (
      checkOperator(character)
    ));

    console.log(arrayOfOperators);

    for (let i = arrayOfOperators.length - 1, j = 0; i >= j; i -= 1) {
      if (arrayOfOperators[i] === '*') {
        arrayOfValues.splice(i, 2, multiply(arrayOfValues[i], arrayOfValues[i + 1]));
      } else if (arrayOfOperators[i] === '/') {
        arrayOfValues.splice(i, 2, divide(arrayOfValues[i], arrayOfValues[i + 1]));
      }
    }

    arrayOfOperators = arrayOfOperators.filter((character) => (
      !((character === '*' || character === '/'))
    ));

    console.log(arrayOfOperators);

    for (let i = arrayOfOperators.length - 1, j = 0; i >= j; i -= 1) {
      if (arrayOfOperators[i] === '+') {
        arrayOfValues.splice(i, 2, add(arrayOfValues[i], arrayOfValues[i + 1]));
      } else if (arrayOfOperators[i] === '-') {
        arrayOfValues.splice(i, 2, subtract(arrayOfValues[i], arrayOfValues[i + 1]));
      }
    }

    arrayOfValues[0] = arrayOfValues[0].toString();

    result.textContent = arrayOfValues[0];


    // console.log(arrayOfValues);
    // console.log(arrayOfOperators);
    console.log(arrayOfValues);
  }
});


// set maximum number of digits for display 40 digits
// Round decimal point answers to fit in display
// computer properly with decimal numbers


