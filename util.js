function fibonacci(n) {
  if (!Number.isInteger(n) || n < 0 || n > 1000) {
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
  if (!Number.isInteger(num) || num < 2) return false;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }

  return true;
}

function primeFilter(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('Invalid prime input');
  }

  return arr.filter(isPrime);
}

function gcd(a, b) {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function hcf(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('Invalid hcf input');
  }

  return arr.reduce((acc, val) => gcd(acc, val));
}

function lcm(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('Invalid lcm input');
  }

  return arr.reduce((acc, val) => {
    if (!Number.isInteger(val)) {
      throw new Error('Invalid lcm input');
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