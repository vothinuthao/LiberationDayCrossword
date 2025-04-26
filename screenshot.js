function takeScreenshot() {
  html2canvas(document.body).then(canvas => {
    const link = document.createElement('a');
    link.download = 'crossword-result.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}
