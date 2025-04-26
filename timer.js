let timeLeft = 600;
const timerDisplay = document.getElementById('timer');

const countdown = setInterval(() => {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  if (timeLeft <= 60) {
    timerDisplay.style.color = 'red';
    timerDisplay.style.animation = 'blink 1s infinite';
  }

  if (timeLeft <= 0) {
    clearInterval(countdown);
    alert("Time's up!");
    takeScreenshot();
  }

  timeLeft--;
}, 1000);
