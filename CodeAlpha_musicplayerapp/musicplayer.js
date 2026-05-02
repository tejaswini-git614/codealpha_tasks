const songs = [
    { title: "Attention", artist: "Charlie puth", src: "songs/Attention.mp3" },
    { title: "Buttabomma", artist: "Armaan malik", src: "songs/Buttabomma.mp3" },
    { title: "Dracula", artist: "Tame impala and kim jennie", src: "songs/Dracula.mp3" },
    { title: "Gehra hua", artist: "Arijit singh", src: "songs/Gehra hua.mp3" },
    { title: "Inthandham", artist: "S.P. Charan", src: "songs/Inthandham.mp3" },
    { title: "Oorum blood", artist: "Sai abhyankar", src: "songs/Oorum blood.mp3" }
];

let index = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const playlistDiv = document.getElementById("playlist");

function loadSong(i) {
    const song = songs[i];
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
}

function playSong() {
    audio.play();
}

function pauseSong() {
    audio.pause();
}

function nextSong() {
    index = (index + 1) % songs.length;
    loadSong(index);
    playSong();
}

function prevSong() {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
    playSong();
}


const playBtn = document.getElementById("play");

playBtn.onclick = () => {
    if (audio.paused) {
        playSong();
        playBtn.innerText = "⏸";
        playBtn.classList.add("active");
    } else {
        pauseSong();
        playBtn.innerText = "▶️";
        playBtn.classList.remove("active");
    }
};
document.getElementById("next").onclick = nextSong;
document.getElementById("prev").onclick = prevSong;


audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    current.innerText = formatTime(audio.currentTime);
    duration.innerText = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});


volume.addEventListener("input", () => {
    audio.volume = volume.value;
});


audio.addEventListener("ended", nextSong);

function formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    let m = Math.floor(sec / 60);
    let s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
    }


songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.innerText = `${song.title} - ${song.artist}`;
    div.onclick = () => {
        index = i;
        loadSong(index);
        playSong();
    };
    playlistDiv.appendChild(div);
});


loadSong(index);
volume.value = 0.5;
audio.volume = 0.5;
