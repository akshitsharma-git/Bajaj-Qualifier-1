function getFibonacci(n) {
  const num = Number(n);
  if (!Number.isInteger(num) || num < 0 || num > 1000) {
    throw new Error('Invalid fibonacci input');
  }

  const res = [];
  let a = 0, b = 1;
  for (let i = 0; i < num; i++) {
    res.push(a);
    [a, b] = [b, a + b];
  }
  return res;
}

function getPrimes(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('Invalid prime input');
  }

  return arr
    .map(Number)
    .filter(n => Number.isInteger(n) && n > 1)
    .filter(n => {
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
      }
      return true;
    });
}

function gcd(a, b) {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function getHCF(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('Invalid hcf input');
  }
  return arr.map(Number).reduce((a, b) => gcd(a, b));
}

function getLCM(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('Invalid lcm input');
  }
  return arr.map(Number).reduce((a, b) => Math.abs(a * b) / gcd(a, b));
}

module.exports = {
  getFibonacci,
  getPrimes,
  getHCF,
  getLCM
};