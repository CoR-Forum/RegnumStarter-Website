const video = document.querySelector('video');
video.volume = 0.3; // Set default volume to 30%

video.addEventListener('ended', () => {
    video.currentTime = 0;
    video.play();
});

video.addEventListener('error', (e) => {
    console.error('Error loading video:', e);
});

// Slideshow functionality
const previews = document.querySelectorAll('.preview');
let currentPreviewIndex = 0;

function showNextPreview() {
    previews[currentPreviewIndex].style.display = 'none';
    currentPreviewIndex = (currentPreviewIndex + 1) % previews.length;
    previews[currentPreviewIndex].style.display = 'flex';
}

setInterval(showNextPreview, 1500);
previews[currentPreviewIndex].style.display = 'flex'; // Show the first preview initially

document.getElementById('home-link').addEventListener('click', () => {
    document.getElementById('home-content').style.display = 'block';
    document.getElementById('changelog-content').style.display = 'none';
    document.getElementById('download-content').style.display = 'none';
});

document.getElementById('changelog-link').addEventListener('click', () => {
    document.getElementById('home-content').style.display = 'none';
    document.getElementById('changelog-content').style.display = 'block';
    document.getElementById('download-content').style.display = 'none';
});

document.getElementById('download-link').addEventListener('click', () => {
    document.getElementById('home-content').style.display = 'none';
    document.getElementById('changelog-content').style.display = 'none';
    document.getElementById('download-content').style.display = 'block';
});

document.getElementById('menu-toggle').addEventListener('click', () => {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
});

async function fetchConnectedUsers() {
    try {
        const response = await fetch('https://api.regnumstarter.cor-forum.de/v1');
        const data = await response.json();
        const connectedUsers = data.activity.connectedUsers;
        document.getElementById('connected-users').innerText = `Connected Users: ${connectedUsers}`;
    } catch (error) {
        console.error('Error fetching connected users:', error);
    }
}

// Call the function to fetch and display connected users
fetchConnectedUsers();

document.addEventListener('DOMContentLoaded', function() {
    fetch('assets/changelog.json')
        .then(response => response.json())
        .then(data => {
            const changelogContainer = document.getElementById('changelog-entries');
            const homeChangelogContainer = document.getElementById('home-changelog-entries');
            data.forEach(entry => {
                const entryDiv = document.createElement('div');
                entryDiv.classList.add('changelog-entry');
                entryDiv.innerHTML = `
                    <h3>Version ${entry.version} - ${entry.date}</h3>
                    ${entry.changes.map(change => `<p>${change}</p>`).join('')}
                `;
                changelogContainer.appendChild(entryDiv);
                homeChangelogContainer.appendChild(entryDiv.cloneNode(true));
            });
        })
        .catch(error => console.error('Error fetching changelog:', error));
});

// Remove the collapsible functionality
// const collapsibles = document.querySelectorAll('.collapsible');
// collapsibles.forEach((collapsible) => {
//     collapsible.addEventListener('click', function() {
//         this.classList.toggle('active');
//         const content = this.nextElementSibling;
//         if (content.style.display === 'block') {
//             content.style.display = 'none';
//         } else {
//             content.style.display = 'block';
//         }
//     });
// });