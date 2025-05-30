// scripts/directory.js

const memberContainer = document.getElementById('members-container');
const memberCountDisplay = document.getElementById('member-count');
const gridViewBtn = document.getElementById('grid-view-btn');
const listViewBtn = document.getElementById('list-view-btn');

async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Failed to load member data');
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error('Error fetching members:', error);
    memberContainer.innerHTML = '<p class="error">Unable to load business directory at this time.</p>';
  }
}

function displayMembers(members) {
  memberContainer.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('member-card');
    card.innerHTML = `
      
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;
    memberContainer.appendChild(card);
  });
  memberCountDisplay.textContent = members.length;
}

function toggleView(mode) {
  if (mode === 'grid') {
    memberContainer.classList.add('grid-view');
    memberContainer.classList.remove('list-view');
    gridViewBtn.classList.add('active');
    gridViewBtn.setAttribute('aria-pressed', 'true');
    listViewBtn.classList.remove('active');
    listViewBtn.setAttribute('aria-pressed', 'false');
  } else {
    memberContainer.classList.add('list-view');
    memberContainer.classList.remove('grid-view');
    listViewBtn.classList.add('active');
    listViewBtn.setAttribute('aria-pressed', 'true');
    gridViewBtn.classList.remove('active');
    gridViewBtn.setAttribute('aria-pressed', 'false');
  }
}

gridViewBtn.addEventListener('click', () => toggleView('grid'));
listViewBtn.addEventListener('click', () => toggleView('list'));

fetchMembers();