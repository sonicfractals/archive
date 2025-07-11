
// toggle collapse of specified content
function toggleContent(content) {
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
  }
}

// collapse all open content
function collapseAllOpenContent() {
  const colls = document.getElementsByClassName('collapsible');
  for (const coll of colls) {
    if (coll.classList.contains('active')) {
      coll.classList.remove('active');
      toggleContent(coll.nextElementSibling);
    }
  }
}

const colls = document.getElementsByClassName('collapsible');
for (const coll of colls) {
  coll.addEventListener('click', function() {
    if (!this.classList.contains('active')) {
      collapseAllOpenContent();
    }
    this.classList.toggle('active');
    toggleContent(this.nextElementSibling);
  });
}




//This is where the collapsidìble code ends and the audio code starts.


const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause-button");
const volumeControl = document.getElementById("volume-control");
const progressBar = document.getElementById("progress-bar");
const currentTimeDisplay = document.getElementById("current-time");
const totalTimeDisplay = document.getElementById("total-time");

let isPlaying = false;

playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = "Play";
    } else {
        audio.play();
        playPauseButton.textContent = "Pause";
    }
    isPlaying = !isPlaying;
});

volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);

    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;

    const progress = (currentTime / duration) * 100;
    progressBar.style.width = `${progress}%`;
});