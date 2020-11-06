/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  let strArr = str.split('-');

  strArr.forEach((item, index) => {
    if (index > 0) {
      strArr[index] = item[0].toUpperCase() + item.slice(1);
    }
  });

  return strArr.join('');
}
