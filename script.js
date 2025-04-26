const crosswordContainer = document.getElementById('crossword');
const cluesList = document.getElementById('clues-list');

// Tạo bảng ô chữ với số và chữ riêng biệt
function createCrossword() {
  const crosswordContainer = document.getElementById('crossword');
  
  if (!crosswordContainer) {
    console.error('Crossword container not found!');
    return;
  }
  
  // Debug log
  console.log('Creating crossword with matrix:', crosswordMatrix);
  
  crosswordMatrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const div = document.createElement('div');
      div.classList.add('cell');
      
      const wordCell = wordMatrix[rowIndex][colIndex];
      
      if (cell === " " && wordCell === " ") {
        // Ô trống - tô màu nền
        div.style.backgroundColor = "#333";
      } else {
        // Tạo input cho tất cả các ô trắng (bao gồm cả ô có số)
        const input = document.createElement('input');
        input.setAttribute('maxlength', 1);
        input.dataset.row = rowIndex;
        input.dataset.col = colIndex;
        
        if (wordCell !== " ") {
          input.dataset.answer = wordCell.toUpperCase();
        }
        
        // Thêm sự kiện focus để highlight các ô liên quan
        input.addEventListener('focus', () => highlightWord(rowIndex, colIndex));
        
        div.appendChild(input);
        
        // Thêm số vào góc trái nếu ô có số
        if (!isNaN(cell) && cell !== " ") {
          const number = document.createElement('div');
          number.classList.add('cell-number');
          number.textContent = cell;
          div.appendChild(number);
        }
      }
      
      crosswordContainer.appendChild(div);
    });
  });
  
  // Thêm event listener cho việc kiểm tra đáp án
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

// Focus vào từ dựa trên vị trí - bắt đầu ngay từ ô có số
function focusOnWord(wordInfo) {
  const { row, col, direction } = wordInfo;
  
  // Focus vào ô đầu tiên của từ (ô có số)
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

// Kiểm tra DOM loaded trước khi chạy
document.addEventListener('DOMContentLoaded', () => {
  const crosswordContainer = document.getElementById('crossword');
  const cluesList = document.getElementById('clues-list');
  
  // Debug log
  console.log('DOM loaded, starting game initialization...');
  
  // Kiểm tra xem container có tồn tại không
  if (!crosswordContainer || !cluesList) {
    console.error('Required elements not found:', {
      crosswordContainer: !!crosswordContainer,
      cluesList: !!cluesList
    });
    return;
  }
  
  // Khởi tạo
  createCrossword();
  displayHints();
  
  // Event listeners cho các nút
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
  
  document.getElementById('reset').addEventListener('click', () => {
    location.reload();
  });
  
  document.getElementById('show-all').addEventListener('click', () => {
    document.querySelectorAll('.cell input').forEach(input => {
      const answer = input.dataset.answer;
      if (answer) {
        input.value = answer;
        input.parentElement.classList.add('correct');
        input.parentElement.classList.remove('incorrect');
      }
    });
    
    // Mark all clues as completed
    document.querySelectorAll('#clues-list li').forEach(li => {
      li.classList.add('completed');
    });
    
    // Show victory message
    showVictory();
  });
});