// helpers.js

/**
 * Create an element with optional classes and attributes.
 * @param {string} tag - The tag name (e.g., 'div', 'p')
 * @param {Object} options - Optional settings:
 *   - classes: array of class names
 *   - attrs: object of attribute key-value pairs
 *   - text: textContent for the element
 * @returns {HTMLElement}
 */
function createElement(tag, options = {}) {
  const el = document.createElement(tag);
  if (options.classes) {
    options.classes.forEach(cls => el.classList.add(cls));
  }
  if (options.attrs) {
    for (const [key, val] of Object.entries(options.attrs)) {
      el.setAttribute(key, val);
    }
  }
  if (options.text) {
    el.textContent = options.text;
  }
  return el;
}

/**
 * Format a date string or Date object to a readable format.
 * @param {string|Date} dateInput
 * @param {string} locale - Optional locale string, defaults to 'en-US'
 * @returns {string} formatted date
 */
function formatDate(dateInput, locale = 'en-US') {
  const date = (dateInput instanceof Date) ? dateInput : new Date(dateInput);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Safely fetch JSON data with error handling.
 * @param {string} url - The URL to fetch
 * @returns {Promise<Object|null>} - Parsed JSON or null on error
 */
async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

/**
 * Debounce function to limit how often a function can run.
 * Useful for resize or input events.
 * @param {Function} func - The function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function}
 */
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export { createElement, formatDate, fetchJSON, debounce };
