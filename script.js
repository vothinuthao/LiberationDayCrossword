const words = [
    {answer: "FREEDOM", clue: "The ability to do what you want without being controlled.", startRow: 0, startCol: 0, direction: "across"},
    {answer: "REUNIFICATIONDAY", clue: "A special day when two parts of a country become one again.", startRow: 2, startCol: 0, direction: "across"},
    {answer: "INDEPENDENCE", clue: "When a country is free to rule itself.", startRow: 4, startCol: 0, direction: "across"},
    {answer: "MILITARYPARADE", clue: "Soldiers march together to celebrate something important.", startRow: 6, startCol: 0, direction: "across"},
    {answer: "SOLDIER", clue: "A person who fights for their country.", startRow: 0, startCol: 2, direction: "down"},
    {answer: "FLAG", clue: "A piece of cloth with colors and shapes that stands for a country.", startRow: 0, startCol: 4, direction: "down"},
    {answer: "APRIL30TH", clue: "The day when the Vietnam War ended.", startRow: 0, startCol: 6, direction: "down"},
    {answer: "NATIONALHOLIDAY", clue: "A day when many people get off work to celebrate something important.", startRow: 0, startCol: 8, direction: "down"},
    {answer: "VICTORY", clue: "Winning a battle or a competition.", startRow: 8, startCol: 0, direction: "across"},
    {answer: "PEACE", clue: "When there is no fighting or war.", startRow: 10, startCol: 0, direction: "across"}
  ];
  
  const crossword = document.getElementById('crossword');
  const cluesList = document.getElementById('clues-list');
  const gridSize = 15; // Bigger to fit big words
  
  // Prepare empty grid
  const grid = [];
  for (let row = 0; row < gridSize; row++) {
    grid[row] = [];
    for (let col = 0; col < gridSize; col++) {
      grid[row][col] = '';
    }
  }
  
  // Place words into grid
  words.forEach((wordObj, index) => {
    const {answer, startRow, startCol, direction} = wordObj;
    for (let i = 0; i < answer.length; i++) {
      const r = direction === 'across' ? startRow : startRow + i;
      const c = direction === 'across' ? startCol + i : startCol;
      grid[r][c] = answer[i];
    }
  });
  
  // Render grid
  crossword.innerHTML = '';
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
  
      if (grid[row][col] !== '') {
        const input = document.createElement('input');
        input.setAttribute('maxlength', 1);
        input.dataset.row = row;
        input.dataset.col = col;
        input.dataset.letter = grid[row][col];
  
        input.addEventListener('input', checkLetter);
        cell.appendChild(input);
      }
      crossword.appendChild(cell);
    }
  }
  
  // Render clues
  words.forEach((word, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1} (${word.direction}) - ${word.clue}`;
    cluesList.appendChild(li);
  });
  
  // Check real-time
  function checkLetter(e) {
    const input = e.target;
    const expected = input.dataset.letter.toUpperCase();
    const value = input.value.toUpperCase();
  
    if (value === expected) {
      input.classList.add('correct');
      input.classList.remove('wrong');
    } else if (value !== '') {
      input.classList.add('wrong');
      input.classList.remove('correct');
    } else {
      input.classList.remove('correct', 'wrong');
    }
  }
  
  // Submit button
  document.getElementById('submit').addEventListener('click', () => {
    takeScreenshot();
    triggerWinAnimation(true);
    alert('Game submitted!');
  });
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
  