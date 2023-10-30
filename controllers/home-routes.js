const router = require("express").Router();
//const { Users, Words } = require("../models");

// Import the custom middleware

// GET all words for homepage
// router.get


// GET one game
// Use the custom middleware before allowing the user to access the word challenge
// router.get('/games/:id', withAuth, async (req, res) => {


router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
