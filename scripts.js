function add(a, b) {
  return a + b;
}

function subtract(a,b) {
  return a - b;
}

function multiply(a,b) {
  return a * b;
}

function divide(a,b) {
  return a / b;
}

function operate(operator, num1, num2) {
  if (typeof num1 == 'string') {
    num1 = parseFloat(num1);
  }

  if (typeof num2 == 'string') {
    num2 = parseFloat(num2);
  }

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
    case 'x':
      ans = multiply(num1,num2);
      break;
    case '/':
      ans = divide(num1,num2);
      break;
    case '÷':
      ans = divide(num1,num2);
      break;
  }
  return ans;
}

class Calculator {
  constructor() {
    this.firstNumber = '0';
    this.operator;
    this.secondNumber;
  }
  handleClick(val) {
    if (isANumber(val)) {
      if (doesNotExist(this.operator)) {
        this.updateFirstNumber(val);
      } else {
        this.updateSecondNumber(val);
      }
    } else {
      switch (val) {
        case "CLEAR":
          this.clearState();
          break;
        case "DELETE":
          this.delete();
          break;
        case "=":
          this.equals();
          break;
        case ".":
          this.handleDecimal();
          break;
        default:
          this.updateOperator(val);
      }
    }
  }

  updateFirstNumber(val) {
    if (doesNotExist(this.firstNumber) || this.firstNumber == '0') {
      this.firstNumber = val;
    } else {
      this.firstNumber += val;
    }
  }

  updateOperator(operator) {
    if (this.firstNumber) {
      if (this.secondNumber) {
        this.operator = operator;
        this.equals();
        this.operator = operator;
      } else {
        this.operator = operator;
      }
    }
  }

  updateSecondNumber(val) {
    if (doesNotExist(this.secondNumber)) {
      this.secondNumber = val;
    } else {
      this.secondNumber += val;
    }
  }

  clearState() {
    this.firstNumber = '0';
    this.reset('operator');
    this.reset('secondNumber');
  }

  delete() {
    if (doesNotExist(this.operator)) {
      this.firstNumber = this.firstNumber.slice(0, this.firstNumber.length - 1);
    } else {
      this.secondNumber = this.secondNumber.slice(0, this.secondNumber.length - 1);
    }
  }

  equals() {
    if (this.firstNumber && this.operator && this.secondNumber) {
      let ans = operate(this.operator, this.firstNumber, this.secondNumber);
      this.firstNumber = ans.toString();
      this.reset('operator');
      this.reset('secondNumber');
    }
    
  }

  handleDecimal() {
    if (this.operator) {
      if (this.secondNumber) {
        if (!this.secondNumber.includes('.')) {
          this.secondNumber += '.';
        } 
      } else {
        this.secondNumber = '0.';
      }
    } else {
      if (!this.firstNumber.includes('.')) {
        this.firstNumber += '.';
      } 
   }
  }

  reset(propName) {
    this[propName] = undefined;
  }

  
}


// helpers
function doesNotExist(prop) {
  return typeof prop == 'undefined';
}

function isANumber(str) {
  const numRegex = /[0-9]/;
  return numRegex.test(str);
}


const calc = new Calculator();



const buttons = document.querySelectorAll('.btn');
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      // console.log(e.target.textContent);
      calc.handleClick(e.target.textContent);
      console.log(calc);
      // console.log(typeof e.target.textContent);
  });
});
