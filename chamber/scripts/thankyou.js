// thankyou.js

// Function to get URL query parameters
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    firstName: params.get('fname') || '',
    lastName: params.get('lname') || '',
    email: params.get('email') || '',
    phone: params.get('phone') || '',
    business: params.get('organization') || '',
    timestamp: params.get('timestamp') || '',
  };
}

// Format timestamp to readable date/time string
function formatTimestamp(ts) {
  if (!ts) return '';
  const date = new Date(ts);
  if (isNaN(date.getTime())) return '';  // invalid date check
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

// Populate page with data
function populateThankYouPage() {
  const data = getQueryParams();

  // Set greeting text
  const greetingEl = document.getElementById('greeting');
  if (greetingEl) {
    greetingEl.textContent = data.firstName ? `Thank you, ${data.firstName}!` : 'Thank you for joining!';
  }

  // Set submission details
  const fields = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    business: data.business,
    timestamp: formatTimestamp(data.timestamp),
  };

  for (const [id, value] of Object.entries(fields)) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }
}

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', populateThankYouPage);
