const cards = document.querySelectorAll(".card");
const newGame = document.getElementById("new-game");
const score = document.getElementById("score");
const attempts = document.getElementById("attempts");

const emoji = [
  "⛲",
  "🗽",
  "⛳",
  "⛺",
  "⛽",
  "🌋",
  "🗼",
  "🗿",
  "⛲",
  "🗽",
  "⛳",
  "⛺",
  "⛽",
  "🌋",
  "🗼",
  "🗿",
];

let firstCard = null;
let secondCard = null;
let scoreCount = 0;
let attemptsCount = 0;

function handleResetCards() {
  firstCard = null;
  secondCard = null;
}

function shuffleEmoji() {
  let newEmoji = emoji.sort(() => Math.random() - 0.5);
  cards.forEach((card, index) => {
    card.dataset.symbol = newEmoji[index];
  });
}

function handleSetMatchedPair() {
  cards.forEach((card) => {
    if (card.classList.contains("card--active")) {
      card.classList.remove("card--active");
      card.classList.add("card--matched");
      handleResetCards();
    }
    card.disabled = false;
  });
  scoreCount++;
  score.textContent = scoreCount;
}

function handleResetDisabledBoard() {
  cards.forEach((card) => {
    card.classList.remove("card--active");
    handleResetCards();
    if (!card.classList.contains("card--matched")) {
      card.disabled = false;
      card.textContent = "";
    }
  });
}

function handleResetForNewGame() {
  shuffleEmoji();
  cards.forEach((card) => {
    card.disabled = false;
    card.classList.remove("card--active", "card--matched");
    card.textContent = "";
    handleResetCards();
    scoreCount = 0;
    attemptsCount = 0;
    score.textContent = scoreCount;
    attempts.textContent = attemptsCount;
  });
}

shuffleEmoji();

newGame.addEventListener("click", () => {
  handleResetForNewGame();
});

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (card.classList.contains("card--matched")) {
      return;
    }

    if (!card.classList.contains("card--active")) {
      if (firstCard === null) {
        firstCard = card.dataset.symbol;
      } else {
        secondCard = card.dataset.symbol;
      }
      card.textContent = card.dataset.symbol;
      card.classList.add("card--active");
    }

    if (firstCard && secondCard !== null) {
      cards.forEach((card) => {
        if (!card.classList.contains("card--matched")) {
          card.disabled = true;
        }
      });

      attemptsCount++;
      attempts.textContent = attemptsCount;

      if (firstCard === secondCard) {
        handleSetMatchedPair();
      } else {
        setTimeout(() => handleResetDisabledBoard(), 666);
      }
    }

    if (scoreCount === 8) {
      setTimeout(() => {
        alert(`Поздравляю, вы закончили игру за ${attemptsCount} попыток`);
        handleResetForNewGame();
      }, 333);
    }
  });
});
