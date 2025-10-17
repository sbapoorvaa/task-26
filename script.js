const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const modeToggle = document.getElementById('mode-toggle');
let isDarkMode = true;

// Toggle dark/light mode
modeToggle.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('light-mode');
  modeToggle.textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';
});

// Helper functions
function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

// Evaluate expression safely
function evaluateExpression() {
  try {
    const expr = display.value
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/sqrt\(/g, 'Math.sqrt(')
      .replace(/\^/g, '**');
    const result = eval(expr);
    display.value = result;
  } catch (e) {
    display.value = 'Error';
  }
}

// Button event handling
buttons.forEach(btn => {
  if (btn.classList.contains('digit')) {
    btn.addEventListener('click', () => {
      appendToDisplay(btn.dataset.digit);
    });
  } else if (btn.classList.contains('operator')) {
    btn.addEventListener('click', () => {
      appendToDisplay(btn.dataset.op);
    });
  } else if (btn.classList.contains('func')) {
    btn.addEventListener('click', () => {
      const func = btn.dataset.func;
      if (func === 'log') {
        appendToDisplay('log(');
      } else if (func === 'ln') {
        appendToDisplay('ln(');
      } else if (func === 'sqrt') {
        appendToDisplay('sqrt(');
      } else {
        appendToDisplay(func + '(');
      }
    });
  } else if (btn.classList.contains('clear')) {
    btn.addEventListener('click', clearDisplay);
  } else if (btn.classList.contains('backspace')) {
    btn.addEventListener('click', backspace);
  } else if (btn.classList.contains('equals')) {
    btn.addEventListener('click', evaluateExpression);
  }
});
