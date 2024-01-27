playBtn = document.querySelectorAll(".playBtn");
controlBtn = document.querySelector(".playControlBtn");
controlBackBtn = document.querySelector(".backControlBtn");
controlNextBtn = document.querySelector(".nextControlBtn");

let isPlaying = false;
progressBar = document.querySelector(".bar");
progressBarContainer = document.querySelector(".progressBar");
let audio;
let currentAudio;
let index = 0;

playBtn.forEach(btn => {
    btn.addEventListener("click", () => handlePlay(btn));
});

controlBtn.addEventListener("click", function () {
    let curr = document.getElementById(currentAudio);

    if (!currentAudio) {
        playBtn[0].click();
    }

    if (isPlaying) {
        pause(curr);
        audio.pause();
    }

    else if (audio) {
        audio.play();
        isPlaying = true;
        curr.innerHTML = `<i class="fa-regular fa-circle-pause"></i>`;
        controlBtn.innerHTML = `<i class="fa-regular fa-circle-pause"></i>`;
    }
});

controlBackBtn.addEventListener("click", function () {
    if(!currentAudio){
        currentAudio = playBtn[0].getAttribute("id");
    }

    if (Number(index) >= 0) {
        index = currentAudio[0] - 2;
        if (currentAudio && Number(index) >= 0) {
            playBtn[index].click();
        }
    }
})

controlNextBtn.addEventListener("click", function () {
    if(!currentAudio){
        currentAudio = playBtn[0].getAttribute("id");
    }

    if (Number(index) <= playBtn.length-1) {
        index = currentAudio[0];
        if (currentAudio && Number(index) <= playBtn.length-1) {
            playBtn[index].click();
        }
    }
})

progressBarContainer.addEventListener("click", function (event) {
    let rect = progressBarContainer.getBoundingClientRect();
    let offsetX = event.clientX - rect.left;

    let width = (offsetX / progressBarContainer.clientWidth) * 100;
    progressBar.style.width = `${width.toFixed(2)}%`;

    let timeStamp = (width.toFixed(2) / 100) * audio.duration;
    audio.currentTime = timeStamp;
});


function handlePlay(btn) {
    if (!isPlaying || btn.getAttribute("id") !== currentAudio) {
        if (audio) {
            audio.pause();
            let prev = document.getElementById(currentAudio);
            pause(prev);
        }
        currentAudio = btn.getAttribute("id");
        let musicFile = "./assets/" + btn.getAttribute("id");
        audio = new Audio(musicFile);
        audio.load();
        btn.innerHTML = `<i class="fa-regular fa-circle-pause"></i>`;
        controlBtn.innerHTML = `<i class="fa-regular fa-circle-pause"></i>`;
        audio.play();
        isPlaying = true;

        setInterval(function () {
            let percentage = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${percentage.toFixed(2)}%`;
        }, 1000);
    }

    else {
        pause(btn);
        audio.pause();
    }

}

function pause(btn) {
    btn.innerHTML = `<i class="fa-regular fa-circle-play"></i>`;
    controlBtn.innerHTML = `<i class="fa-regular fa-circle-play"></i>`;
    isPlaying = false;
}

