document.addEventListener("DOMContentLoaded", () => {
  loadAttractions();
  showVisitMessage();
});

// Load cards from JSON
async function loadAttractions() {
  try {
    const response = await fetch("data/attractions.json");
    const data = await response.json();
    const container = document.querySelector(".card-container");

    data.forEach((item) => {
      const card = document.createElement("section");
      card.classList.add("card");

      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img src="${item.image}" alt="${item.name}">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading attractions:", error);
  }
}

// Show last visit message
function showVisitMessage() {
  const sidebar = document.querySelector(".sidebar");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();
  let message = "";

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const daysDiff = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
    if (daysDiff < 1) {
      message = "Back so soon! Awesome!";
    } else if (daysDiff === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${daysDiff} days ago.`;
    }
  }

  sidebar.innerHTML = `<p>${message}</p>`;
  localStorage.setItem("lastVisit", now);
}
