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

  // Check if the user is on the home page before redirecting
  const currentPage = window.location.pathname;
  if (currentPage.endsWith("index.html")) {
    // Redirect to the quiz.html page
    window.location.href = "quiz.html";
  }
}

// Event listener for form submission
document.getElementById("quizForm").addEventListener("submit", startQuiz);
