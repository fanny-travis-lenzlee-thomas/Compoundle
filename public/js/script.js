const outputField = document.querySelector("#outputvalues");
const howToPlayInstructions = document.querySelector(
  "#how-to-play-instructions"
);
const submitButton = document.querySelector("#submit-button");
const guessBox = document.querySelector("#guess-box");

const resultsContainer = document.querySelector("#results-container");
const correctOrderBlock = document.querySelector("#correct-order");
const currentLevelBlock = document.querySelector("#current-level");
const currentScoreBlock = document.querySelector("#score-line");
const blankWordBlock = document.querySelector("#blank-word");
const pointsBlock = document.querySelector("#points-line");
const userIdBlock = document.querySelector("#user-id-line");
const mobileDiv = document.querySelector("#mobile-div");

const blankWord = blankWordBlock.textContent;
const capitalizedBlankWord =
  blankWord.charAt(0).toUpperCase() + blankWord.slice(1);

const correctOrder = correctOrderBlock.textContent;
const nextLevel = parseInt(currentLevelBlock.textContent, 10) + 1;
const points = parseInt(pointsBlock.textContent, 10);
const userId = parseInt(userIdBlock.textContent, 10);
let newScore;

correctAnswerArray = correctOrder.split(",").map(Number);
//checks if the user is playing on mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

//If they are, adds the blank word to the guess box as currently the jquery we are using does not support input boxes.
if (isMobile && nextLevel > 16) {
  guessBox.value = capitalizedBlankWord;
}

//Gets current score if it exists, or sets it to 0
if (currentScoreBlock.textContent >= 0) {
  currentScore = parseInt(currentScoreBlock.textContent, 10);
} else {
  currentScore = 0;
}

//Function that gets the ID of each block
function getIdsOfBlocks() {
  var values = [];
  $(".listitemClass").each(function (index) {
    values.push($(this).attr("id").replace("blockno", ""));
  });
  $("#outputvalues").val(values);
}

function checkAnswer(blankWord, correctOrder) {
  //Checks if there is already a losing-result element, and if there is, removes it.

  var existingLosingResult = document.getElementById("losing-result");
  if (existingLosingResult) {
    resultsContainer.removeChild(existingLosingResult);
  }

  //Promise that checks the order for correctness
  return new Promise((resolve) => {
    //Getting arrays of user order and correct order to check correctness
    outputString = outputField.value;
    var outputArray = outputString.split(",").map(Number);
    let isCorrect = false;

    //For loop that checks the position of each block and adds a background color depending on its correctness
    for (var i = 0; i < correctAnswerArray.length; i++) {
      var elements = document.getElementsByClassName("listitemClass");
      var element = elements[i];
      element.addEventListener("mousedown", resetColors);
      if (outputArray[i] == correctAnswerArray[i]) {
        element.classList.add("flip");
        element.style.animationDelay = `${i * 100}ms`;
        element.style.backgroundColor = "var(--success-1)";
      } else {
        element.classList.add("flip");
        element.style.animationDelay = `${i * 100}ms`;
        element.style.backgroundColor = "var(--error)";
      }
    }

    //Checks if the level includes a blank word or not, and updates the criteria for a correct response accordingly.
    if (blankWord) {
      isCorrect =
        outputField.value === correctOrder &&
        guessBox.value.trim().toLowerCase() === blankWord;
    } else {
      isCorrect = outputField.value === correctOrder;
    }

    //HTML edits for a correct answer.
    if (isCorrect) {
      var winningResult = document.createElement("h1");
      var nextLevelButton = document.createElement("button");
      var nextLevelAnchor = document.createElement("a");
      winningResult.textContent = "You Win!";
      winningResult.id = "you-win";
      nextLevelButton.textContent = "Next Level";
      nextLevelAnchor.href = `/game/${nextLevel}`;
      nextLevelButton.id = "next-level-button";
      newScore = currentScore + points;
      currentScoreBlock.textContent = newScore;
      resultsContainer.appendChild(winningResult);
      nextLevelAnchor.appendChild(nextLevelButton);
      resultsContainer.appendChild(nextLevelAnchor);

      //Create the elements for the confetti animation
      var confettiContainer = document.getElementById("confettiContainer");
      for (var i = 0; i < 13; i++) {
        var confettiPiece = document.createElement("div");
        confettiPiece.className = "confetti-piece";
        confettiContainer.appendChild(confettiPiece);
      }
      resultsContainer.appendChild(confettiContainer);

      submitButton.remove();
      nextLevelButton.addEventListener("click", function () {
        window.location.href = nextLevelButton.href;
      });

      if (nextLevel === 65) {
        nextLevelButton.remove();
        winningResult.textContent =
          "You beat all the levels! Congratulations! ";
      }
      //HTML edits for an incorrect answer.
    } else {
      var losingResult = document.createElement("h1");
      losingResult.id = "losing-result";
      losingResult.display = "inline-block";
      losingResult.textContent = "Something Isn't Right...";
      resultsContainer.appendChild(losingResult);
    }

    resolve(isCorrect);
  });
}

//Function that resest the colors of the blocks after a guess.
function resetColors() {
  var elements = document.getElementsByClassName("listitemClass");
  var losingResultElement = document.getElementById("losing-result");
  if (losingResultElement) {
    // If it exists, remove it
    losingResultElement.remove();
  }

  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove("flip");
    elements[i].style.backgroundColor = "var(--secondary)";
  }
}

//Function for rearranging the wordblocks
$(function () {
  $("#imageListId")
    .sortable({
      update: function (event, ui) {
        getIdsOfBlocks();
      },
    })
    .disableSelection();
});

function updateScoreOnServer(newScore, nextLevel, userId) {
  // Updates the user's score via a put request
  fetch(`/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newScore: newScore,
      nextLevel: nextLevel,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Score updated successfully:", data.newScore);
    })
    .catch((error) => {
      console.error("Error updating score:", error);
    });
}

//Function that adds instructions for the blank word portion
function isDemoLevel() {
  if (nextLevel === 17) {
    howToPlayInstructions.textContent =
      "Fill in the blank word to complete the chain";
  }
}

getIdsOfBlocks();
isDemoLevel();

//Event listener on the submit button
submitButton.addEventListener("click", async function () {
  await checkAnswer(blankWord, correctOrder);
  updateScoreOnServer(newScore, nextLevel, userId);
});
