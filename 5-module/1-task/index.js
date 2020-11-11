function hideSelf() {
  const btn = document.querySelector('.hide-self-button');
  btn.addEventListener('click', (event) => {
    return event.target.hidden = true;
  });
}
