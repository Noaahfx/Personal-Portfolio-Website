document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.getElementById("play-button");
    const audio = document.getElementById("audio");
    const seekBar = document.getElementById("seek-bar");

    if (playButton && audio && seekBar) {
        playButton.addEventListener("click", function () {
            if (audio.paused) {
                audio.play();
                playButton.textContent = "Pause";
                seekBar.style.display = "block";
            } else {
                audio.pause();
                playButton.textContent = "Play";
            }
        });

        audio.addEventListener("timeupdate", function () {
            seekBar.max = audio.duration;
            seekBar.value = audio.currentTime;
        });

        seekBar.addEventListener("input", function () {
            audio.currentTime = seekBar.value;
        });

        audio.addEventListener("play", function () {
            playButton.textContent = "Pause";
            seekBar.style.display = "block";
        });

        audio.addEventListener("pause", function () {
            playButton.textContent = "Play";
        });

        audio.addEventListener("ended", function () {
            playButton.textContent = "Noah";
            seekBar.style.display = "none";
            audio.currentTime = 0;
        });
    } else {
        console.error("One or more elements not found.");
    }
});
