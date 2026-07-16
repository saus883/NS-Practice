const skip = document.getElementById('test-skip-button');
skip.addEventListener('click', (event) => {
  shouldSkip = true;
});




const functionArray = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26, q27, q28, q29, q30, q31, q32, q33, q34, q35, q36, q37, q38, q39, q40, q41, q42, q43, q44, q45, q46, q47, q48, q49, q50];

function getEstimateRange(answer) {
  let array = [];
  let lower = answer < 0? Math.round(answer * 1.05) : Math.round(answer * 0.95);
  let upper = answer < 0? Math.round(answer * 0.95) : Math.round(answer * 1.05);
  for (let i = lower; i <= upper; i++) {
    array.push(i.toString());
  }
  return array;
}

function testMakerCustom(min, max) {
  togglePage('test-questions-page');
  document.getElementById('test-title').textContent = `Custom Test: ${min} - ${max}`;
  document.getElementById('test-start-button').onclick = function() {
    swapStartStop('test-start-button');
    testMaker(min, max, 'test-problem-container', 'test-input', 'test-start-button');
  }
}

let testMakerInterval = null;
let shouldSkip = false;
function testMaker(min, max, container, input, startButton) {
  let problemContainer = document.getElementById(container);
  const startBtn = document.getElementById(startButton);
  const userInput = document.getElementById(input);

  if (startBtn.textContent === 'Start') {
    if (testMakerInterval) {
      clearInterval(testMakerInterval);
      testMakerInterval = null;
    }
    problemContainer.innerHTML = '';
    userInput.value = '';
    return;
  }

  const questions = functionArray.slice(min - 1, max);
  let currentIndex = 0;

  function askNextQuestion() {
    if (currentIndex >= questions.length) {
      testMakerInterval = null;
      problemContainer.innerHTML = `<p>Test complete! Click the button to start again.</p>`;
      userInput.value = '';
      return;
    }

    problemContainer.innerHTML = '';
    const answer = questions[currentIndex](problemContainer);

    testMakerInterval = setInterval(() => {
      if (shouldSkip === true) {
        shouldSkip = false;
        userInput.value = '';
        clearInterval(testMakerInterval);
        currentIndex += 1;
        askNextQuestion();
      }
      const inputValue = userInput.value.trim();
      if (Array.isArray(answer)) {
        const answers = answer.map((item) => item.toString());
        if (answers.includes(inputValue)) {
          userInput.value = '';
          clearInterval(testMakerInterval);
          currentIndex += 1;
          askNextQuestion();
        }
      } else if (inputValue === answer.toString()) {
        userInput.value = '';
        clearInterval(testMakerInterval);
        currentIndex += 1;
        askNextQuestion();
      }
    }, 200);
  }

  askNextQuestion();
  return;
}

function q1(problemContainer) {
  const sign = Math.random() < 0.5 ? '+' : '-';
  if (Math.random() < 0.5) {
    const a = Math.floor(Math.random() * 5000) + 200;
    const b = Math.floor(Math.random() * 5000) + 200;
    problemContainer.innerHTML += `<p>(1) ${a} ${sign} ${b}</p>`;
    return sign === '+' ? a + b : a - b;
  } else {
    const a = Math.floor(Math.random() * 1000) + 500;
    const b = Math.floor(Math.random() * 1000) + 500;
    const c = Math.floor(Math.random() * 1000) + 500;
    problemContainer.innerHTML += `<p>(1) ${a} ${sign} ${b} + ${c}</p>`;
    return sign === '+' ? a + b + c : a - b + c;
  }
}

function q2(problemContainer) {
  const a = Math.floor(Math.random() * 2000) + 1000;
  const b = Math.floor(Math.random() * 1500) + 100;
  problemContainer.innerHTML += `<p>(2) ${a} - ${b}</p>`;
  return a - b;
}

function q3(problemContainer) {
  const a = math.bignumber(math.floor(math.random() * 11) + 2);//mathConfigured.floor(mathConfigured.multiply(mathConfigured.random(), 11)) + 2;
  const b = math.bignumber(math.round(math.multiply(math.random(), 10), 2));//mathConfigured.round(mathConfigured.multiply(mathConfigured.random(), 25), 2);
  const product = math.multiply(a, b);
  
  if (Math.random() < 0.5) {
    problemContainer.innerHTML += `<p>(3) \\(${product} \\div ${a}\\) = ____</p>`;
    MathJax.typeset();
    return b;
  } else {
    const randomNum = Math.floor(Math.random() * 6) + 1;
    let frac = math.fraction(randomNum, math.number(a));
    problemContainer.innerHTML += `<p>(3) \\(${product} \\times \\frac{${frac.n}}{${frac.d}}\\) = ____</p>`;
    MathJax.typeset();
    return math.evaluate(`${product} * ${frac.n} / ${frac.d}`);
  }
}

function q4(problemContainer) {
  let a = [4, 5, 8,, 10, 16][Math.floor(Math.random() * 5)];
  let b = Math.floor(Math.random() * (a - 1)) + 1;
  [num, den] = simplify(b, a);

  if (Math.random() < 0.5) {
    problemContainer.innerHTML += `<p>(4) ${num}/${den} = _____ % (decimal) </p>`;
    let answer = (num / den) * 100;
    return answer.toString().replace(/^0+/, '');
  } else {
    problemContainer.innerHTML += `<p>(4) ${num}/${den} % = _____ (decimal) </p>`;
    let answer = (num / den) / 100;
    return answer.toString().replace(/^0+/, '');;
  }
}

