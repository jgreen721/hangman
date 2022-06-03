var counter = 65;
var keyboardDiv = document.querySelector(".keyboard-div");
var currentWordEl = document.querySelector(".current-word");
var scoreEl = document.querySelector(".score");

var branch = document.querySelector(".branch");
var rope = document.querySelector(".rope");
var noose = document.querySelector(".noose");
var head = document.querySelector(".head");
var neck = document.querySelector(".neck");
var body = document.querySelector(".body");
var armOne = document.querySelector(".arm-one");
var armTwo = document.querySelector(".arm-two");
var legOne = document.querySelector(".leg-one");
var legTwo = document.querySelector(".leg-two");
var bodyParts = [];

var alphabet = new Array(26).fill().map(() => String.fromCharCode(counter++));
alphabet.push("Enter");

console.log(alphabet);

alphabet.forEach((l) => {
  let letterButton = document.createElement("div");
  letterButton.innerText = l;
  letterButton.className = "letter-div";
  keyboardDiv.append(letterButton);
  letterButton.onclick = (e) => chooseLetter(e, l);
});

let blanksNLetters = [];
let currentWord = "";
let score = 0;
let output = "";

async function startGame() {
  let response = await fetch("https://random-word-api.herokuapp.com/word");
  let data = await response.json();
  scoreEl.innerHTML = score;
  currentWord = data[0];
  //   currentWord = currentWord.toUpperCase();
  currentWord;
  currentWord = currentWord.toUpperCase();

  console.log("Response", currentWord);

  printBlanks(currentWord);
}

startGame();

function printBlanks(word) {
  for (let i = 0; i < word.length; i++) {
    if (word[i] === " ") {
      console.log("space", String.fromCharCode(33));
      blanksNLetters.push("&nbsp;");
    } else {
      blanksNLetters.push(" _ ");
    }
  }

  console.log(blanksNLetters);

  blanksNLetters.forEach((tile, idx) => {
    let span = document.createElement("span");
    span.className = "currentword_tile";
    if (tile != "!") {
      span.innerHTML = tile;
    } else {
      console.log("spaceeeeeee");

      span.innerHTML = " ";
    }
    span.setAttribute("data-letter", word[idx]);
    currentWordEl.append(span);
  });
}

function chooseLetter(e, letter) {
  if (e.target.classList.contains("x")) return;
  e.target.classList.add("x");
  console.log("Letter", letter, currentWord);
  let idx = currentWord.indexOf(letter);
  console.log(idx);
  if (idx > -1) {
    for (let i = 0; i < currentWord.length; i++) {
      console.log(currentWord, currentWord[0]);
      if (currentWord[i] == letter) {
        console.log("Match");
        blanksNLetters[i] = letter;
        document.querySelectorAll(".currentword_tile")[i].innerHTML = letter;
      }
    }
  }
  if (blanksNLetters.join("") == currentWord) {
    console.log("YOU WIN!!");
    fireConfetti();
    addScore();
  }
}

function addScore() {
  for (
    let i = 0;
    i < document.querySelectorAll(".letter-div").length - 1;
    i++
  ) {
    setTimeout(() => {
      addClass(i + 1);
    }, i * 500);
  }
}

function addClass(i = 0) {
  // document.querySelectorAll(".letter-div").forEach((tile) => {
  let tile = document.querySelectorAll(".letter-div")[i];
  if (!tile.classList.contains("x")) {
    console.log("add float!!!");
    tile.classList.add("float");
    score += 10;
    scoreEl.innerHTML = score;
    //   setTimeout(() => {
    //     tile.classList.remove("float");
    //   }, 5500);
    // }
    // });
  }
}

function crashBuildings() {
  for (let i = 0; i < document.querySelectorAll(".building").length; i++) {
    setTimeout(() => {
      document.querySelectorAll(".building")[i].classList.add("earthquake");
      document
        .querySelectorAll(".building")
        [i].querySelectorAll(".div-window")
        .forEach((w) => w.classList.add("earthquake"));
    }, i * 350);
  }
}

crashBuildings();
