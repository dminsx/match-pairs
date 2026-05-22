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
  cards.forEach((card, index) => {
    card.dataset.symbol = shuffledEmoji[index];
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
  cards.forEach((card) => {
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
  cards.forEach((card) => {
    card.classList.remove("card--active");
    if (!card.classList.contains("card--matched")) {
      closeCard(card);
    }
  });
  resetCards();
}

function startNewGame() {
  shuffleEmoji();
  cards.forEach((card) => {
    card.classList.remove("card--active", "card--matched");
    closeCard(card);
  });
  resetCards();
  scoreCount = 0;
  attemptsCount = 0;
  updateScore();
  updateAttempts();
}

shuffleEmoji();

newGame.addEventListener("click", startNewGame);

cards.forEach((card) => {
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
      cards.forEach((currentCard) => {
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

    if (scoreCount === 8) {
      setTimeout(() => {
        alert(`Поздравляю, вы закончили игру за ${attemptsCount} попыток`);
        handleResetForNewGame();
      }, 333);
    }
  });
});
