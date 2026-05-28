const newGame = document.getElementById("new-game");
const score = document.getElementById("score");
const attempts = document.getElementById("attempts");
const header = document.querySelector(".header");
const board = document.querySelector(".main");
const footer = document.querySelector(".footer");
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
let milliSecondsValue = 0;

function createEndButton() {
  const endButton = document.createElement("button");
  endButton.textContent = "End Game";
  endButton.id = "end-game";
  endButton.classList.add("button");
  footer.append(endButton);
}

function getEndButton() {
  return document.getElementById("end-game");
}

function timer() {
  milliSecondsValue += 10;

  let msec = milliSecondsValue / 10;
  let sec = Math.floor(milliSecondsValue / 1000) % 60;
  let min = Math.floor(milliSecondsValue / 60000) % 60;

  milliSeconds.textContent = String(msec).slice(-2).padStart(2, 0);
  seconds.textContent = String(sec).padStart(2, 0);
  minutes.textContent = min;
}

function startTimer() {
  timerId = setInterval(timer, 10);
}

function endTimer() {
  clearInterval(timerId);
}

function resetTimer() {
  timerId = null;
  milliSecondsValue = 0;
  milliSeconds.textContent = "00";
  seconds.textContent = "00";
  minutes.textContent = "0";
}

function getTime() {
  return `${minutes.textContent}:${seconds.textContent}.${milliSeconds.textContent}`;
}

function startScreen() {
  if (getEndButton()) {
    getEndButton().remove();
  }

  board.innerHTML = "";
  difficulty.style = "";
  board.style = "";
  resetCards();
  scoreCount = 0;
  attemptsCount = 0;
  updateScore();
  updateAttempts();
  endTimer();
  resetTimer();

  const img = document.createElement("img");
  img.src = "/startScreen.png";
  img.alt = "startScreen";
  img.classList.add("start-screen");
  board.append(img);
  footer.append(newGame);
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

function endGame() {
  startScreen();
  resetTimer();

  header.classList.add("move-header-back-down");
  board.classList.add("move-main-back-up");
  footer.classList.add("move-main-back-up");

  header.classList.remove("move-header-up");
  board.classList.remove("move-main-down");
  footer.classList.remove("move-main-down");
}

function startNewGame() {
  if (getEndButton()) {
    getEndButton().remove();
  }

  board.innerHTML = "";
  difficulty.style.display = "none";
  createBoard();
  shuffleEmoji();
  createEndButton();
  newGame.remove();

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
        endTimer();
        const finishTime = getTime();
        setTimeout(() => {
          alert(
            `Поздравляю, вы закончили игру за ${attemptsCount} попыток. Ваше время: ${finishTime}`,
          );
          endGame();
        }, 333);
      }
    });
  });

  getCards().forEach((card) => {
    card.classList.remove("card--active", "card--matched");
    closeCard(card);
  });

  endTimer();
  resetTimer();
  startTimer();

  resetCards();
  scoreCount = 0;
  attemptsCount = 0;
  updateScore();
  updateAttempts();

  getEndButton().addEventListener("click", () => {
    let isEnd = confirm("Уверены, что хотите закончить игру?");
    endTimer();
    if (isEnd) {
      endGame();
    } else {
      startTimer();
    }
  });
}

startScreen();

difficulty.addEventListener("change", updateScore);

newGame.addEventListener("click", () => {
  setTimeout(startNewGame, 1000);

  header.classList.remove("move-header-back-down");
  board.classList.remove("move-main-back-up");
  footer.classList.remove("move-main-back-up");

  header.classList.add("move-header-up");
  board.classList.add("move-main-down");
  footer.classList.add("move-main-down");
});
