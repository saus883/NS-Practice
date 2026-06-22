function toggleSkillPage(functionName, title) {
  togglePage('skillPage');
  document.querySelector('.skill-title').innerHTML = title;
  document.querySelector('.skill-title').setAttribute('data-question', functionName);
}

let fractionSimplifyingInterval = null;
function fractionSimplifying() {
  const startBtn = document.querySelector('.skill-start-button');
  const generatorContainer = document.querySelector('.skill-generator-container');
  const searchBar = document.querySelector('.skill-search-bar');

  if (startBtn.textContent !== 'Stop') {
    if (fractionSimplifyingInterval) {
      clearInterval(fractionSimplifyingInterval);
      fractionSimplifyingInterval = null;
    }
    generatorContainer.innerHTML = '';
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

    generatorContainer.innerHTML = `<p>\\(\\frac{${numerator}}{${denominator}}\\)</p>`;
    MathJax.typeset();

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
  const startBtn = document.querySelector('.skill-start-button');
  const generatorContainer = document.querySelector('.skill-generator-container');
  const searchBar = document.querySelector('.skill-search-bar');

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

    if (questionSelector < 0.75) {
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

let decimalToFractionInterval = null;
function decimalToFraction() {
  const startBtn = document.querySelector('.skill-start-button');
  const generatorContainer = document.querySelector('.skill-generator-container');
  const searchBar = document.querySelector('.skill-search-bar');

  if (startBtn.textContent !== 'Stop') {
    if (decimalToFractionInterval) {
      clearInterval(decimalToFractionInterval);
      decimalToFractionInterval = null;
    }
    generatorContainer.textContent = '';
    searchBar.value = '';
    return;
  }

  function makeQuestion() {
    const questionSelector = Math.random();
    let denominator;
    let numerator;

    if (questionSelector < 0.1) {
      denominator = 6;
      numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
    } else if (questionSelector < 0.2) {
      denominator = 7;
      numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
    } else if (questionSelector < 0.3) {
      denominator = 8;
      numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
    } else if (questionSelector < 0.4) {
      denominator = 9;
      numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
    } else if (questionSelector < 0.5) {
      denominator = 11;
      numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
    } else if (questionSelector < 0.6) {
      denominator = 12;
      numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
    } else if (questionSelector < 0.7) {
      denominator = 15;
      numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
    } else if (questionSelector < 0.8) {
      denominator = 16;
      numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
    }
    
    [numerator, denominator] = simplify(numerator, denominator);
    const decimal = Math.trunc((numerator / denominator) * Math.pow(10, 6)) / Math.pow(10, 6);
    generatorContainer.textContent = decimal.toString();
    
    return `${numerator}/${denominator}`;
  }
  let expectedAnswer = makeQuestion();

  const checkAnswer = () => {
    const input = searchBar.value.trim();
    if (input === expectedAnswer) {
      searchBar.value = '';
      expectedAnswer = makeQuestion();
    }
  };
  decimalToFractionInterval = setInterval(checkAnswer, 200);
}

let addSubtractManyNumbersInterval = null;
function addSubtractManyNumbers() {
  const startBtn = document.querySelector('.skill-start-button');
  const problemContainer = document.querySelector('.skill-generator-container');
  const userInput = document.querySelector('.skill-search-bar');

  if (startBtn.textContent !== 'Stop') {
    if (addSubtractManyNumbersInterval) {
      clearInterval(addSubtractManyNumbersInterval);
      addSubtractManyNumbersInterval = null;
    }
    problemContainer.textContent = '';
    userInput.value = '';
    return;
  }

  function makeQuestion() {
    let array = [];
    for (let i = 0; i < 6; i++) {
      array.push(Math.floor(Math.random() * 50) + 1);
    }
    let arrayOp = [];
    for (let i = 0; i < 5; i++) {
      arrayOp.push(Math.random() < 0.5 ? '+' : '-');
    }

    sum = 0;
    for (let i = 0; i < 6; i++) {
      if (i === 0) {
        problemContainer.innerHTML += `<p>${array[0]}</p>`;
        sum += array[0];
      } else {
        problemContainer.innerHTML += `<p> ${arrayOp[i - 1]} ${array[i]}</p>`;
        sum = arrayOp[i - 1] === '+' ? sum + array[i] : sum - array[i];
      }
    }
    return sum;
  }
  let answer = makeQuestion();

  addSubtractManyNumbersInterval = setInterval(() => {
    if (userInput.value.trim() === answer.toString()) {
      userInput.value = '';
      problemContainer.textContent = '';
      answer = makeQuestion();
    }
  }, 200);
}