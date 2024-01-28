let playBtn = document.querySelectorAll(".playBtn");
let controlBtn = document.querySelector(".playControlBtn");
let controlBackBtn = document.querySelector(".backControlBtn");
let controlNextBtn = document.querySelector(".nextControlBtn");
let playedAudio = document.querySelector(".playedAudio");
let bar = document.getElementById("bar");
let isPlaying = false;
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

    else if (isPlaying) {
        pause(curr);
        audio.pause();
    }

    else if (audio) {
        play(curr);
    }
});

controlBackBtn.addEventListener("click", function () {
    if (!currentAudio) {
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
    if (!currentAudio) {
        currentAudio = playBtn[0].getAttribute("id");
    }

    if (Number(index) <= playBtn.length - 1) {
        index = currentAudio[0];
        if (currentAudio && Number(index) <= playBtn.length - 1) {
            playBtn[index].click();
        }
    }
})

bar.addEventListener("input", function (event) {
    if (audio) {
        let width = Number(bar.value);
        let timeStamp = (width / 100) * audio.duration;
        audio.currentTime = timeStamp;
    }
});




function handlePlay(btn) {
    if (!isPlaying || btn.getAttribute("id") !== currentAudio) {
        if (audio) {
            audio.pause();
            let prev = document.getElementById(currentAudio);
            pause(prev);
        }

        if (btn.getAttribute("id") !== currentAudio) {
            currentAudio = btn.getAttribute("id");
            let musicFile = "./assets/" + btn.getAttribute("id");
            audio = new Audio(musicFile);
            audio.load();
            playedAudio.textContent = findClosestH3Sibling(btn).textContent;
            play(btn);

            setInterval(function () {
                let percentage = (audio.currentTime / audio.duration) * 100;
                bar.value = percentage.toFixed(2);
                if (bar.value == 100) {
                    pause(btn);
                }
            }, 1000);
        }

        else {
            play(btn);
        }
    }

    else {
        pause(btn);
        audio.pause();
    }

}


function play(btn) {
    audio.play();
    btn.innerHTML = `<i class="fa-regular fa-circle-pause"></i>`;
    controlBtn.innerHTML = `<i class="fa-regular fa-circle-pause"></i>`;
    isPlaying = true;
}

function pause(btn) {
    btn.innerHTML = `<i class="fa-regular fa-circle-play"></i>`;
    controlBtn.innerHTML = `<i class="fa-regular fa-circle-play"></i>`;
    isPlaying = false;
}


function findClosestH3Sibling(element) {
    // Iterate through the previous siblings
    while (element.previousElementSibling) {
        element = element.previousElementSibling;

        // Check if the sibling is an h3 element
        if (element.classList.contains('musicTitle')) {
            return element;
        }
    }

    // If no h3 sibling is found, return null
    return null;
}

