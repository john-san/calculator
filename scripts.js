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
  handleInput(val) {
    if (isANumber(val)) {
      if (this.operator == undefined) {
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
    if (this.firstNumber == '0') {
      this.firstNumber = val;
    } else {
      this.firstNumber += val;
    }
    updateText(mainText, this.firstNumber);
    subText.textContent ? updateText(subText, '') : false;
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

    updateText(subText, `${this.firstNumber} ${this.operator}`);
    updateText(mainText, '');
  }

  updateSecondNumber(val) {
    if (this.secondNumber == '0' || this.secondNumber == undefined) {
      this.secondNumber = val;
    } else {
      this.secondNumber += val;
    }
    updateText(mainText, this.secondNumber);
  }

  clearState() {
    this.firstNumber = '0';
    this.reset('operator');
    this.reset('secondNumber');
    updateText(subText, '');
    updateText(mainText, this.firstNumber);
  }

  delete() {
    if (this.secondNumber) {
      this.secondNumber = this.secondNumber.slice(0, this.secondNumber.length - 1);
      updateText(mainText,this.secondNumber);
    } else if (this.operator) {
      this.reset('operator');
      updateText(mainText, this.firstNumber);
      updateText(subText, '');
    } else {
      this.firstNumber = this.firstNumber.slice(0, this.firstNumber.length - 1);
      updateText(mainText, this.firstNumber);
    }
  }

  equals() {
    if (this.firstNumber && this.operator && this.secondNumber) {
      if(this.operator == '÷' && this.secondNumber == '0') {
        alert("Silly rabbit, you can't divide by 0!");
      } else {
        updateText(subText, `${this.firstNumber} ${this.operator} ${this.secondNumber} =`);
        let ans = operate(this.operator, this.firstNumber, this.secondNumber);
        this.firstNumber = ans.toString();
        this.reset('operator');
        this.reset('secondNumber');
        updateText(mainText, ans);
      }
    }
    
  }

  handleDecimal() {
    if (this.operator) {
      if (this.secondNumber) {
        if (this.secondNumber.includes('.') == false) {
          this.secondNumber += '.';
        } 
      } else {
        this.secondNumber = '0.';
      }
      updateText(mainText, this.secondNumber);
    } else {
      if (this.firstNumber.includes('.') == false) {
        this.firstNumber += '.';
        updateText(mainText, this.firstNumber);
      } 
   }
  }

  reset(propName) {
    this[propName] = undefined;
  }

  
}


// helpers
function isANumber(str) {
  const numRegex = /[0-9]/;
  return numRegex.test(str);
}

function updateText(el, text) {
  el.textContent = text;
}


const calc = new Calculator();

const subText = document.getElementById('subDisplayText');
const mainText = document.getElementById('mainDisplayText');



updateText(mainText, calc.firstNumber);

const buttons = document.querySelectorAll('.btn');
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      calc.handleInput(e.target.textContent);
      console.log(calc);
  });
});

document.addEventListener('keydown', (e) => {
  // console.log(e.key);

  const acceptedInputs = [
    "backspace",
    "delete",
    "escape",
    "enter",
    "=",
    "/",
    "*",
    "x",
    "+",
    "-",
    ".",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
  ]

  let input = e.key.toLowerCase();
  if (acceptedInputs.includes(input)) {
    if (input == 'backspace' || input == 'delete') {
      input = 'DELETE';
    } else if (input == 'escape') {
      input = 'CLEAR';
    } else if (input == 'enter' || input == '=') {
      input = '=';
    } else if (input == '/') {
      input = '÷';
    } else if (input == 'x' || input == '*') {
      input = 'x';
    } 
    calc.handleInput(input);
    console.log(calc);
  }
})