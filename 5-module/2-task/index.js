function toggleText() {
  const btnEl = document.querySelector('.toggle-text-button');
  const textEl = document.getElementById('text');

  btnEl.addEventListener('click', function() {
    textEl.toggleAttribute('hidden');
  });
}
