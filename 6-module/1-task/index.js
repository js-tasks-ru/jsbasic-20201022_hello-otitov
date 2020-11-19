/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
  elem;

  constructor(rows = []) {
    this.rows = rows;
    this.render();
    this.addEventListener();
  }

  get template() {
    const rows = this.rows.map(row => {
      return this.rowTemlate(row);
    }).join('');

    return `
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }

  rowTemlate(row) {
    return `
      <tr>
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.salary}</td>
        <td>${row.city}</td>
        <td><button>X</button></td>
      </tr>
    `
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;

    this.elem = element.firstElementChild;
  }

  addEventListener() {
    const rows = this.elem.querySelectorAll('tbody > tr');

    rows.forEach(element => {
      element.addEventListener('click', (event) => {
        if (event.target.tagName == 'BUTTON') {
          event.currentTarget.remove();
        }
      });
    });
  }
}