function q5(problemContainer) {
  if (Math.random() < 0.5) {
    let a = Math.floor(Math.random() * 12) + 1;
    let b = Math.floor(Math.random() * 12) + 1;
    let rand = Math.floor(Math.random() * 28) + 1;
    let c = Math.floor(Math.random() * 40) + 10;
    a += rand;
    b += rand;
    sign = Math.random() < 0.5 ? '+' : '-';
    problemContainer.innerHTML += sign === '+' ? `<p>(5) ${c} &times ${a} + ${b} &times ${c}</p>` : `<p>(5) ${c} &times ${b} - ${a} &times ${c}</p>`;
    if (sign === '+') {
      return c * a + b * c;
    } else {
      return c * b - a * c;
    }
  } else {
    let int = Math.floor(Math.random() * 30) + 1;
    let sum = 0;;
    for (let i = 1; i <= int; i++) {
      if (int % i === 0) {
        sum += i;
      }
    }
    
    if (Math.random() < 0.5) {
      problemContainer.innerHTML += `<p>(5) The sum of proper divisors of ${int} is _____</p>`;
      sum -= int;
      return sum;
    } else {
      problemContainer.innerHTML += `<p>(5) The sum of the divisors of ${int} is _____</p>`;
      return sum;
    }
  }
}

function q6(problemContainer) {
  let divisor = [3, 4, 6, 8, 9][Math.floor(Math.random() * 5)];
  let dividend = Math.floor(Math.random() * 10000) + 1000;
  problemContainer.innerHTML += `<p>(6) ${dividend} &divide ${divisor} has a remainder of ______</p>`;
  return dividend % divisor;
}

function q7(problemContainer) {
  let message = '';
  let array = [];
  let interval = [1, 2][Math.floor(Math.random() * 2)];
  const max = Math.floor(Math.random() * 30) + 20;
  for (let i = [1, 2, 3, 4][Math.floor(Math.random() * 4)]; i <= max; i += interval) {
    array.push(i);
  }

  for (let i = 0; i < array.length - 1; i++) {
    message += array[i] + ' + ';
  }
  message += array[array.length - 1] + ' = _____';
  problemContainer.innerHTML += `<p>(7) ${message}</p>`;
  return array.reduce((a, b) => a + b, 0);
}

function q8(problemContainer) {
  let num = [6, 8, 9, 12, 14, 15, 16, 18, 20, 21, 22, 24][Math.floor(Math.random() * 12)];
  let product = 1;
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      product *= i;
    }
  }
  problemContainer.innerHTML += Math.random() < 0.5 ? `<p>(8) The product of the positive divisors of ${num} is _____</p>` : `<p>(8) The product of the proper divisors of ${num} is _____</p>`;
  if (problemContainer.innerHTML.includes('proper')) {
    return product / num;
  }
  return product;
}

function q9(problemContainer) {
  const dividend = Math.floor(Math.random() * 500) + 100;
  const divisor = Math.floor(Math.random() * 40) + 10;
  problemContainer.innerHTML = `<p>(9) \\(${dividend} \\div ${divisor}\\) = _____ (mixed number)</p>`;
  MathJax.typeset();
  console.log(fracAnswer(dividend/divisor));
  return fracAnswer(dividend / divisor);
}

function q10(problemContainer) {
  const max = Math.floor(Math.random() * 100000) + 5000;
  const a = Math.floor(Math.random() * Math.round((4 / 5) * max)) + Math.round((1 / 5) * max);
  const b = Math.floor(Math.random() * Math.round((4 / 5) * max)) + Math.round((1 / 5) * max);
  const c = Math.floor(Math.random() * Math.round((4 / 5) * max)) + Math.round((1 / 5) * max);
  const d = Math.floor(Math.random() * Math.round((4 / 5) * max)) + Math.round((1 / 5) * max);
  const array = [a, b, c, d];
  const operators = [];

  for (let i = 0; i < array.length - 1; i++) {
    operators.push(Math.random() < 0.5 ? '+' : '-');
  }

  let message = '';
  for (let i = 0; i < array.length; i++) {
    message += array[i];
    if (i < operators.length) {
      message += ` ${operators[i]} `;
    }
  }

  let sum = array[0];
  for (let i = 1; i < array.length; i++) {
    sum += operators[i - 1] === '+' ? array[i] : -array[i];
  }

  problemContainer.innerHTML += `<p>*(10) ${message} = _____</p>`;
  return getEstimateRange(sum);
}

function q11(problemContainer) {
  let factor = Math.floor(Math.random() * 8) + 2;
  let num1 = factor * Math.floor(Math.random() * 8) + 2;
  let num2 = factor * Math.floor(Math.random() * 8) + 2;

  let gcd1 = gcd(num1, num2);
  let lcm = (num1 * num2) / gcd1;
  let sign = (Math.random() * 2 | 0) ? '+' : '-';
  problemContainer.innerHTML += `<p>(11) The GCD(${num1}, ${num2}) ${sign} the LCM(${num1}, ${num2}) is _____</p>`;
  return sign === '+' ? gcd1 + lcm : gcd1 - lcm;
}

function q12(problemContainer) {
  let a = Math.floor(Math.random() * 10) + 11;
  let b = Math.floor(Math.random() * 2 ) + a;
  let c = Math.floor(Math.random() * 2 ) + b;

  let wholeNumber = Math.floor((a * b) / c);
  let numerator = (a * b) % c;
  let denominator = c;
  [numerator, denominator] = simplify(numerator, denominator);

  problemContainer.innerHTML += `<p>(12) ${a} &times ${b} &divide ${c} = _____ (mixed number)</p>`;
  return wholeNumber + (numerator === 0 ? '' : ` ${numerator}/${denominator}`);
}

