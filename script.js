const newGame = document.getElementById("new-game");
const score = document.getElementById("score");
const attempts = document.getElementById("attempts");
const board = document.querySelector(".main");
const difficulty = document.getElementById("difficulty");
const minutes = document.getElementById("m");
const seconds = document.getElementById("s");
const milliSeconds = document.getElementById("ms");

const emoji = [
  "⛲",
  "🗽",
  "⛳",
  "⛺",
  "⛽",
  "🌋",
  "🗼",
  "🗿",
  "🏖",
  "🏝",
  "⚓",
  "⛵",
  "🛩",
  "🛰",
  "🛸",
  "🕰",
  "🧭",
  "🏔",
  "🏟",
  "🏡",
  "🏯",
  "🏰",
  "⛩",
  "🕋",
  "🎠",
  "🎡",
  "💈",
  "🎪",
  "🚂",
  "🚑",
  "🚒",
  "🚓",
];

let firstCard = null;
let secondCard = null;
let timerId = null;
let scoreCount = 0;
let attemptsCount = 0;
let minutesValue = 0;
let secondsValue = 0;
let milliSecondsValue = 0;

function stopWatch() {
  milliSecondsValue++;
  if (milliSecondsValue < 10) {
    milliSeconds.textContent = `0${milliSecondsValue}`;
  } else {
    milliSeconds.textContent = milliSecondsValue;
  }
  if (milliSecondsValue === 10) {
    milliSecondsValue = 0;
    secondsValue++;
    if (secondsValue < 10) {
      seconds.textContent = `0${secondsValue}`;
    } else {
      seconds.textContent = secondsValue;
    }
    if (secondsValue === 60) {
      secondsValue = 0;
      minutesValue++;
      minutes.textContent = minutesValue;
      seconds.textContent = "00";
    }
  }
}

function startStopWatch() {
  if (timerId !== null) return;
  timerId = setInterval(stopWatch, 100);
}

function endStopWatch() {
  clearInterval(timerId);
}

function resetStopWatch() {
  timerId = null;
  milliSecondsValue = 0;
  secondsValue = 0;
  minutesValue = 0;
  milliSeconds.textContent = "00";
  seconds.textContent = "00";
  minutes.textContent = "0";
}

function getTime() {
  return `${minutes.textContent}:${seconds.textContent}.${milliSeconds.textContent}`;
}

function startScreen() {
  board.innerHTML = "";
  difficulty.disabled = false;
  board.style = "";
  resetCards();
  scoreCount = 0;
  attemptsCount = 0;
  updateScore();
  updateAttempts();
  const img = document.createElement("img");
  img.src = "/startScreen.png";
  img.alt = "startScreen";
  img.classList.add("start-screen");
  board.append(img);
}

function getBoardSize() {
  return Number(difficulty.value);
}

function createBoard() {
  board.style.gridTemplateColumns = `repeat(${getBoardSize()}, 1fr)`;
  for (let i = 1; i <= getBoardSize() ** 2; i++) {
    const newCard = document.createElement("button");
    newCard.classList.add("card");
    board.append(newCard);
  }
}

function getCards() {
  return document.querySelectorAll(".card");
}

function resetCards() {
  firstCard = null;
  secondCard = null;
}

function updateScore() {
  score.textContent = `${scoreCount}/${getBoardSize() ** 2 / 2}`;
}

function updateAttempts() {
  attempts.textContent = attemptsCount;
}

function shuffleEmoji() {
  const shuffledEmoji = [...emoji].sort(() => Math.random() - 0.5);

  const shuffledEmojiForLevel = shuffledEmoji
    .slice(0, getBoardSize() ** 2 / 2)
    .concat(shuffledEmoji.slice(0, getBoardSize() ** 2 / 2))
    .sort(() => Math.random() - 0.5);

  getCards().forEach((card, index) => {
    card.dataset.symbol = shuffledEmojiForLevel[index];
  });
}

function showCard(card) {
  card.textContent = card.dataset.symbol;
  card.classList.add("card--active");
}

function closeCard(card) {
  card.disabled = false;
  card.textContent = "";
}

function setMatchedPair() {
  getCards().forEach((card) => {
    if (card.classList.contains("card--active")) {
      card.classList.remove("card--active");
      card.classList.add("card--matched");
    }
    card.disabled = false;
  });
  scoreCount++;
  updateScore();
  resetCards();
}

function resetUnmatchedCards() {
  getCards().forEach((card) => {
    card.classList.remove("card--active");
    if (!card.classList.contains("card--matched")) {
      closeCard(card);
    }
  });
  resetCards();
}

function startNewGame() {
  board.innerHTML = "";
  difficulty.disabled = true;
  createBoard();
  shuffleEmoji();

  getCards().forEach((card) => {
    card.addEventListener("click", () => {
      const isActive = card.classList.contains("card--active");
      const isMatched = card.classList.contains("card--matched");
      if (isActive || isMatched) {
        return;
      }

      if (firstCard === null) {
        firstCard = card.dataset.symbol;
      } else {
        secondCard = card.dataset.symbol;
      }

      showCard(card);

      if (firstCard !== null && secondCard !== null) {
        getCards().forEach((currentCard) => {
          if (!currentCard.classList.contains("card--matched")) {
            currentCard.disabled = true;
          }
        });

        attemptsCount++;
        updateAttempts();

        if (firstCard === secondCard) {
          setMatchedPair();
        } else {
          setTimeout(() => resetUnmatchedCards(), 666);
        }
      }

      if (scoreCount === getBoardSize() ** 2 / 2) {
        endStopWatch();
        const finishTime = getTime();
        setTimeout(() => {
          alert(
            `Поздравляю, вы закончили игру за ${attemptsCount} попыток. Ваше время: ${finishTime}`,
          );
          startScreen();
          resetStopWatch();
        }, 333);
      }
    });
  });

  getCards().forEach((card) => {
    card.classList.remove("card--active", "card--matched");
    closeCard(card);
  });

  resetStopWatch();
  startStopWatch();

  resetCards();
  scoreCount = 0;
  attemptsCount = 0;
  updateScore();
  updateAttempts();
}

startScreen();

difficulty.addEventListener("change", updateScore);

newGame.addEventListener("click", startNewGame);
