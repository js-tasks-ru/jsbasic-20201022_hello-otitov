/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  const ageIndex = 1;
  const genderIndex = 2;
  const statusIndex = 3;
  
  for (let row of table.rows) {
    switch (row.cells[statusIndex].dataset?.available) {
      case 'true':
        row.classList.add('available');
        break;
      case 'false':
        row.classList.add('unavailable');
        break;
      default:
        row.hidden = true;
        break;
    }
    
    switch (row.cells[genderIndex].innerText) {
      case 'f':
        row.classList.add('female');
        break;
      case 'm':
        row.classList.add('male');
        break;
      default:
        break;
    }

    if (+row.cells[ageIndex].innerText < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}
