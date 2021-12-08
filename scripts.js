function add(a, b) {
  return a + b;
}

function subtract(a,b) {
  return a + b;
}

function multiply(a,b) {
  return a * b;
}

function divide(a,b) {
  return a / b;
}

function operate(operator, num1, num2) {
  let ans;
  switch (operator) {
    case '+':
      ans = add(num1,num2);
      break;
    case '-':
      ans = subtract(num1,num2);
      break;
    case '*':
      ans = multiply(num1,num2);
      break;
    case '/':
      ans = divide(num1,num2);
      break;
  }
  return ans;
}

class Calculator {
  constructor() {
    this.firstNumber;
    this.operator;
    this.secondNumber;
  }
  updateState(val) {
    if (typeof this.operator == 'undefined') {
      if (/[+x\-÷]/.test(val)) {
        this.updateOperator(val);
      } else {
        this.updateFirstNumber(val);
      }
    } else {
      this.updateSecondNumber(val);
    }
  }
  updateFirstNumber(val) {
    if (typeof this.firstNumber == 'undefined') {
      this.firstNumber = val;
    } else {
      this.firstNumber += val;
    }
    return this.firstNumber;
  }

  updateOperator(operator) {
    if (this.firstNumber) {
      this.operator = operator;
    }
  }

  updateSecondNumber(val) {
    if (typeof this.secondNumber == 'undefined') {
      this.secondNumber = val;
    } else {
      this.secondNumber += val;
    }
    return this.secondNumber;
  }
}

const calc = new Calculator();



const buttons = document.querySelectorAll('.btn');
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      // console.log(e.target.textContent);
      calc.updateState(e.target.textContent);
      console.log(calc);
      // console.log(typeof e.target.textContent);
  });
});