function q13(problemContainer) {
  let a = Math.floor(Math.random() * 20) + 11;
  let b = a + Math.floor(Math.random() * 9) + 2;

  let difference = Math.random() < 0.5 ? b**2 - a**2 : a**2 - b**2;
  console.log(difference);

  let factors = [];
  for (let i = Math.floor(Math.abs(difference) * 0.5); i >= 2; i--) {
    if (math.abs(difference) % i === 0) {
      factors.push(i);
    }
  }
  let factor = factors[Math.floor(Math.random() * factors.length)];

  if (difference < 0) {
    problemContainer.innerHTML = `<p>(13) ${a}<sup>2</sup> - ${b}<sup>2</sup> = ${factor} &times _____</p>`;    
  } else {
    problemContainer.innerHTML = `<p>(13) ${b}<sup>2</sup> - ${a}<sup>2</sup> = ${factor} &times _____</p>`;
  }

  console.log(difference);
  console.log(factor);
  console.log(difference / factor);
  return difference / factor;
}

function q14(problemContainer) {
  let a = Math.floor(Math.random() * 251) + 300;
  let b = Math.floor(Math.random() * 13) + 10;

  problemContainer.innerHTML = `<p>(14) ${a} &times ${b} = _____</p>`;
  return a * b;
}

function q15(problemContainer) {
  let numbers = [];
  let signs = [];
  let expression = '';
  for (i = 0; i < 6; i++){
    let temp = '' + (Math.floor(Math.random() * 10) + 1);
    if (i != 5) {
      if (i % 2 === 0) {
        temp += ' ' + ['+', '-'][Math.floor(Math.random() * 2)] + ' ';
      } else {
        temp += ' ' + ['*', '/' ][Math.floor(Math.random() * 2)] + ' ';
      }
    }
    expression += temp;
  }
  problemContainer.innerHTML = `<p>(15) ${expression} = _____</p>`;
  return fracAnswer(math.evaluate(expression));
}

function q16(problemContainer) {
  let biggie = 1000 + Math.floor(Math.random() * 17) * 100;
  let smallie = Math.floor(Math.random() * 6) + 3;
  biggie -= smallie;
  let other = [Math.pow(smallie, 2) * -1, Math.pow(smallie, 2), Math.pow(smallie, 2) * 2][Math.floor(Math.random() * 3)];
  problemContainer.innerHTML = other < 0 ? `<p>(16) ${biggie} * ${smallie} - ${Math.abs(other)} = _____</p>` : `<p>(16) ${biggie} * ${smallie} + ${other} = _____</p>`;
  return biggie * smallie + other;
}

function q17(problemContainer) {
  let oz2 = (Math.floor(Math.random() * 25) + 12) / 4;
  let gram2 = oz2 * 5/2;
  
  problemContainer.innerHTML  = `<p>(17) 1 gram = 0.4 oz, and ${oz2} oz = ____ grams</p>`;
  return fracAnswer(gram2);
}

function q18(problemContainer) {
  let num1 = Math.floor(Math.random() * 9) + 1;
  num1 = num1 * 100 + num1 * 10 + num1;
  let num2 = Math.floor(Math.random() * 15) + 6;
  let num3 = num1 * num2 / 37;

  problemContainer.innerHTML = `<p>(18) ${num1} &times n &divide 37 = ${num3}</p>`;
  return num2;
}

function q19(problemContainer) {
  let num = Math.floor(Math.random() * 15) + 21;
  let low = Math.floor(Math.random() * 4) + 2;
  let sign = Math.random() < 0.5 ? '<' : '&le';
  let count = 0;
  let adj = sign === '<' ? 1 : 0;
  for (i = low + adj; i < num; i++) {
    if (gcd(num, i) === 1) {
      count += 1;
    }
  }
  if (sign === '<') {
    problemContainer.innerHTML = `<p>(19) The number of integers n, ${low} < n < ${num}, which are relatively prime to ${num} is _____</p>`;
  } else {
    problemContainer.innerHTML = `<p>(19) The number of integers n, ${low} &le; n < ${num}, which are relatively prime to ${num} is _____</p>`;
  }
  
  return count;
}

function q20(problemContainer) {
  let decider = Math.random();
  if (decider < 0.5) {
    let a = Math.floor(Math.random() * 9900001) + 100000;
    let b = Math.floor(Math.random() * 9901) + 100;
    problemContainer.innerHTML = `<p>*(20) ${a} &divide ${b} = _____`;
    return getEstimateRange(a / b); 
  } else {
    let a = Math.floor(Math.random() * 491) + 100;
    let b = Math.floor(Math.random() * 491) + 100;
    let c = Math.floor(Math.random() * 9901) + 100;
    problemContainer.innerHTML = `<p>*(20) ${a} &times ${b} + ${c} = _____`;
    return getEstimateRange(a * b + c);
  }
}

function q21(problemContainer) {
  let root = Math.floor(Math.random() * 49) + 2;
  let power;
  if (root <= 20) {
    power = Math.random() < 0.5 ? 2 : 3;
  } else {
    power = 2;
  }
  
  if (Math.random() < 0.5) {
    problemContainer.innerHTML = `<p>(21) \\(${root}^${power}\\) = _____</p>`;
    MathJax.typeset();
    return root ** power;
  } else {
    problemContainer.innerHTML = `<p>(21) \\(\\sqrt[${power}]{${root ** power}}\\) = _____</p>`;
    MathJax.typeset();
    return root;
  }
}

