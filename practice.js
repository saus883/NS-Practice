/*
  Toggling Practice Page
*/

const explanations = {
  cubicRootABC_explanation: '\\(\\text{For a cubic formula } ax^3 + bx^2 + cx + d\\text{ with roots P, Q, and R, [P + Q][Q + R][P + R] is equal to }\\frac{ad - bc}{a^2}\\text{.}\\)',
  doubleIntegralAddSubtract_explanation: '\\(\\text{If the lower limit of each integral is a and c respectively and the upper limit is b and d, then the answer is }\\frac{(b-a)*(d-c)*(a + b + c + d)}{2} \\text{ if you are adding or }\\frac{(b-a)*(d-c)*(c + d - a - b)}{2}\\text{if you are subtracting.}\\)',
  determinant3x3_explanation: 'Go to this <a href="https://www.geeksforgeeks.org/engineering-mathematics/trick-to-calculate-determinant-of-a-3x3-matrix/" target="_blank">website</a>.',
};

function togglePracticePage(functionName, title, explanationName) {
  togglePage('practice-individual-page');
  document.getElementById('practice-title').innerHTML = title;
  document.getElementById('practice-title').setAttribute('data-question', functionName);
  explanations.explanationName;

  if (explanationName in explanations) {
    document.getElementById('question-explanation').style.display = 'inline';
    document.getElementById('question-explanation').innerHTML = explanations[explanationName];
    MathJax.typeset();
  } else {
    document.getElementById('question-explanation').style.display = 'none';
  }
}



/*
  Practice Maker
*/

let practiceInterval = null;
function practiceMaker(practiceName) {
  const problemContainer = document.getElementById('practice-problem-container');
  const startBtn = document.getElementById('practice-start-button');
  const userInput = document.getElementById('practice-input');

  if (startBtn.textContent !== 'Stop') {
    if (practiceInterval) {
      clearInterval(practiceInterval);
      practiceInterval = null;
    }
    problemContainer.innerHTML = '';
    userInput.value = '';
    return;
  }

  if (practiceInterval) {
    clearInterval(practiceInterval);
    practiceInterval = null;
  }

  let answer = window[practiceName](problemContainer);

  const checkAnswer = () => {
    const input = userInput.value.trim();
    if (Array.isArray(answer)) {
      const answers = answer.map((item) => item.toString());
      if (answers.includes(input)) {
        userInput.value = '';
        answer = window[practiceName](problemContainer);  
      }
    } else if (input === String(answer)) {
      userInput.value = '';
      answer = window[practiceName](problemContainer);
    }
  }

  practiceInterval = setInterval(checkAnswer, 200);
}



/*
  Practice Questions
*/

//asks the user to simplify the numerator and denominator of fractions
function fractionSimplifying(problemContainer) {
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

  problemContainer.innerHTML = `<p>\\(\\frac{${numerator}}{${denominator}}\\)</p>`;
  MathJax.typeset();

  return fracAnswer(numerator / denominator);
}
//asks the user to either find the square of 1-60 or cube of 1-20
function squaresCubes(problemContainer) {
  const questionSelector = Math.random();

  if (questionSelector < 0.75) {
    const square = Math.floor(Math.random() * 60) + 1;
    problemContainer.innerHTML = `${square}²`;
    return Math.pow(square, 2);
  } else {
    const cube = Math.floor(Math.random() * 20) + 1;
    problemContainer.innerHTML = `${cube}³`;
    return Math.pow(cube, 3);
  }
}
//generates a repeating decimal and asks the user to convert that into a fraction
function decimalToFraction(problemContainer) {

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
  problemContainer.textContent = decimal.toString();
  
  return `${numerator}/${denominator}`;
  
}
//generates several numbers and asks the user for their sum
function addSubtractNumbers(problemContainer) {
  return [q1, q2][Math.floor(Math.random() * 2)](problemContainer);

  function addSubtractManyNumbers(problemContainer) {
    
  }
}
//generates a cubic equation and asks the user for [a + b][b + c][a + c], where a, b, and c are the roots
function cubicRootABC(problemContainer) {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const c = Math.floor(Math.random() * 10) + 1;
  const d = Math.floor(Math.random() * 10) + 1;
  problemContainer.innerHTML = `<p>Find [a + b][b + c][a + c] of ${a}x³ + ${b}x² + ${c}x + ${d}, where a, b, and c are roots</p>`;
  let num = (a * d) - (b * c);
  let den = a * a;
  return fracAnswer(num / den);
}
//generates a 3x3 matrix and asks the user for its determinant
function determinant3x3(problemContainer) {
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

  problemContainer.innerHTML =  `Find the determinant of the following matrix: 
                                $$\\begin{bmatrix}
                                ${matrix[0][0]} & ${matrix[0][1]} & ${matrix[0][2]} \\\\
                                ${matrix[1][0]} & ${matrix[1][1]} & ${matrix[1][2]} \\\\
                                ${matrix[2][0]} & ${matrix[2][1]} & ${matrix[2][2]}
                                \\end{bmatrix}$$`;
  
  MathJax.typeset();

  const determinant = matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) - matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
    matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);
  return determinant;
}
//generates a double integral and asks the user to either add or subtract it
function doubleIntegralAddSubtract(problemContainer) {
  const a = Math.floor(Math.random() * 5) + 1;
  const b = Math.floor(Math.random() * 5) + 1 + a;
  const c = Math.floor(Math.random() * 5) + 1;
  const d = Math.floor(Math.random() * 5) + 1 + c;
  const sign = Math.random() < 0.5 ? '+' : '-';
  
  problemContainer.innerHTML = `\\(\\displaystyle \\int_{${a}}^{${b}} \\int_{${c}}^{${d}} (x ${sign} y) dx dy\\)`;
  MathJax.typeset();
  
  if (sign === '+') {
    return fracAnswer((b-a)*(d-c)*(a + b + c + d) / 2);
  } else {
    return fracAnswer((b-a)*(d-c)*(c + d - a - b) / 2);
  }
}
//converting bases
function convertingBases(problemContainer) {
  return q28(problemContainer);
}
//dividing numbers in non-10 bases and finding the remainder
function dividingBases(problemContainer) {
  return q46(problemContainer);
}
//fractions with denominators of 99, 999, 90, 990, and 900
function den90fraction(problemContainer) {
  return q38(problemContainer);
}
//multiply a 3 digit number by a 2 digit number
function multiplication3x2(problemContainer) {
  return q14(problemContainer);
}
//multiplication and division estimation
function estimateMultiplicationAndDivision(problemContainer) {
  return [q20, q20, q50][Math.floor(Math.random() * 3)](problemContainer);
}