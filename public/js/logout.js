const dateTimeLine = document.querySelector("#date-time");

const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to log out.");
  }
};

function updateDateTime() {
  const currentDateTime = dayjs().format("MM/DD/YYYY");
  dateTimeLine.textContent = currentDateTime;
}

updateDateTime();

document.querySelector("#logout").addEventListener("click", logout);
