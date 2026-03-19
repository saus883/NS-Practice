function swapStartStop(buttonName) {
  if (document.querySelector(`.${buttonName}`).innerText === 'Start') {
    document.querySelector(`.${buttonName}`).innerText = 'Stop';
  } else {
    document.querySelector(`.${buttonName}`).innerText = 'Start';
  }
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function simplify(numerator, denominator) {
  const commonDivisor = gcd(Math.abs(numerator), Math.abs(denominator));
  
  return [numerator / commonDivisor, denominator / commonDivisor];
}

let fractionSimplifyingInterval = null;

function fractionSimplifying() {
  const startBtn = document.querySelector('.fractionSimpl-start-button');
  const frac = document.querySelector('.fractionSimpl-frac');
  const searchBar = document.querySelector('.fractionSimpl-search-bar');

  if (startBtn.textContent !== 'Stop') {
    if (fractionSimplifyingInterval) {
      clearInterval(fractionSimplifyingInterval);
      fractionSimplifyingInterval = null;
    }

    frac.children[0].textContent = '';
    frac.children[1].textContent = '';
    searchBar.value = '';
    return;
  }

  if (fractionSimplifyingInterval) {
    clearInterval(fractionSimplifyingInterval);
    fractionSimplifyingInterval = null;
  }

  const makeQuestion = () => {
    const questionSelector = Math.random();
    let numerator;
    let denominator;

    if (questionSelector < 0.7) {
      const commonNum = Math.floor(Math.random() * 20) + 1;
      numerator = commonNum * (Math.floor(Math.random() * 10) + 1);
      denominator = commonNum * (Math.floor(Math.random() * 10) + 1);
    } else if (questionSelector < 0.85) {
      numerator = Math.floor(Math.random() * 199) + 1;
      denominator = Math.floor(Math.random() * 200) + 1;
    } else {
      let questionSelector2 = Math.random();
      if (questionSelector2 < 0.5) {
        denominator = Math.floor(Math.random() * 990) + 1;
      } else {
        denominator = Math.floor(Math.random() * 999) + 1;
      }
      numerator = Math.floor(Math.random() * 900) + 1;
    }

    frac.children[0].textContent = numerator;
    frac.children[1].textContent = denominator;

    [numerator, denominator] = simplify(numerator, denominator);

    if (denominator === 1) {
      return `${numerator}`;
    }
    
    return `${numerator}/${denominator}`;
  };

  let expectedAnswer = makeQuestion();

  const checkAnswer = () => {
    const input = searchBar.value.trim();
    if (input === expectedAnswer) {
      searchBar.value = '';
      expectedAnswer = makeQuestion();
    }
  };

  fractionSimplifyingInterval = setInterval(checkAnswer, 200);
}

function test(){
  if (document.querySelector('.fractionSimpl-start-button').textContent === 'Stop') {
    const fraction = document.querySelector('.fractionSimpl-frac');
    fraction.children[0].textContent = 2;
    fraction.children[1].textContent = 2;
  }
}
