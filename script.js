let caret;

function placeCaret() {
  if (caret) caret.remove();
  const currentWord = container.querySelectorAll(".word")[currentIndex];
  if (!currentWord) return;

  const letters = currentWord.querySelectorAll(".letter");
  let position = currentTyped.length;

  caret = document.createElement("span");
  caret.classList.add("caret");

  if (position < letters.length) {
    letters[position].before(caret);
  } else {
    currentWord.appendChild(caret);
  }
}

document.addEventListener("keydown", (e) => {
  handleKey(e);
  placeCaret();
});

restartBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  timeLeft = 60;
  correctWords = 0;
  totalWords = 0;
  currentTyped = "";
  gameOver = false;
  timeEl.textContent = "60";
  wpmEl.textContent = "0";
  accuracyEl.textContent = "100";
  initWords();
  placeCaret();
});

initWords();
placeCaret();
