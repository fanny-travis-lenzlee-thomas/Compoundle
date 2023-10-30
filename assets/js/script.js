const outputField = document.querySelector("#outputvalues");
const submitButton = document.querySelector("#submit-button");
const guessBox = document.querySelector("#guess-box");
const resultsContainer = document.querySelector("#results-container");

const blankword = "hand";
const correctOrder = "3,1,5,2,7,4,6";
outputArray = outputField.value.split(",").map(Number);

function getIdsOfImages() {
  var values = [];
  $(".listitemClass").each(function (index) {
    values.push($(this).attr("id").replace("blockNo", ""));
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
  checkAnswer(blankword, correctOrder);
});

correctAnswerArray = correctOrder.split(",").map(Number);

console.log("The correct Answer Array is, ", correctAnswerArray);
