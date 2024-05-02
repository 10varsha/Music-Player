let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let currentTime = document.getElementById("current-time"); // Updated to match the HTML ID

// Update progress bar and current time display when the audio metadata is loaded
song.onloadedmetadata = function () {
    progress.max = song.duration;
    document.getElementById("duration").textContent = formatTime(song.duration); // Set duration text content
};

// Function to format time in MM:SS format
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Toggle play/pause and update progress bar and current time display
function playPause() {
    if (song.paused) {
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    } else {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
}

// Update progress bar and current time display continuously while the song is playing
song.ontimeupdate = function () {
    progress.value = song.currentTime;
    currentTime.textContent = formatTime(song.currentTime); // Updated to match the HTML ID
    if (song.currentTime >= song.duration) {
        song.pause(); // Pause the song if it reaches the end
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
};

// Seek to the specified time in the song when the user interacts with the progress bar
progress.oninput = function () {
    song.currentTime = progress.value;
};
