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
const usernameBlock = document.querySelector("#username-line");
const mobileDiv = document.querySelector("#mobile-div");
const timerSpan = document.querySelector("#timer-span");
const numberOfAttemptsSpan = document.querySelector("#number-of-attempts-span");
const dateTimeLine = document.querySelector("#date-time");
const uploadDateSpan = document.querySelector("#upload-date-span");
const imageList = document.querySelector("#imageListId");
const hintButton = document.querySelector("#hint-button");
let blankWord = blankWordBlock.textContent;
const capitalizedBlankWord =
  blankWord.charAt(0).toUpperCase() + blankWord.slice(1);

const correctOrder = correctOrderBlock.textContent;
const currentLevel = parseInt(currentLevelBlock.textContent, 10);
const nextLevel = currentLevel + 1;
const points = parseInt(pointsBlock.textContent, 10);
const userId = parseInt(userIdBlock.textContent, 10);
const username = usernameBlock.textContent;
let newScore;
let totalSeconds = 0;
let intervalId;
let numberOfAttempts = 0;
let solved;
let loggedIn;
let dateSolved;
let hintButtonClickCount = 0;
let emojiArray = [];

correctAnswerArray = correctOrder.split(",").map(Number);
//checks if the user is playing on mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

//If they are, adds the blank word to the guess box as currently the jquery we are using does not support input boxes.
if (isMobile && nextLevel > 16) {
  guessBox.parentElement.textContent = capitalizedBlankWord;
  blankWord = null;
  guessBox.remove();
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
  numberOfAttempts++;
  numberOfAttemptsSpan.textContent = numberOfAttempts;

  //Removes something isn't right notice if present on screen
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
      if (blankWord) {
        if (element.contains(guessBox.parentElement)) {
          if (outputArray[i] == correctAnswerArray[i]) {
            if (
              blankWord &&
              guessBox.value.trim().toLowerCase() !== blankWord
            ) {
              element.classList.add("flip-partially-correct");
              emojiArray.push("🟨");
              element.style.animationDelay = `${i * 150}ms`;
            } else {
              element.classList.add("flip-correct");
              emojiArray.push("🟩");
              element.style.animationDelay = `${i * 150}ms`;
            }
          } else {
            element.classList.add("flip-incorrect");
            emojiArray.push("🟥");

            element.style.animationDelay = `${i * 150}ms`;
          }
        } else {
          if (outputArray[i] == correctAnswerArray[i]) {
            element.classList.add("flip-correct");
            emojiArray.push("🟩");

            element.style.animationDelay = `${i * 150}ms`;
          } else {
            element.classList.add("flip-incorrect");
            emojiArray.push("🟥");
            element.style.animationDelay = `${i * 150}ms`;
          }
        }
      } else {
        for (var i = 0; i < correctAnswerArray.length; i++) {
          var elements = document.getElementsByClassName("listitemClass");
          var element = elements[i];
          element.addEventListener("mousedown", resetColors);
          if (outputArray[i] == correctAnswerArray[i]) {
            element.classList.add("flip-correct");
            emojiArray.push("🟩");
            element.style.animationDelay = `${i * 100}ms`;
            // element.style.backgroundColor = "var(--success-1)";
          } else {
            element.classList.add("flip-incorrect");
            emojiArray.push("🟥");
            element.style.animationDelay = `${i * 100}ms`;
            // element.style.backgroundColor = "var(--error)";
          }
        }
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
      clearInterval(intervalId);
      var winningResult = document.createElement("h1");
      var nextLevelButton = document.createElement("button");
      var nextLevelAnchor = document.createElement("a");
      winningResult.textContent = "You Win!";
      winningResult.id = "you-win";
      nextLevelButton.textContent = "Next Level";
      nextLevelAnchor.href = `/game/${nextLevel}`;
      nextLevelButton.id = "next-level-button";
      newScore = currentScore + points;
      dateSolved = dateTimeLine.textContent;
      currentScoreBlock.textContent = newScore;
      for (var i = 0; i < correctAnswerArray.length; i++) {
        var elements = document.getElementsByClassName("listitemClass");
        var element = elements[i];
        element.removeEventListener("mousedown", resetColors);
      }
      resultsContainer.appendChild(winningResult);
      nextLevelAnchor.appendChild(nextLevelButton);
      resultsContainer.appendChild(nextLevelAnchor);
      solved = true;
      //Update the users userPuzzle table if they are logged in
      if (username.length > 0) {
        loggedIn = true;
      }
      if (loggedIn) {
        updateUserPuzzleData(
          totalSeconds,
          numberOfAttempts,
          username,
          userId,
          currentLevel,
          solved,
          dateSolved
        );
      }
      //Create the elements for the confetti animation
      var confettiContainer = document.getElementById("confettiContainer");
      for (var i = 0; i < 13; i++) {
        var confettiPiece = document.createElement("div");
        confettiPiece.className = "confetti-piece";
        confettiContainer.appendChild(confettiPiece);
      }
      resultsContainer.appendChild(confettiContainer);

      submitButton.remove();
      hintButton.remove();
      nextLevelButton.addEventListener("click", function () {
        window.location.href = nextLevelButton.href;
      });

      //Checks if user is playing the daily puzzle
      if (dateTimeLine.textContent === uploadDateSpan.textContent) {
        nextLevelButton.remove();
        // winningResult.textContent = "You beat today's puzzle!! ";
        var moreLevelsButton = document.createElement("button");
        var moreLevelsAnchor = document.createElement("a");
        moreLevelsButton.textContent = "More Levels";
        if (loggedIn) {
          moreLevelsAnchor.href = `/api/users/puzzles`;
        } else {
          moreLevelsAnchor.href = `/puzzles`;
        }
        moreLevelsButton.id = "next-level-button";
        moreLevelsAnchor.appendChild(moreLevelsButton);
        resultsContainer.appendChild(moreLevelsButton);
        const shareButton = document.createElement("button");
        shareButton.id = "share-button";
        shareButton.textContent = "Share";
        shareButton.classList.add("next-level-button");
        resultsContainer.appendChild(shareButton);
        const compoundleLink = window.location.href;
        var emojiParagraph = "";
        for (var i = 0; i < emojiArray.length; i++) {
          emojiParagraph += emojiArray[i];

          // adds a line break every 3, 4, 5, 6, or 7 words depending on the length fo the level
          if ((i + 1) % correctAnswerArray.length === 0) {
            emojiParagraph += "\n";
          }
        }

        console.log(
          `I have access to these! ${totalSeconds}, ${numberOfAttempts}, ${emojiParagraph}`
        );
        shareButton.addEventListener("click", async () => {
          try {
            if (navigator.share) {
              await navigator.share({
                title: "Compoundle",
                text: `I beat today's Compoundle!\n ${totalSeconds} seconds in ${numberOfAttempts} tries!\n${emojiParagraph}`,
                url: compoundleLink,
              });
            } else {
              alert("Coming soon!");
            }
          } catch (error) {
            console.error("Error sharing:", error);
          }
        });

        moreLevelsButton.addEventListener("click", function () {
          window.location.href = moreLevelsAnchor.href;
        });
      }
      //HTML edits for an incorrect answer.
    } else {
      var losingResult = document.createElement("h1");
      losingResult.id = "losing-result";
      losingResult.display = "inline-block";
      losingResult.textContent = "Something Isn't Right...";
      hintButton.classList.remove("hidden");
      resultsContainer.appendChild(losingResult);
    }

    // Creates a sharable emoji block of path to correct answer

    console.log(emojiArray);
    console.log(emojiParagraph);

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
    elements[i].classList.remove("flip-correct");
    elements[i].classList.remove("flip-incorrect");
    elements[i].classList.remove("flip-partially-correct");
    elements[i].style.backgroundColor = "var(--secondary)";
  }
}

