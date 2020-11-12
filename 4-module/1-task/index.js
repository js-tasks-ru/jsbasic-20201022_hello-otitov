/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  const ulEl = document.createElement('ul');

  friends.forEach(friend => {
    let liEl = document.createElement('li');
    liEl.innerHTML = `${friend.firstName} ${friend.lastName}`;
    ulEl.append(liEl);
  });

  return ulEl;
}
