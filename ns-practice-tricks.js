function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function simplify(numerator, denominator) {
  const commonDivisor = gcd(Math.abs(numerator), Math.abs(denominator));
  
  return [numerator / commonDivisor, denominator / commonDivisor];
}


let cubicRootInterval = null;

function cubicRootABC() {
  let problemContainer = document.querySelector('.cubicRootABC-generator-container');
  const startBtn = document.querySelector('.cubicRootABC-start-button');
  const userInput = document.querySelector('.cubicRootABC-search-bar');

  if (startBtn.textContent !== 'Stop') {
    if (cubicRootInterval) {
      clearInterval(cubicRootInterval);
      cubicRootInterval = null;
    }
    problemContainer.innerHTML = '';
    userInput.value = '';
    return;
  }
  
  function makeQuestion() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const c = Math.floor(Math.random() * 10) + 1;
    const d = Math.floor(Math.random() * 10) + 1;
    problemContainer.innerHTML = `<p>Find the cubic root of ${a}x³ + ${b}x² + ${c}x + ${d}</p>`;
    let answerNum = (a * d) + (b * c);
    let answerDenom = a * a;
    if (answerNum % answerDenom === 0) {
      return `${answerNum / answerDenom}`;
    } else {
      [num, denom] = simplify(answerNum, answerDenom);
      return `${num}/${denom}`;
    }
  };

  let answer = makeQuestion();

  cubicRootInterval = setInterval(() => {
    if (userInput.value === answer.toString()) {
      userInput.value = '';
      answer = makeQuestion();
    }
  }, 200);
}

let determinant3x3Interval = null;
function determinant3x3() {
  let problemContainer = document.querySelector('.determinant3x3-generator-container');
  const startBtn = document.querySelector('.determinant3x3-start-button');
  const userInput = document.querySelector('.determinant3x3-search-bar');

  if (startBtn.textContent !== 'Stop') {
    if (determinant3x3Interval) {
      clearInterval(determinant3x3Interval);
      determinant3x3Interval = null;
    }
    problemContainer.innerHTML = '';
    userInput.value = '';
    return;
  }
  
  function makeQuestion() {
    const matrix = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        if (Math.random() < 0.4) {
          row.push(0);
        } else {
          row.push(Math.floor(Math.random() * 10) + 1);
        }
      }
      matrix.push(row);
    }
    problemContainer.innerHTML = 
    `<pre>
Find the determinant of the following matrix:
${matrix[0][0]} ${matrix[0][1]} ${matrix[0][2]}
${matrix[1][0]} ${matrix[1][1]} ${matrix[1][2]}
${matrix[2][0]} ${matrix[2][1]} ${matrix[2][2]}
    </pre>`;
    const determinant = matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) - matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
      matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);
    return determinant;
  }

  let answer = makeQuestion();

  determinant3x3Interval = setInterval(() => {
    if (userInput.value === answer.toString()) {
      userInput.value = '';
      answer = makeQuestion();
    }
  }, 200);
}

let doubleIntegralAddSubtractInterval = null;
function doubleIntegralAddSubtract() {
  let problemContainer = document.querySelector('.doubleIntegralAddSubtract-generator-container');
  const startBtn = document.querySelector('.doubleIntegralAddSubtract-start-button');
  const userInput = document.querySelector('.doubleIntegralAddSubtract-search-bar');

  if (startBtn.textContent !== 'Stop') {
    if (doubleIntegralAddSubtractInterval) {
      clearInterval(doubleIntegralAddSubtractInterval);
      doubleIntegralAddSubtractInterval = null;
    }
    problemContainer.innerHTML = '';
    userInput.value = '';
    return;
  }

  function makeQuestion() {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1 + a;
    const c = Math.floor(Math.random() * 5) + 1;
    const d = Math.floor(Math.random() * 5) + 1 + c;
    const sign = Math.random() < 0.5 ? '+' : '-';
    
    problemContainer.innerHTML = 
`<pre>
Evaluate the following double integral:
∫<sub>${a}</sub><sup>${b}</sup> ∫<sub>${c}</sub><sup>${d}</sup> (x ${sign} y) dx dy
</pre>`;
    if (sign === '+') {
      return (b-a)*(d-c)*(a + b + c + d) / 2;
    } else {
      return (b-a)*(d-c)*(c + d - a - b) / 2;
    }
  }
  
  let answer = makeQuestion();

  doubleIntegralAddSubtractInterval = setInterval(() => {
    if (userInput.value === answer.toString()) {
      userInput.value = '';
      answer = makeQuestion();
    }
  }, 200);
}