function q22(problemContainer) {
  let den1 = Math.floor(Math.random() * 9) + 2;
  let den2 = Math.floor(Math.random() * 9) + 2;
  let whole1 = (Math.floor(Math.random() * 3) + 1) * den2;
  let whole2 = (Math.floor(Math.random() * 3) + 1) * den1;
  let num1 = Math.floor(Math.random() * (den1 - 1)) + 1;
  let num2 = Math.floor(Math.random() * (den2 - 1)) + 1;
  [num1, den1] = simplify(num1, den1);
  [num2, den2] = simplify(num2, den2);

  let answerWhole = whole1 * whole2 + whole1 * num2 / den2 + whole2 * num1 / den1;
  [answerNum, answerDen] = simplify(num1 * num2, den1 * den2);
  let answer = `${answerWhole} ${answerNum}/${answerDen}`;
  problemContainer.innerHTML = `<p>(22) \\(${whole1}\\frac{${num1}}{${den1}}\\times ${whole2}\\frac{${num2}}{${den2}}\\) = _____</p>`;
  MathJax.typeset();
  return answer;
}

function q23(problemContainer) {
  let numbers = [];
  for (i = 0; i < 6; i++) {
    numbers.push(Math.floor(Math.random() * 9) + 2);
  }
  let signs = [];
  for (i = 0; i < 5; i++) {
    Math.random() < 0.5 ? signs.push('+') : signs.push('-');
  }
  
  let answer = numbers[0];
  let temp;
  answer = signs[0] === '+' ? answer + numbers[1] : answer - numbers[1];
  temp = signs[2] === '+' ? numbers[2] + numbers[3] : numbers[2] - numbers[3];
  answer = signs[1] === '+' ? answer + Math.abs(temp) : answer - Math.abs(temp);
  temp = signs[4] === '+' ? numbers[4] + numbers[5] : numbers[4] - numbers[5]
  answer = signs[3] === '+' ? answer + Math.abs(temp) : answer - Math.abs(temp);

  problemContainer.innerHTML = `<p>(23) ${numbers[0]} ${signs[0]} ${numbers[1]} ${signs[1]} |${numbers[2]} ${signs[2]} ${numbers[3]}| ${signs[3]} |${numbers[4]} ${signs[4]} ${numbers[5]}| = _____</p>`;
  console.log(answer);
  return answer;
}

function q24(problemContainer) {
  let percent1 = Math.floor(Math.random() * 50) + 1;
  let factor, percent2, num1, num2;

  do {
    factor = Math.floor(Math.random() * 3) + 2;
  } while (percent1 * factor > 100)
  do {
    num2 = Math.floor(Math.random() * 301) + 100;
  } while (num2 * factor > 750)
  percent2 = percent1 * factor;
  num1 = num2 * factor;

  problemContainer.innerHTML = `<p>(24) ${percent1}% of ${num1} is ${percent2}% of _____ </p>`;
  return num2;
}

function q25(problemContainer) {
  function generateRandomLetter() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  let array1 = [];
  let array2 = [];
  let array3 = [];

  let size = Math.floor(Math.random() * 3) + 4;
  for (i = 0; i < size; i++) {
    array1.push(generateRandomLetter());
  }
  size = Math.floor(Math.random() * 3) + 4;
  for (i = 0; i < size; i++) {
    array2.push(generateRandomLetter());
  }
  size = Math.floor(Math.random() * 3) + 4;
  for (i = 0; i < size; i++) {
    array3.push(generateRandomLetter());
  }
  let string1 = array1.join(', ');
  let string2 = array2.join(', ');
  let string3 = array3.join(', ');

  function union(array1, array2) {
    let newArray = [...array1, ...array2];
    newArray = [...new Set(newArray)];
    return newArray;
  }
  function intersection(array1, array2) {
    let set2 = new Set(array2);
    let newArray = array1.filter(item => set2.has(item));
    return newArray;
  }

  let version = Math.floor(Math.random() * 2);
  let answerArray;
  if (version === 0) {
    let unionArray = union(array1, array2);
    answerArray = intersection(unionArray, array3);
    problemContainer.innerHTML = `<p>(25) \\((\\{${string1}\\}\\cup\\{${string2}\\})\\cap\\{${string3}\\}\\text{ contains how many distinct elements?}\\) ____</p>`;
  } else {
    let intersectionArray = intersection(array1, array2);
    answerArray = union(intersectionArray, array3);
    problemContainer.innerHTML = `<p>(25) \\((\\{${string1}\\}\\cap\\{${string2}\\})\\cup\\{${string3}\\}\\text{ contains how many distinct elements?}\\) ____</p>`;
  }
  MathJax.typeset();
  return answerArray.length; 
}

function q26(problemContainer) {
  let num1 = Math.floor(Math.random() * 7) + 3;
  let num2 = Math.floor(Math.random() * 21) + 10;
  let num3;
  do {
    num3 = Math.floor(Math.random() * 21) + 10;
  } while (num2 === num3);
  let factor = [1.5, 2, 3, 4, 5][Math.floor(Math.random() * 5)];

  problemContainer.innerHTML = `<p>(26) If ${num1}x + ${num2} = ${num3}, then ${num1 * factor}x = ____</p>`;
  return fracAnswer((num3 - num2) * factor);
}

