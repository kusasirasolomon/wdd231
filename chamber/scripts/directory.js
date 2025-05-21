// directory.js
document.addEventListener('DOMContentLoaded', () => {
    // Load member data
    async function getMembers() {
        try {
            const response = await fetch('data/members.json');
            const data = await response.json();
            displayMembers(data.companies);
        } catch (error) {
            console.error('Error loading member data:', error);
        }
    }

    // Display members
    function displayMembers(members) {
        const container = document.getElementById('members-container');
        container.innerHTML = '';
        
        members.forEach(member => {
            const card = document.createElement('div');
            card.className = 'member-card';
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} logo">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Website</a>
                <p>Membership Level: ${getMembershipLevel(member.level)}</p>
            `;
            container.appendChild(card);
        });
    }

    // Toggle between views
    document.getElementById('grid-view').addEventListener('click', () => {
        document.getElementById('members-container').className = 'grid-view';
    });

    document.getElementById('list-view').addEventListener('click', () => {
        document.getElementById('members-container').className = 'list-view';
    });

    // Helper function for membership level
    function getMembershipLevel(level) {
        const levels = {
            1: 'Member',
            2: 'Silver',
            3: 'Gold'
        };
        return levels[level] || 'Member';
    }

    // Footer information
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;

    // Initialize
    getMembers();
});