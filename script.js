const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal() {
  if (!calculator.displayValue.includes('.')) {
    calculator.displayValue += '.';
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = performCalculation[operator](firstOperand, inputValue);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

const performCalculation = {
  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

  '=': (firstOperand, secondOperand) => secondOperand,
};

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function updateDisplay() {
  const display = document.querySelector('.input');
  display.textContent = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.buttons');
keys.addEventListener('click', (event) => {
  const { target } = event;

  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    handleOperator(target.textContent);
    updateDisplay();
    return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal();
    updateDisplay();
    return;
  }

  if (target.classList.contains('clear')) {
    resetCalculator();
    updateDisplay();
    return;
  }

  inputDigit(target.textContent);
  updateDisplay();
});
