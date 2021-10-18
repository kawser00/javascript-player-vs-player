const inputElem = document.querySelector("#input");
const formElem = document.querySelector("form");
const formContainer = document.querySelector("#form-container");
const winScoreElem = document.querySelector(".winScore");
const p1ScoreElem = document.querySelector(".p1Score");
const p2ScoreElem = document.querySelector(".p2Score");
const p1Btn = document.querySelector(".p1Btn");
const p2Btn = document.querySelector(".p2Btn");
const resetBtn = document.querySelector(".reset");

let p1Score = 0;
let winScore = 20;
let p2Score = 0;
let turn = "player1";

winScoreElem.textContent = winScore + " (default)";
p1ScoreElem.textContent = p1Score;
p2ScoreElem.textContent = p2Score;

function getRanNum(max) {
  return Math.ceil(Math.random() * max);
}

formElem.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputVal = +inputElem.value;

  if (inputVal === "" || inputVal < 1) {
    alert("Please enter a valid number");
    reset();
  } else {
    winScore = +inputElem.value; // '+' for convert string to number;
    winScoreElem.textContent = winScore;
    inputElem.value = "";
  }
});

p1Btn.addEventListener("click", function () {
  if (turn === "player1") {
    p1Score += getRanNum(winScore);
    p1ScoreElem.textContent = p1Score;
    turn = "player2";
    p1Btn.setAttribute("disabled", "disabled");
    p2Btn.removeAttribute("disabled");

    checkWinner();
  }
});

p2Btn.addEventListener("click", function () {
  if (turn === "player2") {
    p2Score += getRanNum(winScore);
    p2ScoreElem.textContent = p2Score;
    turn = "player1";
    p2Btn.setAttribute("disabled", "disabled");
    p1Btn.removeAttribute("disabled");

    checkWinner();
  }
});

function checkWinner() {
  let player1Win = winScore <= p1Score;
  let player2Win = winScore <= p2Score;

  if (player1Win || player2Win) {
    p1Btn.setAttribute("disabled", "disabled");
    p2Btn.setAttribute("disabled", "disabled");
  }
  displayWinner(player1Win, player2Win);
}

function displayWinner(player1Win, player2Win) {
  if (player1Win) {
    formContainer.insertAdjacentHTML(
      "beforebegin",
      '<h5 class="winnerMsg text-success mb-3">Player 1 Winner!!!</h5>'
    );
  } else if (player2Win) {
    formContainer.insertAdjacentHTML(
      "beforebegin",
      '<h5 class="winnerMsg text-success mb-3">Player 2 Winner!!!</h5>'
    );
  }
}

resetBtn.addEventListener("click", function () {
  reset();
  window.location.reload()
});

function reset() {
  winScoreElem.textContent = 20 + " (default)";
  p1ScoreElem.textContent = 0;
  p2ScoreElem.textContent = 0;

  p1Btn.removeAttribute("disabled");
  p2Btn.removeAttribute("disabled");

  if (document.querySelector(".winnerMsg")) {
    document.querySelector(".winnerMsg").remove();
  }
}
