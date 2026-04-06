const functionArray = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];

let testMakerInterval = null;
function testMaker(min, max, generator, search_bar, start_button) {
  let problemContainer = document.querySelector('.' + generator);
  const startBtn = document.querySelector('.' + start_button);
  const userInput = document.querySelector('.' + search_bar);

  if (startBtn.textContent !== 'Stop') {
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
      if (startBtn.textContent !== 'Stop') {
        clearInterval(testMakerInterval);
        testMakerInterval = null;
        return;
      }

      if (userInput.value === answer.toString()) {
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
    const a = Math.floor(Math.random() * 50000) + 500;
    const b = Math.floor(Math.random() * 50000) + 500;
    problemContainer.innerHTML = `<p>(1) ${a} ${sign} ${b}</p>`;
    return sign === '+' ? a + b : a - b;
  } else {
    const a = Math.floor(Math.random() * 40000) + 500;
    const b = Math.floor(Math.random() * 40000) + 500;
    const c = Math.floor(Math.random() * 40000) + 500;
    problemContainer.innerHTML = `<p>(1) ${a} ${sign} ${b} + ${c}</p>`;
    return sign === '+' ? a + b + c : a - b + c;
  }
}

function q2(problemContainer) {
  const a = Math.floor(Math.random() * 2000) + 1000;
  const b = Math.floor(Math.random() * 1500) + 100;
  problemContainer.innerHTML = `<p>(2) ${a} - ${b}</p>`;
  return a - b;
}

function q3(problemContainer) {
  const a = Math.floor(Math.random() * 11) + 2;
  const b = Math.floor((Math.random() * 25) * 100) / 100;
  const product = a * b;
  
  if (Math.random() < 0.5) {
    problemContainer.innerHTML = `<p>(3) ${product} &#247 ${a}</p>`;
    return b;
  } else {
    const randomNum = Math.floor(Math.random() * 12) + 1
    problemContainer.innerHTML = `<p>(3) ${product} &times <sup>${randomNum}</sup>&frasl;<sub>${a}</sub></p>`;
    return product * randomNum / a;
  }
}

function q4(problemContainer) {
  let a = [4, 5, 8,, 10, 16][Math.floor(Math.random() * 5)];
  let b = Math.floor(Math.random() * (a - 1)) + 1;
  [num, den] = simplify(b, a);

  if (Math.random() < 0.5) {
    problemContainer.innerHTML = `<p>(4) ${num}/${den} = _____ % (decimal) </p>`;
    let answer = (num / den) * 100;
    return answer.toString().replace(/^0+/, '');
  } else {
    problemContainer.innerHTML = `<p>(4) ${num}/${den} % = _____ (decimal) </p>`;
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
    problemContainer.innerHTML = sign === '+' ? `<p>(5) ${c} &times ${a} + ${b} &times ${c}</p>` : `<p>(5) ${c} &times ${b} - ${a} &times ${c}</p>`;
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
      problemContainer.innerHTML = `<p>5. The sum of proper divisors of ${int} is _____</p>`;
      sum -= int;
      return sum;
    } else {
      problemContainer.innerHTML = `<p>5. The sum of the divisors of ${int} is _____</p>`;
      return sum;
    }
  }
}

function q6(problemContainer) {
  let divisor = [3, 4, 6, 8, 9][Math.floor(Math.random() * 5)];
  let dividend = Math.floor(Math.random() * 10000) + 1000;
  problemContainer.innerHTML = `<p>(6) ${dividend} &divide ${divisor} has a remainder of ______</p>`;
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
  problemContainer.innerHTML = `<p>(7) ${message}</p>`;
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
  problemContainer.innerHTML = Math.random() < 0.5 ? `<p>(8) The product of the positive divisors of ${num} is _____</p>` : `<p>(8) The product of the proper divisors of ${num} is _____</p>`;
  if (problemContainer.innerHTML.includes('proper')) {
    return product / num;
  }
  return product;
}

function q9(problemContainer) {
  const dividend = Math.floor(Math.random() * 500) + 100;
  const divisor = Math.floor(Math.random() * 40) + 10;
  const remainder = dividend % divisor;
  problemContainer.innerHTML = `<p>(9) ${dividend} &divide ${divisor} = _____ (mixed number)</p>`;
  [num, den] = simplify(remainder, divisor);
  return `${Math.floor(dividend / divisor)} ${num}/${den}`;
}

function q10(problemContainer) {
  const max = Math.floor(Math.random() * 100000) + 5000;
  const a = Math.floor(Math.random() * (4 / 5) * max) + (1 / 5) * max;
  const b = Math.floor(Math.random() * (4 / 5) * max) + (1 / 5) * max;
  const c = Math.floor(Math.random() * (4 / 5) * max) + (1 / 5) * max;
  const d = Math.floor(Math.random() * (4 / 5) * max) + (1 / 5) * max;
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

  problemContainer.innerHTML = `<p>(10) ${message} = _____</p>`;
  return sum;
}