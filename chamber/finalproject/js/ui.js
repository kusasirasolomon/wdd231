// ui.js
import items from './data.js';

// Select the container where items will be rendered
const itemsContainer = document.getElementById('items-container');

/**
 * Generate HTML markup for a single item.
 * @param {Object} item - The item object
 * @returns {string} - HTML string
 */
function generateItemHTML(item) {
  return `
    <article class="item-card" tabindex="0" aria-label="${item.title}">
      <img 
        src="${item.image}" 
        alt="Poster of ${item.title}" 
        loading="lazy" 
        width="300" height="450"
      />
      <div class="item-info">
        <h3>${item.title}</h3>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Year:</strong> ${item.year}</p>
        <p class="description">${item.description}</p>
      </div>
    </article>
  `;
}

/**
 * Render all items into the container.
 */
function renderItems() {
  if (!itemsContainer) {
    console.error('No container found with ID "items-container"');
    return;
  }
  // Map over items and join their HTML strings
  itemsContainer.innerHTML = items.map(generateItemHTML).join('');
}

// Call render on page load
document.addEventListener('DOMContentLoaded', renderItems);

export { renderItems };
