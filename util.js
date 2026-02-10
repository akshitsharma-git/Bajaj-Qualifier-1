export const getFibonacci = (n) => {
    if (typeof n !== 'number' || n <= 0) return []; // edge cases
    if (n === 1) return [0];
    
    const sequence = [0, 1];
    while (sequence.length < n) {
        const nextVal = sequence[sequence.length - 1] + sequence[sequence.length - 2];
        sequence.push(nextVal);
    }
    return sequence;
};

export const getPrimes = (nums) => {
    if (!Array.isArray(nums)) return [];
    
    return nums.filter(num => {
        if (num < 2) return false; // optimization check
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    });
};

const findGcd = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        a %= b;
        [a, b] = [b, a];
    }
    return a;
};

export const getHCF = (numbers) => { 
    if (!Array.isArray(numbers) || numbers.length === 0) return 0; // Return 0 for invalid input
    return numbers.reduce((acc, curr) => findGcd(acc, curr));
};

export const getLCM = (numbers) => {
    if (!Array.isArray(numbers) || numbers.length === 0) return 0;
    
    return numbers.reduce((acc, curr) => {
        if (acc === 0 || curr === 0) return 0;
        return Math.abs(acc * curr) / findGcd(acc, curr);
    });
};