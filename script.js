let expression = '';

function appendInput(value) {
  expression += value;
  updateDisplay();
}

function clearDisplay() {
  expression = '';
  updateDisplay();
}

function evaluate() {
  try {
    const result = eval(expression);
    expression = result.toString();
  } catch (error) {
    expression = 'Error';
  }
  updateDisplay();
}

function updateDisplay() {
  const display = document.getElementById('display');
  display.value = expression;
}
