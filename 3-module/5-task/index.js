/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  const strArr = str.split(/[\s,]+/); // or split(',').join(' ').split(' ')
  const numberArr = strArr.filter(item => !isNaN(item));

  return {
    min: Math.min(...numberArr),
    max: Math.max(...numberArr)
  };
}