function q27(problemContainer) {
  let num1 = [1, 2, 3, 4, 5, 6][Math.floor(Math.random() * 6)];
  let num2 = [7, 8, 9, 10, 11][Math.floor(Math.random() * 5)];
  let num3 = [12, 13, 14, 15][Math.floor(Math.random() * 4)];

  problemContainer.innerHTML = `<p>(27) ${num1/16} - ${num2/16} - ${num3/16} = ____</p>`;
  return fracAnswer(num1/16 - num2/16 - num3/16);
}

function q28(problemContainer) {
  let base = Math.floor(Math.random() * 6) + 4;
  let base10num = Math.floor(Math.random() * 451) + 50;
  let baseXnum = base10num.toString(base);

  if (Math.random() < 0.5) {
    problemContainer.innerHTML = `<p>(28) \\(${base10num} = \\)____\\(_${base}\\)</p>`;
    MathJax.typeset();
    return baseXnum;
  } else {
    problemContainer.innerHTML = `<p>(28) \\(${baseXnum}_${base} = \\)____</p>`;
    MathJax.typeset();
    return base10num;
  }
}

function q29(problemContainer) {
  let digits = Math.floor(Math.random() * 3) + 3;
  let digitNum = [];
  let digitMax = Math.floor(Math.random() * 2) + digits;
  for (let i = 0; i < digitMax; i++) {
    digitNum.push(Math.floor(Math.random() * 10));
    do {
      digitNum.pop();
      digitNum.push(Math.floor(Math.random() * 10));
    } while (digitNum.length !== new Set(digitNum).size)
  }

  let answer = 1;
  for (let i = 0; i < digits; i++) {
    if (i === 0 && digitNum.includes(0)) {
      answer *= digitNum.length - 1;
    } else {
      answer *= digitNum.length - i;
    }
  }
  
  const formatter = new Intl.ListFormat({ style: 'long', type: 'conjunction'});
  problemContainer.innerHTML = `<p>(29) How many ${digits}-digit numbers can be made using the digits ${formatter.format(digitNum.map(String))} without repetition? ____</p>`;
  return answer;
}

function q30(problemContainer) {
  let num = Math.floor(Math.random() * 990001) + 10000;

  problemContainer.innerHTML = `<p>*(30) \\(\\sqrt{${num}} = \\) ____</p>`;
  MathJax.typeset();
  return getEstimateRange(Math.sqrt(num));
}

function q31(problemContainer) {
  let frac1 = [Math.floor(Math.random() * 13) + 4];
  let frac2 = [Math.floor(Math.random() * 13) + 4];
  frac1.push(Math.floor(Math.random() * (frac1[0] - 1)) + 1);
  frac2.push(Math.floor(Math.random() * (frac2[0] - 1)) + 1);

  if (checkDecimalType(frac1[1], frac1[0]) === 'Terminating' && checkDecimalType(frac2[1], frac2[0]) === 'Terminating') {
    problemContainer.innerHTML = `<p>(31) \\(${frac1[1]/frac1[0]} \\div ${frac2[1]/frac2[0]}\\) = ____</p>`;
  } else if (checkDecimalType(frac1[1], frac1[0]) === 'Terminating' && checkDecimalType(frac2[1], frac2[0]) === 'Repeating') {
    let repeater = terminateRepeatingDecimal(frac2[1], frac2[0]);
    problemContainer.innerHTML = `<p>(31) \\(${frac1[1]/frac1[0]} \\div ${repeater}\\dots\\) = ____</p>`;
  } else if (checkDecimalType(frac1[1], frac1[0]) === 'Repeating' && checkDecimalType(frac2[1], frac2[0]) === 'Terminating'){
    let repeater = terminateRepeatingDecimal(frac1[1], frac1[0]);
    problemContainer.innerHTML = `<p>(31) \\(${repeater}\\dots \\div ${frac2[1]/frac2[0]}\\) = ____</p>`;
  } else {
    let repeater1 = terminateRepeatingDecimal(frac1[1], frac1[0]);
    let repeater2 = terminateRepeatingDecimal(frac2[1], frac2[0]);
    problemContainer.innerHTML = `<p>(31) \\(${repeater1}\\dots \\div ${repeater2}\\dots\\) = ____</p>`;
  }
  MathJax.typeset();
  return fracAnswer((frac1[1]/frac1[0]) / (frac2[1]/frac2[0]));
}

function q32(problemContainer) {
  let frac1 = [Math.floor(Math.random() * 9) + 2, Math.floor(Math.random() * 5) + 2];
  let frac2 = [Math.floor(Math.random() * 9) + 2, Math.floor(Math.random() * 5) + 2];
  frac1.splice(1, 0, Math.floor(Math.random() * (frac1[1] - 1)) + 1);
  frac2.splice(1, 0, Math.floor(Math.random() * (frac2[1] - 1)) + 1);
  ([frac1[1], frac1[2]] = simplify(frac1[1], frac1[2]));
  ([frac2[1], frac2[2]] = simplify(frac2[1], frac2[2]));

  problemContainer.innerHTML = `<p>(32) \\(${frac1[0]}\\frac{${frac1[1]}}{${frac1[2]}} \\div ${frac2[0]}\\frac{${frac2[1]}}{${frac2[2]}}\\) = ____</p>`;
  MathJax.typeset();
  return fracAnswer((frac1[0] + frac1[1] / frac1[2]) / (frac2[0] + frac2[1] / frac2[2]));
}

