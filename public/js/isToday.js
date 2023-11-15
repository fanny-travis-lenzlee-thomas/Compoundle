// Function to format a date as MM/DD/YYYY
function formatDate(date) {
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  let yyyy = date.getFullYear();
  return mm + "/" + dd + "/" + yyyy;
}

// Get today's date
let today = new Date();

// Get tomorrow's date
let tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

// Get the upload date element
let uploadDateElement = document.querySelector("#solved-page-upload-date");
let nextLevelButton = document.querySelector("#next-level-button");
let nextLevelAnchor = document.querySelector("#next-level-anchor");

// Get the text content of the upload date
let uploadDateText = uploadDateElement.textContent.trim();

// Parse the upload date text to a Date object
let uploadDate = new Date(uploadDateText);

// Format today and tomorrow for comparison
let todayFormatted = formatDate(today);
let tomorrowFormatted = formatDate(tomorrow);
let uploadDateFormatted = formatDate(uploadDate);

// Compare against uploadDate
if (
  uploadDateFormatted === todayFormatted ||
  uploadDateFormatted === tomorrowFormatted
) {
  console.log("This is today's puzzle or tomorow's puzzle");
  nextLevelAnchor.href = "/";
  nextLevelButton.textContent = "Home";
}

// Call the function to update the next level button on page load
