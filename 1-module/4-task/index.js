/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  let toLowerStr = str.toLowerCase();

  if (
    toLowerStr.includes('1xbet') ||
    toLowerStr.includes('xxx')
  ) {
    return true;
  }

  return false;
}
