// script.js

document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bgMusic");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const seekBar = document.getElementById("musicSeekBar");
  const seekProgress = document.getElementById("seekProgress");
  const timeDisplay = document.getElementById("timeDisplay");
  const volumeSlider = document.getElementById("volumeSlider");
  const themeToggle = document.getElementById("themeToggle");

  const playlist = [
    "arctic_monkeys_-_No._1_Party_Anthem_(FeelMP3.com).mp3",
    "Can-T-Help-Falling-In-Love.mp3",
    "nights_like_this.mp3","meri_banogi_kya.mp3"
  ];

  let currentTrack = 0;

  function loadTrack(index) {
    music.src = playlist[index];
    music.play();
    playPauseBtn.textContent = "Pause ⏸️";
  }

  loadTrack(currentTrack);

  volumeSlider.addEventListener("input", () => {
    music.volume = volumeSlider.value;
  });

  playPauseBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      playPauseBtn.textContent = "Pause ⏸️";
    } else {
      music.pause();
      playPauseBtn.textContent = "Play ▶️";
    }
  });

  prevBtn.addEventListener("click", () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
  });

  nextBtn.addEventListener("click", () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
  });

  music.addEventListener("timeupdate", () => {
    const progress = (music.currentTime / music.duration) * 100;
    seekBar.value = progress || 0;
    seekProgress.style.width = `${progress}%`;

    const formatTime = t => {
      const min = Math.floor(t / 60);
      const sec = Math.floor(t % 60).toString().padStart(2, "0");
      return `${min}:${sec}`;
    };

    timeDisplay.textContent = `${formatTime(music.currentTime)} / ${formatTime(music.duration || 0)}`;
  });

  seekBar.addEventListener("input", () => {
    const time = (seekBar.value / 100) * music.duration;
    music.currentTime = time;
  });

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
  });

  // Floating heart on click
  document.body.addEventListener("click", function (e) {
    const heart = document.createElement("div");
    heart.textContent = "💕";
    heart.style.position = "absolute";
    heart.style.left = e.pageX + "px";
    heart.style.top = e.pageY + "px";
    heart.style.fontSize = "24px";
    heart.style.pointerEvents = "none";
    heart.style.animation = "floatUp 2s ease-out forwards";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  });

  // Blinking Stars
  function createStars(count) {
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDuration = `${1 + Math.random() * 3}s`;
      star.style.opacity = Math.random();
      document.body.appendChild(star);
    }
  }

  createStars(100);
});
