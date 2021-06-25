// to Start the program enter "npm run termCal"


const prompt = require('prompt')

prompt.start()

// split expression by operator considering parentheses
const splitByOperator = (expression, operator) => {
  const result = [];
  let braces = 0;
  let currentChunk = "";
  for (let i = 0; i < expression.length; ++i) {
    const curCh = expression[i];
    if (curCh == '(') {
      braces++;
    } else if (curCh == ')') {
      braces--;
    }
    if (braces == 0 && operator == curCh) {
      result.push(currentChunk);
      currentChunk = "";
    } else currentChunk += curCh;
  }
  if (currentChunk != "") {
    result.push(currentChunk);
  }
  return result;
};

// Split by the lowest priority operator, then by the next high priority operator and so on
// this will only take strings containing * operator [ no + ]
const parseMultiplicationExpression = (expression) => {
  const numbersString = splitByOperator(expression, '*');
  const numbers = numbersString.map(noStr => {
    if (noStr[0] == '(') {
      const expr = noStr.substr(1, noStr.length - 2);
      // recursive call to the main function
      return parsePlusExpression(expr);
    }
    return +noStr;
  });
  const initialValue = 1.0;
  const result = numbers.reduce((acc, no) => acc * no, initialValue);
  return result;
};

// this will take strings containing - and / operator 
const parseMinusExpression = (expression) => {
  const numbersString = splitByOperator(expression, '-');
  const numbers = numbersString.map(noStr => parseDivideExpression(noStr));
  const initialValue = numbers[0];
  const result = numbers.slice(1).reduce((acc, no) => acc - no, initialValue);
  return result;
};

// this will take strings containing / and * operator 
const parseDivideExpression = (expression) => {
  const numbersString = splitByOperator(expression, '/');
  const numbers = numbersString.map(noStr => parseMultiplicationExpression(noStr));
  const initialValue = numbers[0];
  const result = numbers.slice(1).reduce((acc, no) => acc / no, initialValue);
  return result;
};

// this will take strings containing + and - operator 
const parsePlusExpression = (expression) => {
  const numbersString = splitByOperator(expression, '+');
  const numbers = numbersString.map(noStr => parseMinusExpression(noStr));
  const initialValue = 0.0;
  const result = numbers.reduce((acc, no) => acc + no, initialValue);
  return result;
};

prompt.get(["input"], function(err,result){
  if(err) {return onError(err)}
  const add = parsePlusExpression(result.input)
  console.log(add)
})
