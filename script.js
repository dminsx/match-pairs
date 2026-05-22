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

// const newGame = document.getElementById("new-game");
// const score = document.getElementById("score");
// const attempts = document.getElementById("attempts");
// const difficultyLevel = document.querySelector(".difficulty");
// const mainBoard = document.querySelector(".main");
// const image = document.querySelector(".start-screen");

// const emoji = [
//   "⛲",
//   "🗽",
//   "⛳",
//   "⛺",
//   "⛽",
//   "🌋",
//   "🗼",
//   "🗿",
//   "🏖",
//   "🏝",
//   "⚓",
//   "⛵",
//   "🛩",
//   "🛰",
//   "🛸",
//   "🕰",
//   "🧭",
//   "🏔",
//   "🏟",
//   "🏡",
//   "🏯",
//   "🏰",
//   "⛩",
//   "🕋",
//   "🎠",
//   "🎡",
//   "💈",
//   "🎪",
//   "🚂",
//   "🚑",
//   "🚒",
//   "🚓",
// ];

// let firstCard = null;
// let secondCard = null;
// let scoreCount = 0;
// let attemptsCount = 0;

// function getCards() {
//   return document.querySelectorAll(".card");
// }

// function handleResetCards() {
//   firstCard = null;
//   secondCard = null;
// }

// function shuffleEmoji() {
//   mainBoard.innerHTML = "";
//   let newEmoji = [...emoji].sort(() => Math.random() - 0.5);
//   switch (difficultyLevel.value) {
//     case "4":
//       let easyNewEmoji = newEmoji
//         .slice(0, 8)
//         .concat(newEmoji.slice(0, 8))
//         .sort(() => Math.random() - 0.5);

//       for (let i = 1; i <= 16; i++) {
//         const button = document.createElement("button");
//         const span = document.createElement("span");
//         button.classList.add("card");
//         span.classList.add("card-content");
//         button.append(span);
//         mainBoard.append(button);
//         span.dataset.symbol = easyNewEmoji[i];
//         span.innerText = easyNewEmoji[i];
//         button.addEventListener("click", () => {
//           if (button.classList.contains("card--matched")) {
//             return;
//           }

//           if (!button.classList.contains("card--active")) {
//             if (firstCard === null) {
//               firstCard = button.firstChild.dataset.symbol;
//             } else {
//               secondCard = button.firstChild.dataset.symbol;
//             }

//             button.textContent = button.firstChild.dataset.symbol;
//             button.classList.add("card--active");
//           }

//           if (firstCard && secondCard !== null) {
//             getCards().forEach((card) => {
//               if (!card.classList.contains("card--matched")) {
//                 card.disabled = true;
//               }
//             });

//             attemptsCount++;
//             attempts.textContent = attemptsCount;

//             if (firstCard === secondCard) {
//               handleSetMatchedPair();
//             } else {
//               setTimeout(() => handleResetDisabledBoard(), 666);
//             }
//           }

//           if (scoreCount === 8) {
//             setTimeout(() => {
//               alert(
//                 `Поздравляю, вы закончили игру за ${attemptsCount} попыток`,
//               );
//               handleResetForNewGame();
//             }, 333);
//           }
//         });
//       }

//       break;
//     case "6":
//       break;
//     case "8":
//       break;
//   }
// }

// function handleSetMatchedPair() {
//   getCards().forEach((card) => {
//     if (card.classList.contains("card--active")) {
//       card.classList.remove("card--active");
//       card.classList.add("card--matched");
//       handleResetCards();
//     }
//     card.disabled = false;
//   });
//   scoreCount++;
//   score.textContent = scoreCount;
// }

// function handleResetDisabledBoard() {
//   getCards().forEach((card) => {
//     card.classList.remove("card--active");
//     handleResetCards();
//     if (!card.classList.contains("card--matched")) {
//       card.disabled = false;
//       card.textContent = "";
//     }
//   });
// }

// function handleResetForNewGame() {
//   image.remove();
//   switch (difficultyLevel.value) {
//     case "4":
//       mainBoard.classList.add("main--easy");
//       mainBoard.classList.remove("main--medium");
//       mainBoard.classList.remove("main--hard");
//       break;
//     case "6":
//       mainBoard.classList.remove("main--easy");
//       mainBoard.classList.remove("main--hard");
//       mainBoard.classList.add("main--medium");
//       break;
//     case "8":
//       mainBoard.classList.remove("main--easy");
//       mainBoard.classList.remove("main--medium");
//       mainBoard.classList.add("main--hard");

//       break;
//     default:
//       alert("Уровень не выбран");
//   }

//   shuffleEmoji();
//   getCards().forEach((card) => {
//     card.disabled = false;
//     card.classList.remove("card--active", "card--matched");
//     card.textContent = "";
//     handleResetCards();
//     scoreCount = 0;
//     attemptsCount = 0;
//     score.textContent = scoreCount;
//     attempts.textContent = attemptsCount;
//   });
// }

// newGame.addEventListener("click", handleResetForNewGame);
