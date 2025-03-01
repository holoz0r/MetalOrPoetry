// Game Data

import jsonData from "./db.js";
// game code

document.addEventListener("DOMContentLoaded", function () {



 var score = 0;

 var highScore = localStorage.getItem("highScore") || 0;

 var countdown = 25;

 var timer;

 var randomEntry; 



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



    function startCountdown() {

        timer = setInterval(function () {

            countdown--;

            document.getElementById("countdown").innerText = `Time left: ${countdown}s`;



            if (countdown <= 0) {

                clearInterval(timer);

                handleTimeUp();

            }

        }, 1000);

    }



    function stopCountdown() {

        clearInterval(timer);

        countdown = 25; 

        document.getElementById("countdown").innerText = `Time left: ${countdown}s`;

    }



    function handleTimeUp() {

        stopCountdown();

        score = 0;

        updateScore();

        clearAdditionalInfo();

        generateRandomEntry();

    }





    function metalButtonClick() {

        stopCountdown();

        checkCategoryAndProceed("Metal");

    }



    function poetryButtonClick() {

        stopCountdown();

        checkCategoryAndProceed("Poetry");

    }



    function generateRandomEntry() {

        stopCountdown();

        randomEntry = getRandomEntry();

        displayEntryQuote(randomEntry);

        document.getElementById("metalButton").addEventListener("click", metalButtonClick);

        document.getElementById("poetryButton").addEventListener("click", poetryButtonClick);

        startCountdown();

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

        score = 0;

        feedbackMessage = "Incorrect";

        feedbackElement.style.color = "red";

    }



        // Display feedback message

        document.getElementById("feedbackMessage").innerText = feedbackMessage;



        // Display the additional info

        updateScore();

        stopCountdown();

        displayAdditionalInfo(randomEntry);



        setTimeout(function () {

            clearAdditionalInfo();

			 feedbackElement.innerText = ""; // Clear the feedback message

        feedbackElement.style.color = ""; // Reset the text color

            generateRandomEntry();

        }, 3000);

    }



    generateRandomEntry();

});