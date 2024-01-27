playBtn = document.querySelectorAll(".playBtn");
progressBar = document.querySelector(".bar");
progressBarContainer = document.querySelector(".progressBar");
isPlaying = false;

let audio = new Audio("./assets/1.mp3");
audio.load();

playBtn.forEach(btn => {
    btn.addEventListener("click", function () {
        if (!isPlaying) {
            playBtn.forEach(function (btn) {
                btn.innerHTML = `<i class="fa-regular fa-circle-pause"></i>`;
            });
            console.log("playing");
            audio.play();
            isPlaying = true;
            setInterval(function () {
                let percentage = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = `${percentage.toFixed(2)}%`;
            }, 1000);
        }

        else {
            console.log("pause");
            playBtn.forEach(function (btn) {
                btn.innerHTML = `<i class="fa-regular fa-circle-play"></i>`;
            });
            audio.pause();
            isPlaying = false;
        }
    })
});

progressBarContainer.addEventListener("click", function (event) {
    let rect = progressBarContainer.getBoundingClientRect();
    let offsetX = event.clientX - rect.left;

    let width = (offsetX / progressBarContainer.clientWidth) * 100;
    progressBar.style.width = `${width.toFixed(2)}%`;

    let timeStamp = (width.toFixed(2) / 100) * audio.duration;
    audio.currentTime = timeStamp;
});

