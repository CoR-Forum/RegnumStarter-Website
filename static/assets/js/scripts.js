const video = document.querySelector('video');
video.volume = 0.3;
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
