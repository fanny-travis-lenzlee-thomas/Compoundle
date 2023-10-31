const outputField = document.querySelector("#outputvalues");
const submitButton = document.querySelector("#submit-button");
const guessBox = document.querySelector("#guess-box");
const resultsContainer = document.querySelector("#results-container");
const blankWordBlock = document.querySelector("#blank-word");
const correctOrderBlock = document.querySelector("#correct-order");

const blankWord = blankWordBlock.textContent;
const correctOrder = correctOrderBlock.textContent;
outputArray = outputField.value.split(",").map(Number);

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

  if (outputField.value === correctOrder) {
    console.log("It is the correct order. ");
  }

  if (
    outputField.value === correctOrder &&
    guessBox.value.trim().toLowerCase() === blankWord
  ) {
    console.log("Correct!");
    console.log("the correct order is, ", correctOrder);

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
