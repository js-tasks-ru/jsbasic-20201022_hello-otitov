/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
  for (let row of table.rows) {
    row.cells[row.rowIndex].style.backgroundColor = 'red';
  }
  
  // for (let i = 0; i < table.rows.length; i++){
  //   table.rows[i].cells[i].style.backgroundColor = 'red';
  // }
  // [...table.rows].forEach((tr, index) => {
  //   tr.cells[index].style.backgroundColor = 'red';
  // });
}
