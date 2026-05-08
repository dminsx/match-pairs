const cards = document.querySelectorAll(".card");
const newGame = document.getElementById("new-game");

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
let lockBoard;
let score = 0;
let attempts = 0;

function shuffleEmoji() {
  let newEmoji = emoji.sort(() => Math.random() - 0.5);
  cards.forEach((card, index) => {
    card.dataset.symbol = newEmoji[index];
  });
}

shuffleEmoji();

newGame.addEventListener("click", () => {
  shuffleEmoji();
  cards.forEach((card) => {
    card.disabled = false;
    card.classList.remove("card--active", "card--matched");
    card.textContent = "";
    firstCard = null;
    secondCard = null;
    score = 0;
    attempts = 0;
  });
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
    } else {
      card.classList.remove("card--active");
      card.textContent = "";
      firstCard = null;
    }

    activeCards = document.querySelectorAll(".card--active");
    if (activeCards.length === 2) {
      cards.forEach((notActive) => {
        if (!notActive.classList.contains("card--matched")) {
          notActive.disabled = true;
        }
      });
      attempts += 1;
      if (firstCard === secondCard) {
        activeCards.forEach((match) => {
          match.classList.remove("card--active");
          match.classList.add("card--matched");
          firstCard = null;
          secondCard = null;
          score += 1;
          cards.forEach((reset) => {
            reset.disabled = false;
          });
        });
      } else {
        setTimeout(() => {
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
        }, 600);
      }
    }
  });
});
