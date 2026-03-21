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
        denominator = 990;
      } else {
        denominator = 999;
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

let squaresCubesInterval = null;
function squaresCubes() {
  const startBtn = document.querySelector('.squaresCubes-start-button');
  const generatorContainer = document.querySelector('.squaresCubes-generator-container');
  const searchBar = document.querySelector('.squaresCubes-search-bar');

  if (startBtn.textContent !== 'Stop') {
    if (squaresCubesInterval) {
      clearInterval(squaresCubesInterval);
      squaresCubesInterval = null;
    }
    generatorContainer.textContent = '';
    searchBar.value = '';
    return;
  }

  function makeQuestion() {
    const questionSelector = Math.random();

    if (questionSelector < 0.5) {
      const square = Math.floor(Math.random() * 60) + 1;
      generatorContainer.textContent = `${square}²`;
      return Math.pow(square, 2);
    } else {
      const cube = Math.floor(Math.random() * 20) + 1;
      generatorContainer.textContent = `${cube}³`;
      return Math.pow(cube, 3);
    }
  }
  let answer = makeQuestion();

  squaresCubesInterval = setInterval(() => {
    if (searchBar.value.trim() === answer.toString()) {
      searchBar.value = '';
      answer = makeQuestion();
    }
  }, 200);
}