// Game Data
import jsonData from "./db.js";

// Game Code
document.addEventListener("DOMContentLoaded", function () {
  var score = 0;
  var highScore = localStorage.getItem("highScore") || 0;
  var timer;
  var randomEntry;
  var globalCountdown = 60; // Initial value in seconds

  function getRandomEntry() {
    var randomIndex = Math.floor(Math.random() * jsonData.length);
    return jsonData[randomIndex];
  }

  function displayEntryQuote(entry) {
    var randomEntryElement = document.getElementById("randomEntry");
    randomEntryElement.innerHTML = `${entry.quote.replace(/\n/g, '<br>')}`;
  }

  function displayAdditionalInfo(entry) {
    var additionalInfoElement = document.getElementById("additionalInfo");
    additionalInfoElement.innerHTML = `<p>Author: ${entry.author}<br>Title: ${entry.title}</p>`;
  }

  function clearAdditionalInfo() {
    var additionalInfoElement = document.getElementById("additionalInfo");
    additionalInfoElement.innerHTML = "";
    clearFeedbackMessage();
  }

  function clearFeedbackMessage() {
    var feedbackMessageElement = document.getElementById("feedbackMessage");
    feedbackMessageElement.innerText = "";
  }

  function updateScore() {
    document.getElementById("yourScore").innerText = `Your score: ${score}`;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      document.getElementById("highScore").innerText = `Your High Score: ${highScore}`;
    }
  }

  function startGlobalCountdown() {
    timer = setInterval(function () {
      globalCountdown--;
      document.getElementById("globalCountdown").innerText = `Time left: ${globalCountdown}s`;

      if (globalCountdown <= 0) {
        clearInterval(timer);
        handleTimeUp();
      }
    }, 1000);
  }

  function handleTimeUp() {
    score = 0;
    updateScore();
    clearAdditionalInfo();
    generateRandomEntry();
    globalCountdown = 60; // Reset global countdown to 60 seconds
    document.getElementById("globalCountdown").innerText = `Time left: ${globalCountdown}s`;
    startGlobalCountdown();
  }

  function metalButtonClick() {
    checkCategoryAndProceed("Metal");
  }

  function poetryButtonClick() {
    checkCategoryAndProceed("Poetry");
  }

  function generateRandomEntry() {
    randomEntry = getRandomEntry();
    displayEntryQuote(randomEntry);
    document.getElementById("metalButton").addEventListener("click", metalButtonClick);
    document.getElementById("poetryButton").addEventListener("click", poetryButtonClick);
  }

  document.getElementById("newEntryButton").addEventListener("click", function () {
    score = 0;
    updateScore();
    clearAdditionalInfo();
    generateRandomEntry();
  });

  function checkCategoryAndProceed(selectedCategory) {
    var metalButton = document.getElementById("metalButton");
    var poetryButton = document.getElementById("poetryButton");
    metalButton.removeEventListener("click", metalButtonClick);
    poetryButton.removeEventListener("click", poetryButtonClick);

    var feedbackMessage;
    var feedbackElement = document.getElementById("feedbackMessage");

    if (randomEntry.category === selectedCategory) {
      score++;
      feedbackMessage = "Correct";
      feedbackElement.style.color = "green";
    } else {
      feedbackMessage = "Incorrect";
      feedbackElement.style.color = "red";
    }

    // Display feedback message
    document.getElementById("feedbackMessage").innerText = feedbackMessage;

    // Display the additional info
    updateScore();
    displayAdditionalInfo(randomEntry);

    setTimeout(function () {
      clearAdditionalInfo();
      feedbackElement.innerText = ""; // Clear the feedback message
      feedbackElement.style.color = ""; // Reset the text color
      generateRandomEntry();
    }, 300);
  }

  generateRandomEntry();
  startGlobalCountdown();
});
