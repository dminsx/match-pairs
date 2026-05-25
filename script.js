const newGame = document.getElementById("new-game");
const score = document.getElementById("score");
const attempts = document.getElementById("attempts");
const board = document.querySelector(".main");
const difficulty = document.getElementById("difficulty");

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
let scoreCount = 0;
let attemptsCount = 0;

function winScore() {
  let winScore = 0;
  switch (difficulty.value) {
    case "easy":
      winScore = 8;
      break;
    case "medium":
      winScore = 18;
      break;
    case "hard":
      winScore = 32;
      break;
  }
  return winScore;
}

function createBoard() {
  switch (difficulty.value) {
    case "easy":
      board.style.gridTemplateColumns = "repeat(4, minmax(37px, 1fr))";
      for (let i = 1; i <= 16; i++) {
        const newCard = document.createElement("button");
        newCard.classList.add("card");
        board.append(newCard);
      }
      break;
    case "medium":
      board.style.gridTemplateColumns = "repeat(6, minmax(37px, 1fr))";
      for (let i = 1; i <= 36; i++) {
        const newCard = document.createElement("button");
        newCard.classList.add("card");
        board.append(newCard);
      }
      break;
    case "hard":
      board.style.gridTemplateColumns = "repeat(8, minmax(37px, 1fr))";
      for (let i = 1; i <= 64; i++) {
        const newCard = document.createElement("button");
        newCard.classList.add("card");
        board.append(newCard);
      }
      break;
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
  score.textContent = scoreCount;
}

function updateAttempts() {
  attempts.textContent = attemptsCount;
}

function shuffleEmoji() {
  const shuffledEmoji = [...emoji].sort(() => Math.random() - 0.5);
  switch (difficulty.value) {
    case "easy":
      const easyShuffledEmoji = shuffledEmoji
        .slice(0, 8)
        .concat(shuffledEmoji.slice(0, 8))
        .sort(() => Math.random() - 0.5);
      getCards().forEach((card, index) => {
        card.dataset.symbol = easyShuffledEmoji[index];
      });
      break;
    case "medium":
      const mediumShuffledEmoji = shuffledEmoji
        .slice(0, 18)
        .concat(shuffledEmoji.slice(0, 18))
        .sort(() => Math.random() - 0.5);
      getCards().forEach((card, index) => {
        card.dataset.symbol = mediumShuffledEmoji[index];
      });
      break;
    case "hard":
      const hardShuffledEmoji = shuffledEmoji
        .concat(shuffledEmoji)
        .sort(() => Math.random() - 0.5);
      getCards().forEach((card, index) => {
        card.dataset.symbol = hardShuffledEmoji[index];
      });
      break;
  }
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
      console.log(winScore());
      if (scoreCount === winScore()) {
        setTimeout(() => {
          alert(`Поздравляю, вы закончили игру за ${attemptsCount} попыток`);
          startNewGame();
        }, 333);
      }
    });
  });

  getCards().forEach((card) => {
    card.classList.remove("card--active", "card--matched");
    closeCard(card);
  });

  resetCards();
  scoreCount = 0;
  attemptsCount = 0;
  updateScore();
  updateAttempts();
}

newGame.addEventListener("click", startNewGame);
