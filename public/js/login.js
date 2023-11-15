const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in.");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  console.log(`This is the password length ${password.length}`);
  if (password.length < 6) {
    alert("Please use at least 8 characters for your password");
    return;
  }
  if (username && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const userId = await response.json();
    const newUserId = userId.id;

    console.log("The new user Id is, ", newUserId);

    const userPuzzleData = await fetch("api/users/createTable", {
      method: "POST",
      body: JSON.stringify({ newUserId, username }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(userPuzzleData);

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to sign up.");
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
