const outputField = document.querySelector("#outputvalues");
const submitButton = document.querySelector("#submit-button");
const guessBox = document.querySelector("#guess-box");
const resultsContainer = document.querySelector("#results-container");
const correctOrderBlock = document.querySelector("#correct-order");
const currentLevelBlock = document.querySelector("#current-level");
const currentScoreBlock = document.querySelector("#score-line");
const blankWordBlock = document.querySelector("#blank-word");
const pointsBlock = document.querySelector("#points-line");
const userIdBlock = document.querySelector("#user-id-line");

const blankWord = blankWordBlock.textContent;
const correctOrder = correctOrderBlock.textContent;
const nextLevel = parseInt(currentLevelBlock.textContent, 10) + 1;
const points = parseInt(pointsBlock.textContent, 10);
const userId = parseInt(userIdBlock.textContent, 10);

if (currentScoreBlock.textContent > 0) {
  currentScore = parseInt(currentScoreBlock.textContent, 10);
} else {
  currentScore = 0;
}

console.log("The current score is, ", currentScore);
console.log("This level is worth this many points: ", points);

outputArray = outputField.value.split(",").map(Number);

console.log(typeof nextLevel);
console.log("The next level is", nextLevel);

function getIdsOfBlocks() {
  var values = [];
  $(".listitemClass").each(function (index) {
    values.push($(this).attr("id").replace("blockno", ""));
  });
  $("#outputvalues").val(values);
}

function checkAnswer(blankWord, correctOrder) {
  return new Promise((resolve) => {
    console.log("the outputfield value is, ", outputField.value);
    console.log("The output array is", outputArray);
    console.log("The nexxt level is,", nextLevel);

    let isCorrect = false;

    if (blankWord) {
      isCorrect =
        outputField.value === correctOrder &&
        guessBox.value.trim().toLowerCase() === blankWord;
    } else {
      isCorrect = outputField.value === correctOrder;
    }

    if (isCorrect) {
      var winningResult = document.createElement("h1");
      var nextLevelButton = document.createElement("button");
      var nextLevelAnchor = document.createElement("a");
      winningResult.textContent = "You Win!";
      nextLevelButton.textContent = "Next Level";
      nextLevelAnchor.href = `/game/${nextLevel}`;
      nextLevelButton.id = "next-level-button";
      newScore = currentScore + points;
      currentScoreBlock.textContent = newScore;
      resultsContainer.appendChild(winningResult);
      nextLevelAnchor.appendChild(nextLevelButton);
      resultsContainer.appendChild(nextLevelAnchor);
      submitButton.remove();
      nextLevelButton.addEventListener("click", function () {
        window.location.href = nextLevelButton.href;
      });
    } else {
      console.log("Something isn't right...");
      var losingResult = document.createElement("h1");
      losingResult.textContent = "Something Isn't Right...";
      resultsContainer.appendChild(losingResult);
      setTimeout(() => {
        resultsContainer.removeChild(losingResult);
      }, 2000);
    }

    resolve(isCorrect);
  });
}

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
  console.log("This is the new score, ", newScore);
  console.log("This is the next level", nextLevel);
  console.log("This is the user Id, ", userId);
  // Update the user's score
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

submitButton.addEventListener("click", async function () {
  await checkAnswer(blankWord, correctOrder);
  updateScoreOnServer(newScore, nextLevel, userId);

  console.log("I've been clicked!");
});

correctAnswerArray = correctOrder.split(",").map(Number);

console.log("The correct Answer Array is, ", correctAnswerArray);
