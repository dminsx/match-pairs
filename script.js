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

let activeCards = document.querySelectorAll(".card--active");
let firstCard = null;
let secondCard = null;
let scoreCount = 1;
let attemptsCount = 0;

function shuffleEmoji() {
  let newEmoji = emoji.sort(() => Math.random() - 0.5);
  cards.forEach((card, index) => {
    card.dataset.symbol = newEmoji[index];
  });
}

function handleSetMatchedPair() {
  activeCards = document.querySelectorAll(".card--active");
  activeCards.forEach((match) => {
    match.classList.remove("card--active");
    match.classList.add("card--matched");
    firstCard = null;
    secondCard = null;
    cards.forEach((reset) => {
      reset.disabled = false;
    });
  });
  scoreCount += 1;
  score.textContent = scoreCount;
}

function handleResetDisabledBoard() {
  activeCards = document.querySelectorAll(".card--active");
  activeCards.forEach((match) => {
    match.classList.remove("card--active");
    match.textContent = "";
    firstCard = null;
    secondCard = null;
    cards.forEach((reset) => {
      if (!reset.classList.contains("card--matched")) {
        reset.disabled = false;
      }
    });
  });
}

function handleResetForNewGame() {
  shuffleEmoji();
  cards.forEach((card) => {
    card.disabled = false;
    card.classList.remove("card--active", "card--matched");
    card.textContent = "";
    firstCard = null;
    secondCard = null;
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

    if (
      !card.classList.contains("card--active") &&
      !card.classList.contains("card--matched")
    ) {
      if (firstCard === null) {
        firstCard = card.dataset.symbol;
      } else {
        secondCard = card.dataset.symbol;
      }
      card.textContent = card.dataset.symbol;
      card.classList.add("card--active");
    }

    activeCards = document.querySelectorAll(".card--active");

    if (activeCards.length === 2) {
      cards.forEach((notActive) => {
        if (!notActive.classList.contains("card--matched")) {
          notActive.disabled = true;
        }
      });

      attemptsCount += 1;
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
