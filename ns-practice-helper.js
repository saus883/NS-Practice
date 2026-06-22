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

  answers.push(math.format(math.fraction(answer)));

  let mixedFraction = '' + (Math.floor(answer)) + ' ' + (math.format(math.fraction(answer - Math.floor(answer))));
  answers.push(mixedFraction);
  
  return answers;
}