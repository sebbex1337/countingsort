// ===========================
// =     GLOBALS/MODELS      =
// ===========================
let numbers = [];
let counts = [];
let maxNum;

// prettier-ignore
const GRADES = [
  -3, // Index 0
  0,  // Index 1
  2,  // Index 2
  4,  // Index 3
  7,  // Index 4
  10, // Index 5
  12  // Index 6
];

window.addEventListener("load", init);

// ===========================
// =        CONTROLLER       =
// ===========================
function init() {
  const randomizeBtn = document.querySelector("#randomizeBtn");
  randomizeBtn.addEventListener("click", startNewGame);
  const maxNum = document.querySelector("#maxNum");
  maxNum.addEventListener("input", checkNum);
}

function startNewGame() {
  maxNum = Number(document.querySelector("#maxNum").value);
  // Generer et array med tilfældige tal fra listen af GRADES
  numbers = Array.from({ length: maxNum }, () => {
    const randomIndex = Math.floor(Math.random() * GRADES.length);
    return GRADES[randomIndex];
  });
  console.log(numbers);
  setupGame();
  countingSort();
}

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function countingSort() {
  // Reset counts array
  counts = Array.from({ length: GRADES.length }).fill(0);
  displayCountsArray();

  const numberElements = document.querySelectorAll(".number");
  const countElements = document.querySelectorAll(".count-cell");

  // Count the numbers
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    const numIndex = checkNumbers(num);

    // Highlight nuværende tal
    numberElements[i].classList.add("highlight-number");

    // Highlight count der skal opdateres
    countElements[numIndex].classList.add("highlight-number");

    counts[numIndex]++;
    countElements[numIndex].textContent = counts[numIndex];
    await delay(500);
    // Fjern highlight efter delay
    numberElements[i].classList.remove("highlight-number");
    countElements[numIndex].classList.remove("highlight-number");
  }
  console.log(counts);
  // Sort the numbers
  let sortedNumbers = [];
  for (let i = 0; i < counts.length; i++) {
    const count = counts[i];
    const num = GRADES[i];
    for (let j = 0; j < count; j++) {
      sortedNumbers.push(num);
    }
  }
  console.log(sortedNumbers);
  // Update the numbers
  numbers = sortedNumbers;
  const outputZone = document.querySelector("#outputZone");
  outputZone.scrollIntoView({ behavior: "smooth" });
  await delay(100);
  displaySortedArray();
}

// Returnerer index i GRADES arrayet
function checkNumbers(num) {
  switch (num) {
    case -3:
      return 0;
    case 0:
      return 1;
    case 2:
      return 2;
    case 4:
      return 3;
    case 7:
      return 4;
    case 10:
      return 5;
    case 12:
      return 6;
  }
}

// ===========================
// =        VIEW             =
// ===========================

function checkNum() {
  const randomizeBtn = document.querySelector("#randomizeBtn");
  const maxNumInput = Number(document.querySelector("#maxNum").value);
  if (maxNumInput >= 5 && maxNumInput <= 50) {
    randomizeBtn.disabled = false;
  } else {
    randomizeBtn.disabled = true;
  }
}

function setupGame() {
  // Setup input zonen
  const inputZone = document.querySelector("#inputZone");
  inputZone.innerHTML = "";
  for (let i = 0; i < numbers.length; i++) {
    const numElement = document.createElement("div");
    numElement.classList.add("number");
    numElement.textContent = numbers[i];

    inputZone.appendChild(numElement);
  }
  // Setup grades zonen
  showGradesArray();
}

function showGradesArray() {
  const gradesArray = document.querySelector("#grades");
  gradesArray.innerHTML = "";
  for (let i = 0; i < GRADES.length; i++) {
    const gradeElement = document.createElement("div");
    gradeElement.classList.add("grade");
    gradeElement.textContent = GRADES[i];

    gradesArray.appendChild(gradeElement);
  }
}

function displayCountsArray() {
  // Hvis count array under grades
  const countArray = document.querySelector("#countArray");
  countArray.innerHTML = "";
  for (let i = 0; i < counts.length; i++) {
    const countElement = document.createElement("div");
    countElement.classList.add("count-cell");
    countElement.textContent = counts[i];

    countArray.appendChild(countElement);
  }
}

async function displaySortedArray() {
  const outputZone = document.querySelector("#outputZone");
  outputZone.innerHTML = "";
  for (let i = 0; i < numbers.length; i++) {
    const numElement = document.createElement("div");
    numElement.classList.add("number");
    numElement.textContent = numbers[i];

    outputZone.appendChild(numElement);
    await delay(500);
  }
  createConfetti();
}

function createConfetti() {
  const celebration = document.createElement("div");
  celebration.className = "celebration";
  document.body.appendChild(celebration);

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
    celebration.appendChild(confetti);
  }

  setTimeout(() => celebration.remove(), 5000);
}
