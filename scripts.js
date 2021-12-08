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