function q33(problemContainer) {
  let frac = {
    num: 1,
    den: [8, 11, 12, 14, 15, 16][Math.floor(Math.random() * 6)],
  };
  frac.num = Math.floor(Math.random() * (frac.den - 1)) + 1;

  problemContainer.innerHTML = `<p>(33) The multiplicative inverse of \\(${checkDecimalType(frac.num, frac.den) === 'Repeating' ? terminateRepeatingDecimal(frac.num, frac.den) : frac.num / frac.den}${checkDecimalType(frac.num, frac.den) === 'Repeating' ? `...` : ``}\\) is ____</p>`;
  MathJax.typeset();
  return fracAnswer(frac.den / frac.num);
}

function q34(problemContainer) {
  let num1 = math.bignumber((Math.floor(Math.random() * 20) + 1) / 2);
  let num2 = math.bignumber(Math.floor(Math.random() * 50) + 1);
  num2 = math.divide(num2, Math.random() < 0.5 ? 10 : 100);

  problemContainer.innerHTML = `<p>(34) \\(${num1 * 2}^2 \\div ${num1}^2 \\times ${num2}^2\\) = ____</p>`;
  MathJax.typeset();
  return decimalFormat(4 * math.multiply(num2, num2));
}

function q35(problemContainer) {//add exponents, like cubes to some numbers, learn about exponents and modulus more
  let divisor = Math.floor(Math.random() * 7) + 3;
  let num1 = Math.floor(Math.random() * 40) + 1;
  let num2 = Math.random() < 0.5 ? Array.from({ length: 2 }, () => Math.floor(Math.random() * 20) + 1) : Math.floor(Math.random() * 40) + 1;
  let num3;
  if (num1 % divisor === 0) {
    num3 = Math.floor(Math.random() * 40) + 1;
  } else {
    num3 = Math.floor(Math.random() * 5) + 1;
    num3 *= num1 % divisor;
  }

  
  if (Array.isArray(num2)) {
    problemContainer.innerHTML = `<p>(35) \\((${num1} + ${num2[0]} \\times ${num2[1]} - ${num3}) \\div ${divisor} \\text{ has a remainder of}\\) = ____</p>`;
    MathJax.typeset();
    return (num1 + num2[0] * num2[1] - num3) % divisor;
  } else {
    problemContainer.innerHTML = `<p>(35) \\((${num1} + ${num2} - ${num3}) \\div ${divisor} \\text{ has a remainder of}\\) = ____</p>`;
    MathJax.typeset();
    return (num1 + num2 - num3) % divisor;
  }
}

function q36(problemContainer) {
  let num1 = Math.floor(Math.random() * 16) + 10;
  let num2 = Math.random() < 0.5 ? num1 - Math.floor(Math.random() * 4) - 1 : num1 + Math.floor(Math.random() * 4) + 1;
  
  
  if (Math.random() < 0.5) { //version 1
    problemContainer.innerHTML = `<p>(36) \\(\\frac{${num1}}{${num2}} + \\frac{${num2}}{${num1}}\\) = ____</p>`;
    MathJax.typeset();
    return fracAnswer(num1/num2 + num2/num1);
  } else { //version2
    problemContainer.innerHTML = `<p>(36) If \\(\\frac{${num1}}{${num2}} + \\frac{${num2}}{${num1}} = 2 + \\frac{B}{${num1*num2}} \\text{ , then B =}\\) ____</p>`;
    MathJax.typeset();
    return (num1 - num2)**2;
  }
}

function q37(problemContainer) {
  let f1 = {
    num: Math.floor(Math.random() * 10) + 3,
    den: 1,
  };

  let temp = 0;
  do {
    temp = Math.floor(Math.random() * 17) + 4;
  } while (temp <= f1.num || gcd(f1.num, temp) !== 1)
  f1.den = temp;

  let f2 = {
    num: 1,
    den: 1,
  };

  do {
    let n = Math.floor(Math.random() * 7) + 2;
    if (Math.random() < 0.5) {
      f2.num = f1.num * n - 1;
      f2.den = f1.den * n + 1;
    } else {
      f2.num = f1.num * n + 1;
      f2.den = f1.den * n - 1;
    }
  } while (gcd(f2.num, f2.den) !== 1)

  problemContainer.innerHTML = `<p>(37) \\(\\frac{${f1.num}}{${f1.den}} - \\frac{${f2.num}}{${f2.den}}\\) = ____</p>`;
  MathJax.typeset();
  return fracAnswer(f1.num/f1.den - f2.num/f2.den);
}

function q38(problemContainer) {
  
  let den = [90, 99, 900, 990, 999][Math.floor(Math.random() * 5)];
  let num = Math.floor(Math.random() * (den - 1)) + 1;
  

  let decimal = Math.trunc(10000000 * (num/den)) / 10000000;
  

  problemContainer.innerHTML = `<p>(38) \\(${decimal}${checkDecimalType(num, den) === 'Repeating' ? `...` : ``}\\) = ____ (proper fraction)</p>`;
  MathJax.typeset();
  return fracAnswer(num/den);
}

