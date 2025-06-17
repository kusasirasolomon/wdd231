// Toggle navigation menu
const menuBtn = document.querySelector('#menuBtn');
const navMenu = document.querySelector('#navMenu');

menuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Dynamic copyright year
document.querySelector('#year').textContent = new Date().getFullYear();
