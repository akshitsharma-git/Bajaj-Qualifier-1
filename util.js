function toInteger(value) {
  const num = Number(value);
  if (!Number.isInteger(num)) {
    throw new Error('Value must be an integer');
  }
  return num;
}

function sanitizeArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('Input must be a non-empty array');
  }
  return arr.map(toInteger);
}

function fibonacci(n) {
  n = toInteger(n);

  if (n < 0 || n > 1000) {
    throw new Error('Invalid fibonacci input');
  }

  const result = [];
  let a = 0;
  let b = 1;

  for (let i = 0; i < n; i++) {
    result.push(a);
    [a, b] = [b, a + b];
  }

  return result;
}

function isPrime(num) {
  if (num < 2) return false;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }

  return true;
}

function primeFilter(arr) {
  const numbers = sanitizeArray(arr);
  return numbers.filter(isPrime);
}

function gcd(a, b) {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function hcf(arr) {
  const numbers = sanitizeArray(arr);
  return numbers.reduce((acc, val) => gcd(acc, val));
}

function lcm(arr) {
  const numbers = sanitizeArray(arr);

  return numbers.reduce((acc, val) => {
    if (val === 0) {
      throw new Error('LCM with zero is not allowed');
    }
    return Math.abs(acc * val) / gcd(acc, val);
  });
}

module.exports = {
  fibonacci,
  primeFilter,
  hcf,
  lcm
};