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

  let mixedFraction = '' + (Math.floor(answer)) + ' ' + (math.format(math.fraction(answer - Math.floor(answer), { fraction: 'ratio' })));
  answers.push(mixedFraction);
  
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
  // 1. Get the full decimal string representation
  const numStr = (numerator / denominator).toString();
  
  // 2. Regex looks for any digit (\d) that repeats immediately (\1+)
  const match = numStr.match(/(\d)\1+/);
  
  if (match) {
    // Find where the repeating sequence starts in the string
    const repeatDigitIndex = numStr.indexOf(match[0]);
    
    // Slice up to the first repeating digit, plus 3 occurrences of it
    return numStr.slice(0, repeatDigitIndex + 3);
  }
  
  // Return original if no repeating digits are found
  return numStr; 
}