// Helper function to find the Greatest Common Divisor
function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);

  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }

  return a;
}

function simplify(numerator, denominator) {
  const commonDivisor = gcd(Math.abs(numerator), Math.abs(denominator));
  
  return [numerator / commonDivisor, denominator / commonDivisor];
}

function fracAnswer(answer) { //returns an array containing decimal, fraction, and mixed fraction versions of the answer
  let decimalLength = answer.toString().split('.')[1]?.length || 0;
  let answers = [];
  if (decimalLength <= 6) {
    answers.push(answer);
  }

  answers.push(math.format(math.fraction(answer), { fraction: 'ratio' }));

  if (answer > 0) {
    let mixedFraction = '' + (math.floor(answer)) + ' ' + (math.format(math.fraction(answer - Math.floor(answer)), { fraction: 'ratio' }));
    answers.push(mixedFraction);
  } else if (answer < 0) {
    let mixedFraction = '-' + (math.floor(math.abs(answer))) + ' ' + (math.format(math.fraction(answer*-1 - Math.floor(math.abs(answer))), { fraction: 'ratio' }));
    answers.push(mixedFraction);
  }

  return answers;
}

function checkDecimalType(numerator, denominator) {
  if (denominator === 0) throw new Error("Denominator cannot be zero.");

  // Step 1: Simplify the fraction by dividing by the GCD
  const commonDivisor = gcd(numerator, denominator);
  let simplifiedDenominator = Math.abs(denominator / commonDivisor);

  // Step 2: Remove all factors of 2
  while (simplifiedDenominator % 2 === 0) {
      simplifiedDenominator /= 2;
  }

  // Step 3: Remove all factors of 5
  while (simplifiedDenominator % 5 === 0) {
      simplifiedDenominator /= 5;
  }

  // Step 4: If the remaining denominator is 1, it terminates
  if (simplifiedDenominator === 1) {
      return 'Terminating';
  } else {
      return 'Repeating';
  }
}

function terminateRepeatingDecimal(numerator, denominator) {
  if (denominator === 0) throw new Error("Denominator cannot be zero.");

  const negative = (numerator < 0) !== (denominator < 0);
  numerator = Math.abs(numerator);
  denominator = Math.abs(denominator);

  const integerPart = Math.floor(numerator / denominator);
  let remainder = numerator % denominator;

  if (remainder === 0) {
    return `${negative ? "-" : ""}${integerPart}`;
  }

  const digits = [];
  const seenRemainders = new Map();

  while (remainder !== 0 && !seenRemainders.has(remainder)) {
    seenRemainders.set(remainder, digits.length);
    remainder *= 10;
    digits.push(Math.floor(remainder / denominator));
    remainder %= denominator;
  }

  const decimalDigits = digits.join("");
  const repeatingStart = seenRemainders.get(remainder) ?? 0;
  const nonRepeatingPart = decimalDigits.slice(0, repeatingStart);
  const repeatingPart = decimalDigits.slice(repeatingStart);

  if (remainder === 0) {
    return `${negative ? "-" : ""}${integerPart}`;
  }

  if (repeatingPart.length > 7) {
    return `${negative ? "-" : ""}${integerPart}.${nonRepeatingPart}${repeatingPart}`;
  }

  let decimalExpansion = `${nonRepeatingPart}${repeatingPart}`;
  while (decimalExpansion.length < 7) {
    decimalExpansion += repeatingPart;
  }

  return `${negative ? "-" : ""}${integerPart}.${decimalExpansion.slice(0, 7)}`;
}

function decimalFormat(answer) { //removes 0 before a decimal if answer is between -1 and 1
  let array = answer.toString().split('.');
  let newAnswer = '';
  
  if (array[0] === '0' || array[0] === '-0') {
    newAnswer = array[0] === '0' ? '.' + array[1] : '-.' + array[1];
    return newAnswer;
  }

  return answer;
}