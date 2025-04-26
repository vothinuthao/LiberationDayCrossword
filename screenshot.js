// Screenshot function with enhanced features
function takeScreenshot() {
  // Create overlay for screenshot
  const screenshotOverlay = document.createElement('div');
  screenshotOverlay.id = 'screenshot-overlay';
  screenshotOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;

  // Create screenshot container
  const container = document.createElement('div');
  container.style.cssText = `
    background: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    max-width: 90%;
    max-height: 90%;
    overflow: auto;
  `;

  // Clone the game area for screenshot
  const gameArea = document.getElementById('game-area').cloneNode(true);
  const header = document.querySelector('header').cloneNode(true);
  
  // Create score information
  const scoreInfo = createScoreInfo();
  
  // Create watermark
  const watermark = document.createElement('div');
  watermark.style.cssText = `
    text-align: center;
    margin-top: 20px;
    font-family: 'Comfortaa', sans-serif;
    color: #666;
    font-size: 14px;
  `;
  watermark.innerHTML = `
    © ${new Date().getFullYear()} I am Litter Star - Liberation Day Crossword Game<br>
    Captured on ${new Date().toLocaleString()}
  `;

  // Assemble the screenshot content
  container.appendChild(header);
  container.appendChild(scoreInfo);
  container.appendChild(gameArea);
  container.appendChild(watermark);
  screenshotOverlay.appendChild(container);
  document.body.appendChild(screenshotOverlay);

  // Take screenshot using html2canvas with better options
  html2canvas(container, {
    scale: 2, // Higher quality
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: container.scrollWidth,
    windowHeight: container.scrollHeight
  }).then(canvas => {
    // Remove overlay
    document.body.removeChild(screenshotOverlay);
    
    // Show preview modal
    showScreenshotPreview(canvas);
  }).catch(error => {
    console.error('Screenshot failed:', error);
    document.body.removeChild(screenshotOverlay);
    alert('Failed to take screenshot. Please try again.');
  });
}

// Create score information for screenshot
function createScoreInfo() {
  const scoreDiv = document.createElement('div');
  scoreDiv.style.cssText = `
    background: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    margin: 20px 0;
    text-align: center;
    font-family: 'Comfortaa', sans-serif;
  `;

  // Calculate score
  let correctCount = 0;
  let totalCount = 0;
  document.querySelectorAll('.cell input').forEach(input => {
    if (input.dataset.answer) {
      totalCount++;
      if (input.parentElement.classList.contains('correct')) {
        correctCount++;
      }
    }
  });

  const percentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  const timeSpent = 600 - timeLeft; // from timer.js
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  scoreDiv.innerHTML = `
    <h3 style="color: #ff5722; margin-bottom: 10px;">🎯 Game Results</h3>
    <div style="display: flex; justify-content: space-around; margin-top: 10px;">
      <div>
        <div style="font-size: 24px; font-weight: bold; color: #4caf50;">${percentage}%</div>
        <div style="color: #666;">Correct</div>
      </div>
      <div>
        <div style="font-size: 24px; font-weight: bold; color: #2196F3;">${minutes}:${seconds.toString().padStart(2, '0')}</div>
        <div style="color: #666;">Time</div>
      </div>
      <div>
        <div style="font-size: 24px; font-weight: bold; color: #ff9800;">${correctCount}/${totalCount}</div>
        <div style="color: #666;">Words</div>
      </div>
    </div>
  `;

  return scoreDiv;
}

// Show screenshot preview with download options
function showScreenshotPreview(canvas) {
  const previewOverlay = document.createElement('div');
  previewOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `;

  const previewContainer = document.createElement('div');
  previewContainer.style.cssText = `
    background: white;
    padding: 20px;
    border-radius: 20px;
    max-width: 90%;
    max-height: 90%;
    overflow: auto;
    text-align: center;
  `;

  // Preview image
  const img = document.createElement('img');
  img.src = canvas.toDataURL('image/png');
  img.style.cssText = `
    max-width: 100%;
    max-height: 60vh;
    border-radius: 10px;
    margin-bottom: 20px;
  `;

  // Button container
  const buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = `
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
  `;

  // Download PNG button only
  const downloadPNG = createButton('📥 Download PNG', () => {
    downloadScreenshot(canvas, 'png');
    document.body.removeChild(previewOverlay);
  });

  const closeButton = createButton('❌ Close', () => {
    document.body.removeChild(previewOverlay);
  });

  buttonContainer.appendChild(downloadPNG);
  buttonContainer.appendChild(closeButton);

  previewContainer.appendChild(img);
  previewContainer.appendChild(buttonContainer);
  previewOverlay.appendChild(previewContainer);
  document.body.appendChild(previewOverlay);
}

// Create button helper function
function createButton(text, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.style.cssText = `
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    background: #ff7043;
    color: white;
    font-family: 'Comfortaa', sans-serif;
    cursor: pointer;
    transition: all 0.3s;
  `;
  button.addEventListener('mouseover', () => {
    button.style.transform = 'translateY(-2px)';
    button.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
  });
  button.addEventListener('mouseout', () => {
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = 'none';
  });
  button.addEventListener('click', onClick);
  return button;
}

// Download screenshot in specified format
function downloadScreenshot(canvas, format) {
  const link = document.createElement('a');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  link.download = `liberation-crossword-${timestamp}.${format}`;
  
  if (format === 'jpeg') {
    // White background for JPEG
    const newCanvas = document.createElement('canvas');
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    const ctx = newCanvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
    ctx.drawImage(canvas, 0, 0);
    link.href = newCanvas.toDataURL('image/jpeg', 0.9);
  } else {
    link.href = canvas.toDataURL('image/png');
  }
  
  link.click();
}

// Share screenshot (if Web Share API is available)
function shareScreenshot(canvas) {
  canvas.toBlob(async (blob) => {
    if (navigator.share && navigator.canShare) {
      try {
        const file = new File([blob], 'liberation-crossword.png', { type: 'image/png' });
        await navigator.share({
          files: [file],
          title: 'Liberation Day Crossword Result',
          text: 'Check out my Liberation Day Crossword result!'
        });
      } catch (error) {
        console.log('Error sharing:', error);
        // Fallback to download
        downloadScreenshot(canvas, 'png');
      }
    } else {
      // Fallback to download
      downloadScreenshot(canvas, 'png');
    }
  }, 'image/png');
}