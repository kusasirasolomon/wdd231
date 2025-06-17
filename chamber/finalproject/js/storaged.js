// storage.js

/**
 * Save data to localStorage as JSON string.
 * @param {string} key - The key under which data is saved
 * @param {any} value - The value to save (will be JSON-stringified)
 */
function saveToLocalStorage(key, value) {
  try {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

/**
 * Load and parse JSON data from localStorage.
 * @param {string} key - The key to retrieve
 * @returns {any|null} - Parsed object or null if not found or parse error
 */
function loadFromLocalStorage(key) {
  try {
    const jsonData = localStorage.getItem(key);
    if (!jsonData) return null;
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
}

/**
 * Remove an item from localStorage.
 * @param {string} key - The key to remove
 */
function removeFromLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}

export { saveToLocalStorage, loadFromLocalStorage, removeFromLocalStorage };
