const words = [
  "apple","banana","orange","grape","cherry","mango","lemon","keyboard","monitor",
  "python","unity","rocket","computer","internet","cloud","mouse","gamer",
  "elijah","planet","dream","future","power","speed","type","ocean"
];

const container = document.getElementById("word-container");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart");

let currentIndex = 0;
let timeLeft = 60;
let timer = null;
let correctWords = 0;
let totalWords = 0;
let currentTyped = "";
let gameOver = false;

function initWords() {
  container.innerHTML = "";
  for (let i = 0; i < 100; i++) {
    const wordText = words[Math.floor(Math.random() * words.length)];
    const wordSpan = document.createElement("span");
    wordSpan.className = "word";

    const lettersWrapper = document.createElement("span");
    wordText.split("").forEach(ch => {
      const letterSpan = document.createElement("span");
      letterSpan.className = "letter";
      letterSpan.textContent = ch;
      lettersWrapper.appendChild(letterSpan);
    });

    wordSpan.appendChild(lettersWrapper);
    container.appendChild(wordSpan);
    container.append(" ");
  }

  currentIndex = 0;
  currentTyped = "";
  const allWords = container.querySelectorAll(".word");
  if (allWords[0]) {
    allWords[0].classList.add("current");
  }
}

function startTimer() {
  if (timer || gameOver) return;
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function updateLetterStyles() {
  const allWords = container.querySelectorAll(".word");
  const currentWord = allWords[currentIndex];
  if (!currentWord) return;
  const letters = currentWord.querySelectorAll(".letter");
  const typedChars = currentTyped.split("");

  letters.forEach((letterSpan, i) => {
    if (!typedChars[i]) {
      letterSpan.className = "letter"; // reset
    } else if (typedChars[i] === letterSpan.textContent) {
      letterSpan.className = "letter correct-letter";
    } else {
      letterSpan.className = "letter wrong-letter";
    }
  });
}

function handleKey(e) {
  if (gameOver) return;

  // start timer on first keypress
  startTimer();

  const allWords = container.querySelectorAll(".word");
  const currentWord = allWords[currentIndex];
  if (!currentWord) return;

  if (e.key === "Backspace") {
    e.preventDefault();
    if (currentTyped.length > 0) {
      currentTyped = currentTyped.slice(0, -1);
      updateLetterStyles();
    }
    return;
  }

  if (e.key === " ") {
    e.preventDefault();
    const target = currentWord.textContent.trim();
    const typedWord = currentTyped.trim();

    if (typedWord.length > 0) {
      totalWords++;
      if (typedWord === target) {
        correctWords++;
        currentWord.classList.add("correct");
      } else {
        currentWord.classList.add("incorrect");
      }
    }

    currentWord.classList.remove("current");
    currentTyped = "";
    currentIndex++;
    if (allWords[currentIndex]) {
      allWords[currentIndex].classList.add("current");
    }

    updateStats();
    return;
  }

  // only handle single visible characters
  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
    currentTyped += e.key;
    updateLetterStyles();
    updateStats();
  }
}

function updateStats() {
  const elapsed = 60 - timeLeft;
  const wpm = elapsed > 0 ? Math.round((correctWords * 60) / elapsed) : 0;
  const accuracy = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 100;

  wpmEl.textContent = wpm;
  accuracyEl.textContent = accuracy;
}

function endGame() {
  if (gameOver) return;
  gameOver = true;
  clearInterval(timer);
  timer = null;

  const finalWpm = wpmEl.textContent;
  const finalAcc = accuracyEl.textContent;

  container.innerHTML = `
    <h2>Test Finished!</h2>
    <p>Your speed: <strong>${finalWpm} WPM</strong></p>
    <p>Your accuracy: <strong>${finalAcc}%</strong></p>
    <p>Press "Restart" to try again.</p>
  `;
}

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
});

// listen for typing anywhere on the page
document.addEventListener("keydown", handleKey);

initWords();