function q39(problemContainer) {
  function fibonacciSum(problemContainer) {
    const length = Math.floor(Math.random() * 7) + 6;
    const sequence = [Math.floor(Math.random() * 5) + 1];
    sequence.push(Math.floor(Math.random() * 4) + sequence[0]);

    for (let i = 2; i < length; i++) {
      sequence.push(sequence[i - 1] + sequence[i - 2]);
    }

    let string = sequence.join(' + ');

    let sum = 0;
    for (let i = 0; i < sequence.length; i++) {
      sum += sequence[i];
    }
    problemContainer.innerHTML = `<p>(39) ${string} = ____</p>`;
    console.log(sum);
    return sum;
  }
  function reciprocalTriangularSum(problemContainer) {
    let sequence = [];
    let length = Math.floor(Math.random() * 3) + 4;
    for (let i = 1; i <= length; i++) {
      sequence.push({ num: 1, den: (i) * (i + 1)/2 });
    }
    console.log(sequence);

    let sequenceString = '';
    for (let i = 0; i < length; i++) {
      if (sequence[i].den === 1) {
        sequenceString += `1`;
      } else {
        sequenceString += `\\frac{${sequence[i].num}}{${sequence[i].den}}`;
      }

      if (i != length - 1) {
        sequenceString += ` + `;
      }
    }

    let answer = 0;
    for (let i = 0; i < length; i++) {
      answer += sequence[i].num / sequence[i].den;
    }
    
    problemContainer.innerHTML = `<p>(39) \\(${sequenceString}\\) = ____</p>`;
    MathJax.typeset();
    return fracAnswer(answer);
  }
  return [fibonacciSum, reciprocalTriangularSum][Math.floor(Math.random() * 2)](problemContainer);
}

function q40(problemContainer) {
  function yficm(problemContainer) {
    let array = [0, 0, 0];
    do {
      array[0] = Math.floor(Math.random() * 4) + 3;
      array[1] = Math.floor(Math.random() * 10) - 4;
      array[2] = Math.floor(Math.random() * 21) - 7;
    } while (array[0] * 36 + array[1] * 12 + array[2] <= 0)

    let centimeters = 2.54 * (array[0] * 36 + array[1] * 12 + array[2]);

    array[1] = array[1] < 0 ? '- ' + array[1].toString().slice(1) : '+ ' + array[1];
    array[2] = array[2] < 0 ? '- ' + array[2].toString().slice(1) : '+ ' + array[2];

    problemContainer.innerHTML = `<p>*(40) ${array[0]} yards ${array[1]} feet ${array[2]} inches = ____ centimeters</p>`;
    return getEstimateRange(centimeters);
  }
  function cubeRoot(problemContainer) {
    let num = Math.floor(Math.random() * (10**10 - 10**7)) + 10**7;

    problemContainer.innerHTML = `<p>*(40) \\(\\sqrt[3]{${num}}\\) = ____</p>`;
    MathJax.typeset();
    return getEstimateRange(Math.pow(num, 1/3));
  }

  return [yficm, cubeRoot][Math.floor(Math.random() * 2)](problemContainer);
}

function q41(problemContainer) {
  let array = [];
  for (let i = 0; i < 4; i++) {
    array.push(Math.floor(Math.random() * 15) + 1);
  }
  let signs = [];
  for (let i = 0; i < 2; i++) {
    signs.push(['+','-'][Math.floor(Math.random() * 2)]);
  }
  let answer = signs[0] === '+' ? array[0] + array[1] : array[0] - array[1];
  answer *= signs[1] === '+' ? array[2] + array[3] : array[2] - array[3];

  problemContainer.innerHTML = `<p>(41) \\((${array[0]}x ${signs[0]} ${array[1]})(${array[2]}x ${signs[1]} ${array[3]}) = ax^2 + bx + c\\text{. Find a + b + c}\\) = ____</p>`;
  MathJax.typeset();
  return answer;
}

function q42(problemContainer) {
  let baseNum = [2, 3, 4][Math.floor(Math.random() * 3)];
  let exp = [];
  do {
    exp[0] = Math.floor(Math.random() *  15) + -7;
    exp[1] = Math.floor(Math.random() *  15) + -7;
    exp[2] = Math.floor(Math.random() *  15) + -7;
  } while (Math.abs(exp[0] + exp[1] + exp[2]) > 6)

  problemContainer.innerHTML = `<p>(42) \\(${baseNum}^{${exp[0]}} \\times ${baseNum}^{${exp[1]}} \\times ${baseNum}^{${exp[2]}} \\) = ____</p>`;
  MathJax.typeset();
  return fracAnswer(Math.pow(baseNum, exp[0] + exp[1] + exp[2]));
}

function q43(problemContainer) {
  let comp1 = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
  let comp2 = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
  let signs = [];
  for (i = 0; i < 2; i++) {
    if (Math.random() < 0.5) {
      signs.push('+');
    } else {
      signs.push('-');
    }
  }

  let a, b;
  if (signs[0] === '+' && signs[1] === '+') {
    a = comp1[0] * comp2[0] - comp1[1] * comp2[1];
    b = comp1[1] * comp2[0] + comp1[0] * comp2[1];
  } else if (signs[0] === '+' && signs[1] === '-') {
    a = comp1[0] * comp2[0] + comp1[1] * comp2[1];
    b = comp1[1] * comp2[0] - comp1[0] * comp2[1];
  } else if (signs[0] === '-' && signs[1] === '+') {
    a = comp1[0] * comp2[0] + comp1[1] * comp2[1];
    b = comp1[0] * comp2[1] - comp1[1] * comp2[0];
  } else {
    a = comp1[0] * comp2[0] - comp1[1] * comp2[1];
    b = -1 * comp1[1] * comp2[0] - comp1[0] * comp2[1];
  }
  problemContainer.innerHTML = `<p>(43) \\((${comp1[0]} ${signs[0]} ${comp1[1]}i)(${comp2[0]} ${signs[1]} ${comp2[1]}i) = a + bi, a + b\\) = ____</p>`;
  MathJax.typeset();
  return a + b;
}

