/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  let str = '';

  users.forEach((user, index) => {
    if (user.age <= age) {
      str += index > 0 ? '\n' : '';
      str += `${user.name}, ${user.balance}`;
    }
  });

  return str;
}
