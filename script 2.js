const words = [
  "sun", "moon", "stars", "light", "code", "python", "unity", "green", "music",
  "dream", "faith", "hope", "river", "forest", "planet", "heart", "peace",
  "speed", "type", "keyboard", "game", "power", "magic", "storm", "flame"
];

const wordContainer = document.getElementById("word-container");
const inputBox = document.getElementById("input-box");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restart");

let currentWordIndex = 0;
let typedWords = [];
let correctWords = 0;
let totalTyped = 0;
let timer = 60;
let interval = null;
let gameActive = false;

// Generate random word sequence
function generateWords() {
  let shuffled = [];
  for (let i = 0; i < 150; i++) {
    shuffled.push(words[Math.floor(Math.random() * words.length)]);
  }
  wordContainer.innerHTML = shuffled
    .map((word, i) => `<span id="word-${i}" class="word">${word}</span>`)
    .join(" ");
  currentWordIndex = 0;
  highlightWord(0);
}

function highlightWord(index) {
  document.querySelectorAll(".word").forEach(w => w.classList.remove("active"));
  const current = document.getElementById(`word-${index}`);
  if (current) current.classList.add("active");
}

// Start timer
function startTimer() {
  if (interval) return;
  gameActive = true;
  interval = setInterval(() => {
    timer--;
    timerDisplay.textContent = timer;
    if (timer <= 0) endGame();
  }, 1000);
}

// Handle typing
inputBox.addEventListener("input", e => {
  startTimer();
  if (!gameActive) return;

  const input = e.target.value.trim();
  const currentWord = document.getElementById(`word-${currentWordIndex}`).textContent;

  if (e.data === " " || e.inputType === "insertLineBreak") {
    totalTyped++;
    if (input === currentWord) {
      correctWords++;
      document.getElementById(`word-${currentWordIndex}`).classList.add("correct");
    } else {
      document.getElementById(`word-${currentWordIndex}`).classList.add("wrong");
    }

    currentWordIndex++;
    highlightWord(currentWordIndex);
    e.target.value = "";
  }

  const accuracy = totalTyped ? ((correctWords / totalTyped) * 100).toFixed(1) : 0;
  const timeElapsed = 60 - timer;
  const wpm = timeElapsed > 0 ? Math.round((correctWords / timeElapsed) * 60) : 0;

  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = accuracy;
});

// End game
function endGame() {
  clearInterval(interval);
  gameActive = false;
  inputBox.disabled = true;
  inputBox.value = "";
  alert(`Time's up! Your WPM: ${wpmDisplay.textContent}, Accuracy: ${accuracyDisplay.textContent}%`);
}

// Restart
restartBtn.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
  timer = 60;
  correctWords = 0;
  totalTyped = 0;
  timerDisplay.textContent = 60;
  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = 0;
  inputBox.disabled = false;
  inputBox.value = "";
  generateWords();
});

generateWords();