//Function for rearranging the wordblocks
$(function () {
  const imageList = $("#imageListId");

  imageList
    .sortable({
      update: function (event, ui) {
        getIdsOfBlocks();
      },
    })
    .disableSelection();

  // Event listener on the submit button
  submitButton.addEventListener("click", async function () {
    checkButtonClicked = true;

    const isCorrect = await checkAnswer(blankWord, correctOrder);

    // Enable or disable sorting based on the isCorrect condition
    if (isCorrect) {
      imageList.sortable("disable");
    } else {
      imageList.sortable("enable");
    }

    updateScoreOnServer(newScore, nextLevel, userId);
  });
});

function countTime() {
  ++totalSeconds;
  timerSpan.textContent = totalSeconds;
}

function updateScoreOnServer() {
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

function updateUserPuzzleData(totalSeconds, numberOfAttempts) {
  fetch(
    `api/users/userPuzzle?username=${username}&user_id=${userId}&level=${currentLevel}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0 && data[0][0] && data[0][0].solved) {
        console.log("The puzzle was previously solved");
        fetch("/api/users/userPuzzle", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            user_id: userId,
            time: totalSeconds,
            number_of_attempts: numberOfAttempts,
            level: currentLevel,
            solved: solved,
            solved_date: dateSolved,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Time updated successfully:", data.time);
          })
          .catch((error) => {
            console.error("Error updating score:", error);
          });
      } else {
        console.log("The puzzle was not previously solved");
        fetch("/api/users/userPuzzle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            user_id: userId,
            time: totalSeconds,
            number_of_attempts: numberOfAttempts,
            level: currentLevel,
            solved: solved,
            solved_date: dateSolved,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Time updated successfully:", data.time);
          })
          .catch((error) => {
            console.error("Error updating score:", error);
          });
      }
    })
    .catch((error) => {
      console.error("Error updating score:", error);
    });
}

function addHint(i) {
  if (hintButtonClickCount <= blankWord.length) {
    console.log("This is the hint button click count", hintButtonClickCount);
    guessBox.value = "";
    for (i = 0; i < hintButtonClickCount; i++) guessBox.value += blankWord[i];
  }
  checkButtonClicked = false;
}

//Function that adds instructions for the blank word portion
function isDemoLevel() {
  if (nextLevel === 17) {
    howToPlayInstructions.textContent =
      "Fill in the blank word to complete the chain";
  }
}
function updateDateTime() {
  const currentDateTime = dayjs().format("MM/DD/YYYY");
  dateTimeLine.textContent = currentDateTime;
}

// Update the date and time initially and then every second
updateDateTime();

getIdsOfBlocks();
isDemoLevel();
intervalId = setInterval(countTime, 1000);

// console.log(session);

//Event listener on the submit button
// submitButton.addEventListener("click", async function () {
//   await checkAnswer(blankWord, correctOrder);
//   updateScoreOnServer(newScore, nextLevel, userId);
// });

hintButton.addEventListener("click", function () {
  if (checkButtonClicked) {
    hintButtonClickCount++;

    addHint(hintButtonClickCount);
  } else {
    // Display a message or perform any action to indicate that the check button needs to be clicked first.
    console.log("Please click the check button first.");
  }
});

document.addEventListener("DOMContentLoaded", function (totalSeconds) {
  const time = totalSeconds;
});
