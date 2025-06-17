// scripts/formHandler.mjs

const form = document.getElementById('contact-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Save form data to localStorage
  localStorage.setItem('contactFormData', JSON.stringify(data));

  // Redirect to form action page to display submission
  window.location.href = 'form-action.html';
});
