const outputField = document.querySelector("#outputvalues");
const submitButton = document.querySelector("#submit-button");
const guessBox = document.querySelector("#guess-box");
const resultsContainer = document.querySelector("#results-container");
const blankWordBlock = document.querySelector("#blank-word");
const correctOrderBlock = document.querySelector("#correct-order");
const currentLevelBlock = document.querySelector("#current-level");

const blankWord = blankWordBlock.textContent;
const correctOrder = correctOrderBlock.textContent;
const nextLevel = parseInt(currentLevelBlock.textContent, 10) + 1;
outputArray = outputField.value.split(",").map(Number);

console.log(typeof nextLevel);
console.log("The next level is", nextLevel);

function getIdsOfImages() {
  var values = [];
  $(".listitemClass").each(function (index) {
    values.push($(this).attr("id").replace("blockno", ""));
  });
  $("#outputvalues").val(values);
}

function checkAnswer(blankWord, correctOrder) {
  console.log("the outputfield value is, ", outputField.value);
  console.log("The output array is", outputArray);
  console.log("The nexxt level is,", nextLevel);
  if (blankWord) {
    if (outputField.value === correctOrder) {
      console.log("It is the correct order. ");
    }

    if (
      outputField.value === correctOrder &&
      guessBox.value.trim().toLowerCase() === blankWord
    ) {
      var winningResult = document.createElement("h1");
      winningResult.textContent = "You Win!";
      resultsContainer.appendChild(winningResult);
    } else {
      console.log("Something isn't right...");
      var losingResult = document.createElement("h1");
      losingResult.textContent = "Something Isn't Right...";
      resultsContainer.appendChild(losingResult);
      console.log("the correct order is, ", correctOrder);
    }
  } else {
    if (outputField.value === correctOrder) {
      console.log("Correct!");
      console.log("the correct order is, ", correctOrder);

      var winningResult = document.createElement("h1");
      var nextLevelButton = document.createElement("button");
      var nextLevelAnchor = document.createElement("a");
      winningResult.textContent = "You Win!";
      nextLevelButton.textContent = "Next Level";
      nextLevelAnchor.href = `/game/${nextLevel}`;
      resultsContainer.appendChild(winningResult);
      nextLevelAnchor.appendChild(nextLevelButton);
      resultsContainer.appendChild(nextLevelAnchor);
      nextLevelButton.addEventListener("click", function () {
        window.location.href = nextLevelButton.href;
      });
    } else {
      console.log("Something isn't right...");
      var losingResult = document.createElement("h1");
      losingResult.textContent = "Something Isn't Right...";
      resultsContainer.appendChild(losingResult);
      console.log("the correct order is, ", correctOrder);
    }
  }
}

$(function () {
  $("#imageListId").sortable({
    update: function (event, ui) {
      getIdsOfImages();
    },
  });
});

submitButton.addEventListener("click", function () {
  checkAnswer(blankWord, correctOrder);
  console.log("I've been clicked!");
});

correctAnswerArray = correctOrder.split(",").map(Number);

console.log("The correct Answer Array is, ", correctAnswerArray);
