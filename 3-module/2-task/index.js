/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @returns {number[]}
 */
function filterRange(arr, a, b) {
  a = a || 0;
  b = b || arr.length - 1;

  return arr.filter(item => (item >= a && item <= b));
}
