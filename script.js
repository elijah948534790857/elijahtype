let caret;

function createCaret() {
  caret = document.createElement("span");
  caret.classList.add("caret");
  return caret;
}

function placeCaret() {
  // remove old caret if any
  if (caret && caret.parentElement) caret.remove();

  const currentWord = container.querySelectorAll(".word")[currentIndex];
  if (!currentWord) return;

  const letters = currentWord.querySelectorAll(".letter");
  const position = currentTyped.length;

  const newCaret = createCaret();

  if (position < letters.length) {
    letters[position].before(newCaret);
  } else {
    currentWord.appendChild(newCaret);
  }
  caret = newCaret;
}

document.addEventListener("keydown", (e) => {
  handleKey(e);
  // small delay to allow DOM update
  setTimeout(placeCaret, 10);
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
  setTimeout(placeCaret, 50);
});

initWords();
setTimeout(placeCaret, 50);
