/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  let toLowerStr = str.toLowerCase();

  if (
    ~toLowerStr.indexOf('1xbet') ||
    ~toLowerStr.indexOf('xxx')
  ) {
    return true;
  }

  return false;
}
