/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  if (n == 0 || n == 1) {
    return 1;
  }

  let i = n;
  while (i > 1) {
    n = n * (i - 1);
    i--;
  }

  return n;
}
