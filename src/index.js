function startQuiz(event) {
  event.preventDefault();

  // Validate user input
  const userNameInput = document.getElementById("userName");
  const userName = userNameInput.value.trim();

  if (!userName) {
    alert("Please enter your name.");
    return;
  }

  // Save userName to local storage
  localStorage.setItem("userName", userName);

  // Redirect to the quiz.html page
  window.location.href = "quiz.html";
}

// Event listener for form submission
document.getElementById("quizForm").addEventListener("submit", startQuiz);
