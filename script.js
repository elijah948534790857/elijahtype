const words = [
  "apple","banana","orange","grape","cherry","mango","lemon","keyboard","monitor","python","unity","rocket"
];

const container = document.getElementById("word-container");
const input = document.getElementById("input-field");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart");

let currentIndex = 0;
let timeLeft = 60;
let timer = null;
let correctWords = 0;
let totalWords = 0;

function initWords() {
  container.innerHTML = "";
  for (let i = 0; i < 80; i++) {
    const word = document.createElement("span");
    word.className = "word";
    word.innerHTML = `<span class="letters">${words[Math.floor(Math.random() * words.length)]
      .split("")
      .map((l) => `<span class="letter">${l}</span>`)
      .join("")}</span>`;
    container.appendChild(word);
    container.append(" ");
  }
  container.children[0].classList.add("current");
}

function startTimer() {
  if (timer) return;
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

input.addEventListener("input", (e) => {
  startTimer();
  const wordSpans = container.querySelectorAll(".word");
  const currentWord = wordSpans[currentIndex];
  const letters = currentWord.querySelectorAll(".letter");
  const typed = input.value.split("");

  // letter coloring
  letters.forEach((letter, i) => {
    if (!typed[i]) {
      letter.className = "letter"; // reset
    } else if (typed[i] === letter.textContent) {
      letter.className = "letter correct-letter";
    } else {
      letter.className = "letter wrong-letter";
    }
  });

  // move to next word on space
  if (e.data === " ") {
    const wordText = currentWord.textContent.trim();
    const typedWord = input.value.trim();
    if (typedWord === wordText) {
      currentWord.classList.add("correct");
      correctWords++;
    } else {
      currentWord.classList.add("incorrect");
    }
    totalWords++;
    currentWord.classList.remove("current");
    currentIndex++;
    if (wordSpans[currentIndex]) wordSpans[currentIndex].classList.add("current");
    input.value = "";
  }

  const wpm = Math.round((correctWords / ((60 - timeLeft) / 60)) || 0);
  const accuracy = totalWords ? Math.round((correctWords / totalWords) * 100) : 100;
  wpmEl.textContent = wpm;
  accuracyEl.textContent = accuracy;
});

function endGame() {
  clearInterval(timer);
  input.disabled = true;
  container.innerHTML = `<h2>Finished!</h2>
    <p>WPM: <strong>${wpmEl.textContent}</strong></p>
    <p>Accuracy: <strong>${accuracyEl.textContent}%</strong></p>`;
}

restartBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  currentIndex = 0;
  timeLeft = 60;
  correctWords = 0;
  totalWords = 0;
  input.disabled = false;
  input.value = "";
  timeEl.textContent = "60";
  wpmEl.textContent = "0";
  accuracyEl.textContent = "100";
  initWords();
});
initWords();
