// Sample quiz data
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "London", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    question: "What is the currency of Japan?",
    options: ["Yuan", "Yen", "Won", "Ringgit"],
    correctAnswer: "Yen",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "Mark Twain",
    ],
    correctAnswer: "William Shakespeare",
  },
  {
    question: "How many bones are there in the adult human body?",
    options: ["206", "214", "220", "230"],
    correctAnswer: "206",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Southern Ocean",
      "Pacific Ocean",
    ],
    correctAnswer: "Pacific Ocean",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
  },
  {
    question: "Who are the co-founders of Google?",
    options: [
      "Bill Gates and Steve Jobs",
      "Mark Zuckerberg and Dustin Moskovitz",
      "Larry Page and Sergey Brin",
      "Elon Musk and Jeff Bezos",
    ],
    correctAnswer: "Larry Page and Sergey Brin",
  },
  {
    question: "What is the name of our galaxy?",
    options: ["Andromeda", "Milky Way", "Sombrero", "Triangulum"],
    correctAnswer: "Milky Way",
  },
];

// Set quiz duration in seconds
const quizDuration = 60;
let currentQuestionIndex = 0;
let timeRemaining = quizDuration;
let timer;
let score = 0;
let quizCompleted = false;

document.addEventListener("DOMContentLoaded", startQuiz);

function startQuiz() {
  const userName = localStorage.getItem("userName");

  if (!userName || quizCompleted) {
    alert("Please go back to the home page and start the quiz.");
    window.location.href = "home.html";
    return;
  }

  displayQuestion();
  startTimer();
}
function displayQuestion() {
  const questionContainer = document.getElementById("question-container");
  const optionsContainer = document.getElementById("options-container");

  questionContainer.innerHTML = quizData[currentQuestionIndex].question;

  optionsContainer.innerHTML = "";
  for (const option of quizData[currentQuestionIndex].options) {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => selectOption(option);
    optionsContainer.appendChild(button);
  }
}
function selectOption(selectedOption) {
  clearTimeout(timer);

  const resultContainer = document.getElementById("result-container");
  const optionsContainer = document.getElementById("options-container");
  const correctAnswer = quizData[currentQuestionIndex].correctAnswer;

  for (const button of optionsContainer.children) {
    if (button.textContent === selectedOption) {
      button.classList.add("selected");
    }
    button.disabled = true;
  }

  if (selectedOption === correctAnswer) {
    resultContainer.textContent = "Correct!";
    score++;
  } else {
    resultContainer.textContent = `Incorrect! The correct answer is: ${correctAnswer}`;

    for (const button of optionsContainer.children) {
      if (button.textContent === correctAnswer) {
        button.classList.add("correct");
      }
    }
  }

  document.getElementById("submit-btn").disabled = true; // Disable submit button

  if (currentQuestionIndex < quizData.length - 1) {
    setTimeout(() => {
      resetOptions(optionsContainer);
      resultContainer.textContent = "";
      currentQuestionIndex++;
      displayQuestion();
      document.getElementById("submit-btn").disabled = false; // Enable submit button for the next question
      startTimer();
    }, 2000);
  } else {
    setTimeout(() => {
      endQuiz();
    }, 2000);
  }
}

function resetOptions(optionsContainer) {
  for (const button of optionsContainer.children) {
    button.classList.remove("selected", "correct");
    button.disabled = false;
  }
}

function startTimer() {
  const timeElement = document.getElementById("time");
  timeElement.textContent = timeRemaining;

  timer = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      timeElement.textContent = timeRemaining;
    } else {
      endQuiz();
    }
  }, 2000);
}

function endQuiz() {
  clearInterval(timer);
  const quizContainer = document.getElementById("quiz-container");
  const resultContainer = document.getElementById("result-container");

  const userName = localStorage.getItem("userName");

  resultContainer.innerHTML = `<div id="result-container">Quiz completed, ${userName}! Your total score is: ${score}/${quizData.length}</div>`;

  localStorage.removeItem("userName");

  setTimeout(() => {
    window.location.href = "home.html";
  }, 5000);
}
