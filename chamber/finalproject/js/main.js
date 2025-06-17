// main.js
import items from './data.js';
import './ui.js';


// Then use items array to dynamically generate content
console.log(items);


// Hamburger menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
  navToggle.setAttribute('aria-expanded', !expanded);
});

// Close nav menu on link click (mobile)
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    }
  });
});

// Modal handling
function setupModal(modalId, openBtnSelector, closeBtnSelector) {
  const modal = document.getElementById(modalId);
  const openBtn = document.querySelector(openBtnSelector);
  const closeBtn = modal.querySelector(closeBtnSelector);

  if (!modal || !openBtn || !closeBtn) return;

  // Open modal
  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    openBtn.focus();
  });

  // Close modal on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      openBtn.focus();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      openBtn.focus();
    }
  });
}

// Example usage: adjust selectors to your modal and buttons
// setupModal('exampleModal', '.open-modal-btn', '.modal-close');

// Local Storage Example: Save and load a simple preference
function savePreference(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadPreference(key) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

// Example: toggle dark mode (you can implement this on your site)
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
  // Load preference on page load
  if (loadPreference('darkMode')) {
    document.body.classList.add('dark-mode');
  }

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    savePreference('darkMode', document.body.classList.contains('dark-mode'));
  });
}

// Fetch example with try...catch
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    // You can display an error message on the page here
  }
}

// Example fetch call - adapt url to your JSON or API
// fetchData('data/movies.json').then(data => {
//   console.log(data);
//   // generate dynamic content here
// });

export {
  setupModal,
  fetchData,
  savePreference,
  loadPreference,
};

