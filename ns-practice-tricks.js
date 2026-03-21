
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