function q44(problemContainer) {
  let divisor = [3, 4, 6][Math.floor(Math.random() * 3)];
  let dividend = Math.floor(Math.random() * 999000) + 1000;

  let remainder = dividend % divisor;

  problemContainer.innerHTML = `<p>(44) \\(${dividend} \\div ${divisor} \\text{ has a remainder of}\\) ____</p>`;
  MathJax.typeset();
  return remainder;
}

function q45(problemContainer) {
  let base = Math.floor(Math.random() * 6) + 3;
  let a = Math.floor(Math.random() * (base**2 - base)) + base;
  let b = Math.floor(Math.random() * (base**2 - base)) + base;
  let c = a * b;
  
  problemContainer.innerHTML = `<p>(45) \\(${a.toString(base)}_${base} \\times ${b.toString(base)}_${base}\\) = ____\\(_${base}\\)</p>`;
  MathJax.typeset();
  return c.toString(base);
}

function q46(problemContainer) {
  let base = Math.floor(Math.random() * 6) + 3;
  let c = Math.floor(Math.random() * (base**3 - base**2)) + base**2;
  let b = Math.floor(Math.random() * (base)) + 2;
  let remainder = c % b;

  problemContainer.innerHTML = `<p>(46) \\(${c.toString(base)}_${base} \\div ${b.toString(base)}_${base} \\text{ has a remainder of}\\) ____\\(_${base}\\)</p>`;
  MathJax.typeset();
  return remainder.toString(base);
}

function q47(problemContainer) {
  let point = {
    h: Math.floor(Math.random() * 17) + -8,
    k: Math.floor(Math.random() * 41) + -20,
  };
  let line = Math.random() < 0.8 ? { b: Math.floor(Math.random() * 15) + point.k - 7 }: { b: 0 };
  let newPoint = {
    h: point.h,
    k: point.k,
  };

  let difference = point.k - (point.h + line.b);
  newPoint.h = point.h + difference;
  newPoint.k = point.k - difference;

  let b = '';
  if (line.b < 0) {
    b = `- ${line.b.toString().slice(1)}`;
  } else if (line.b > 0) {
    b = `+ ${line.b}`;
  } else {
    b = ``;
  }
  problemContainer.innerHTML = `<p>(47) \\(\\text{The point (${point.h}, ${point.k}) is reflected across the line\\\\ } y = x ${b} \\text{ to the point (h, k). Find h + k.}\\) ____</p>`;
  MathJax.typeset();
  return newPoint.h + newPoint.k;
}

function q48(problemContainer) {
  let sum = Math.floor(Math.random() * 27) + 1;

  let answer;
  if (sum <= 9) {
    answer = sum * (sum + 1) / 2;
  } else if (sum <= 19) {
    answer = 70 - (14 - sum)**2;
  } else {
    answer = (28 - sum) * (28 - sum + 1) / 2;
  }

  problemContainer.innerHTML = `<p>(48) The sum of the digits of a 3-digit number is ${sum}. How many such numbers exist? ____</p>`;
  return answer;
}

function q49(problemContainer) {
  let cubic = {
    a: Math.floor(Math.random() * 9) + 1,
    b: (() => { let i = 0; do { i = Math.floor(Math.random() * 19) - 9 } while ( i === 0); return i; })(),
    c: (() => { let i = 0; do { i = Math.floor(Math.random() * 19) - 9 } while ( i === 0); return i; })(),
    d: (() => { let i = 0; do { i = Math.floor(Math.random() * 19) - 9 } while ( i === 0); return i; })(),
  };

  let answer1 = fracAnswer((cubic.c - cubic.d - cubic.b) / cubic.a);
  let answer2 = fracAnswer((-cubic.c - cubic.d - cubic.b) / cubic.a);

  let sign = {
    bSign: cubic.b < 0 ? '-' : '+',
    cSign: cubic.c < 0 ? '-' : '+',
    dSign: cubic.d < 0 ? '-' : '+',
  }
  cubic.b = sign.bSign === '-' ? cubic.b.toString().slice(1) : cubic.b;
  cubic.c = sign.cSign === '-' ? cubic.c.toString().slice(1) : cubic.c;
  cubic.d = sign.dSign === '-' ? cubic.d.toString().slice(1) : cubic.d;

  let otherSign = Math.random() < 0.5 ? '-' : '+';

  problemContainer.innerHTML = `<p>(49) \\(\\text{P, Q, and R are the roots of } ${cubic.a}x^3 ${sign.bSign} ${cubic.b}x^2 ${sign.cSign} ${cubic.c}x ${sign.dSign} ${cubic.d} = y\\text{. Find PQR ${otherSign} (PQ + PR + QR) + P + Q + R.}\\) ____</p>`;
  MathJax.typeset();
  if (otherSign === '+') {
    return answer1;
  } else {
    return answer2;
  }
}

function q50(problemContainer) {
  let a = Math.floor(Math.random() * 9001) + 1000;
  let b = Math.floor(Math.random() * 9001) + 1000;

  problemContainer.innerHTML = `<p>*(50) \\(${a} \\times ${b}\\) = ____</p>`;
  MathJax.typeset();
  return getEstimateRange(a * b);
}
