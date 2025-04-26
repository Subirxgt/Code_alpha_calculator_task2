let isOn = true;

function appendValue(value) {
  const display = document.getElementById('display');
  if (isOn) display.value += value;
}

function clearDisplay() {
  const display = document.getElementById('display');
  if (isOn) display.value = '';
}

function deleteLast() {
  const display = document.getElementById('display');
  if (isOn) display.value = display.value.slice(0, -1);
}

function turnOff() {
  const display = document.getElementById('display');
  display.value = '';
  display.placeholder = 'Calculator OFF';
  isOn = false;
  setTimeout(() => {
    isOn = true;
    display.placeholder = '0';
  }, 3000); // Auto re-enable after 3s
}

function calculate() {
    const display = document.getElementById('display');
    if (!isOn) return;
  
    try {
      let expression = display.value;
  
      // First: handle a % b => a * (b / 100)
      expression = expression.replace(/(\d+(?:\.\d+)?)\s*%\s*(\d+(?:\.\d+)?)/g, (_, a, b) => {
        return `(${a}*(${b}/100))`;
      });
  
      // Then: handle a + b% => a + (a * b / 100), similar for -, *, /
      expression = expression.replace(/(\d+(?:\.\d+)?)([+\-*/])(\d+(?:\.\d+)?)%/g, (_, a, op, b) => {
        if (op === '+' || op === '-') {
          return `${a}${op}(${a}*${b}/100)`;
        } else if (op === '*') {
          return `${a}*(${b}/100)`;
        } else if (op === '/') {
          return `${a}/(${b}/100)`;
        }
      });
  
      let result = eval(expression);
  
      if (result === Infinity || result === -Infinity) {
        display.value = "Not defined";
      } else {
        display.value = result;
      }
    } catch (error) {
      alert("Invalid expression");
    }
  }
  
  

