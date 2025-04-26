const crosswordContainer = document.getElementById('crossword');
const cluesList = document.getElementById('clues-list');

// Tạo bảng ô chữ
function createCrossword() {
  crosswordMatrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const div = document.createElement('div');
      div.classList.add('cell');
      
      if (cell === " ") {
        div.style.backgroundColor = "#333";
      } else {
        const input = document.createElement('input');
        input.setAttribute('maxlength', 1);
        input.dataset.row = rowIndex;
        input.dataset.col = colIndex;
        
        // Chỉ set answer cho các ô chữ cái, không cho ô số
        if (isNaN(cell)) {
          input.dataset.answer = cell.toUpperCase();
        }
        
        // Thêm sự kiện focus để highlight các ô liên quan
        input.addEventListener('focus', () => highlightWord(rowIndex, colIndex));
        
        div.appendChild(input);
        
        // Hiển thị số gợi ý
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
}

// Display hints
function displayHints() {
  Object.entries(hints).forEach(([key, clue]) => {
    const li = document.createElement('li');
    const wordInfo = wordPositions[key];
    const direction = wordInfo.direction;
    
    // Format: number (across/down) - hint
    li.innerHTML = `<strong>${key}</strong> (${direction}): ${clue}`;
    li.dataset.number = key;
    
    // Add click event to focus on the corresponding word
    li.addEventListener('click', () => {
      if (wordInfo) {
        focusOnWord(wordInfo);
      }
    });
    
    cluesList.appendChild(li);
  });
}

// Focus vào từ dựa trên vị trí
function focusOnWord(wordInfo) {
  const { row, col } = wordInfo;
  const cell = document.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
  if (cell) {
    cell.focus();
  }
}

// Highlight từ đang được focus
function highlightWord(row, col) {
  // Xóa tất cả highlight cũ
  document.querySelectorAll('.cell').forEach(cell => {
    cell.classList.remove('highlighted');
  });
  
  // Tìm từ chứa ô này
  Object.values(wordPositions).forEach(word => {
    if (isPartOfWord(row, col, word)) {
      highlightWordCells(word);
    }
  });
}

// Kiểm tra xem ô có thuộc từ không
function isPartOfWord(row, col, wordInfo) {
  const { row: wordRow, col: wordCol, direction, length } = wordInfo;
  
  if (direction === "across" && row === wordRow && col >= wordCol && col < wordCol + length) {
    return true;
  }
  
  if (direction === "down" && col === wordCol && row >= wordRow && row < wordRow + length) {
    return true;
  }
  
  return false;
}

// Highlight các ô của từ
function highlightWordCells(wordInfo) {
  const { row, col, direction, length } = wordInfo;
  
  for (let i = 0; i < length; i++) {
    let cell;
    if (direction === "across") {
      cell = document.querySelector(`input[data-row="${row}"][data-col="${col + i}"]`);
    } else {
      cell = document.querySelector(`input[data-row="${row + i}"][data-col="${col}"]`);
    }
    
    if (cell) {
      cell.parentElement.classList.add('highlighted');
    }
  }
}

// Kiểm tra đáp án
crosswordContainer.addEventListener('input', (e) => {
  if (e.target.tagName === "INPUT") {
    const input = e.target;
    const answer = input.dataset.answer;
    
    if (answer && input.value.toUpperCase() === answer) {
      input.parentElement.classList.add('correct');
      input.parentElement.classList.remove('incorrect');
      
      // Kiểm tra hoàn thành từ
      checkWordCompletion();
    } else if (input.value) {
      input.parentElement.classList.add('incorrect');
      input.parentElement.classList.remove('correct');
    } else {
      input.parentElement.classList.remove('correct', 'incorrect');
    }
  }
});

// Kiểm tra hoàn thành từ
function checkWordCompletion() {
  const completedWords = [];
  
  Object.entries(wordPositions).forEach(([number, wordInfo]) => {
    if (isWordComplete(wordInfo)) {
      completedWords.push(number);
    }
  });
  
  // Cập nhật UI cho các từ hoàn thành
  completedWords.forEach(number => {
    const clueElement = document.querySelector(`#clues-list li[data-number="${number}"]`);
    if (clueElement) {
      clueElement.classList.add('completed');
    }
  });
  
  // Kiểm tra hoàn thành toàn bộ
  if (completedWords.length === Object.keys(wordPositions).length) {
    showVictory();
  }
}

// Kiểm tra xem từ đã hoàn thành chưa
function isWordComplete(wordInfo) {
  const { row, col, direction, length } = wordInfo;
  
  for (let i = 0; i < length; i++) {
    let cell;
    if (direction === "across") {
      cell = document.querySelector(`input[data-row="${row}"][data-col="${col + i}"]`);
    } else {
      cell = document.querySelector(`input[data-row="${row + i}"][data-col="${col}"]`);
    }
    
    if (!cell || !cell.parentElement.classList.contains('correct')) {
      return false;
    }
  }
  
  return true;
}

// Hiển thị thông báo chiến thắng
function showVictory() {
  const fireworks = document.createElement('div');
  fireworks.className = 'fireworks';
  fireworks.innerHTML = `
    🎉🎉 Tuyệt vời! 🎉🎉<br>
    Chúc mừng bạn đã hoàn thành ô chữ!
  `;
  document.body.appendChild(fireworks);
  
  // Thêm âm thanh chiến thắng
  const audio = new Audio('https://www.soundjay.com/misc/sounds/magic-chime-02.mp3');
  audio.play().catch(() => {});
  
  setTimeout(() => {
    fireworks.remove();
  }, 5000);
}

// Submit
document.getElementById('submit').addEventListener('click', () => {
  takeScreenshot();
  
  let correctCount = 0;
  document.querySelectorAll('.cell input').forEach(input => {
    if (input.parentElement.classList.contains('correct')) {
      correctCount++;
    }
  });
  
  const totalCells = document.querySelectorAll('.cell input').length;
  const percentage = (correctCount / totalCells * 100).toFixed(1);
  
  alert(`Bạn đã hoàn thành ${percentage}% ô chữ!`);
});

// Reset
document.getElementById('reset').addEventListener('click', () => {
  location.reload();
});

// Khởi tạo
createCrossword();
displayHints();