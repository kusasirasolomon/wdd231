
const spotlightContainer = document.getElementById('spotlight-container');


async function getSpotlightMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Failed to fetch spotlight data');
    const data = await response.json();

    const eligible = data.members.filter(member => member.level === 2 || member.level === 3);
    const spotlights = pickRandom(eligible, 3); // Pick 2–3 members

    spotlightContainer.innerHTML = '';
    spotlights.forEach(member => {
      const section = document.createElement('section');
      section.classList.add('spotlight');

      section.innerHTML = `
        <img src="images/${member.image}" alt="Logo of ${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p class="level">${member.level === 3 ? 'Gold Member' : 'Silver Member'}</p>
      `;

      spotlightContainer.appendChild(section);
    });

  } catch (error) {
    console.error('Error loading spotlights:', error);
    spotlightContainer.innerHTML = `<p class="error">Spotlight members failed to load.</p>`;
  }
}

function pickRandom(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

getSpotlightMembers();
