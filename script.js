const crosswordContainer = document.getElementById('crossword');
const cluesList = document.getElementById('clues-list');

// Vẽ ô từ matrix
crosswordMatrix.forEach((row, rowIndex) => {
  row.forEach((cell, colIndex) => {
    const div = document.createElement('div');
    div.classList.add('cell');

    if (cell === "" || cell === " ") {
      div.style.backgroundColor = "black";
    } else {
      const input = document.createElement('input');
      input.setAttribute('maxlength', 1);
      input.dataset.answer = isNaN(cell) ? cell.toUpperCase() : ""; // Nếu là số, không có answer
      div.appendChild(input);

      // Nếu là số, hiển thị số nhỏ góc
      if (!isNaN(cell)) {
        const number = document.createElement('div');
        number.classList.add('cell-number');
        number.textContent = cell;
        div.appendChild(number);
      }
    }

    crosswordContainer.appendChild(div);
  });
});

// Hiển thị gợi ý
Object.entries(hints).forEach(([key, clue]) => {
  const li = document.createElement('li');
  li.textContent = `${key}. ${clue}`;
  cluesList.appendChild(li);
});

// Kiểm tra real-time
crosswordContainer.addEventListener('input', (e) => {
  if (e.target.tagName === "INPUT") {
    const input = e.target;
    const answer = input.dataset.answer;

    if (answer && input.value.toUpperCase() === answer) {
      input.parentElement.classList.add('correct');
      input.parentElement.classList.remove('incorrect');
    } else if (input.value) {
      input.parentElement.classList.add('incorrect');
      input.parentElement.classList.remove('correct');
    } else {
      input.parentElement.classList.remove('correct', 'incorrect');
    }
  }
});

// Submit
document.getElementById('submit').addEventListener('click', () => {
  takeScreenshot();
  triggerWinAnimation(true);
  alert('Game submitted!');
});

// Reset
document.getElementById('reset').addEventListener('click', () => {
  location.reload();
});

// Win Animation
function triggerWinAnimation(isVictory = true) {
  const body = document.querySelector('body');
  const fireworks = document.createElement('div');
  fireworks.className = 'fireworks';
  fireworks.innerHTML = isVictory ? "🎉🎉 Congratulations! 🎉🎉" : "⏰ Time's Up!";
  body.appendChild(fireworks);

  setTimeout(() => {
    fireworks.remove();
  }, 5000);
}
