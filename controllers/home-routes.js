const router = require("express").Router();
const { User, Game } = require("../models");

// Import the custom middleware
const withAuth = require("../utils/auth");

// GET all games for homepage
router.get("/", async (req, res) => {
  try {
    const dbGamesData = await Game.findAll({
      attributes: ["id", "words", "correct_order", "hidden_word", "points"],
    });

    const games = dbGamesData.map((game) => game.get({ plain: true }));
    // console.log(games);
    // res.json(games);

    res.render("homepage", {
      games,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      currentLevel: req.session.currentLevel,
    });
    console.log(req.session.username);
    console.log("This is the current user level, ", req.session.currentLevel);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one game
router.get("/game/:id", async (req, res) => {
  try {
    const dbGameData = await Game.findByPk(req.params.id, {
      attributes: [
        "id",
        "words",
        "correct_order",
        "hidden_word",
        "points",
        "level",
      ],
    });

    const game = dbGameData.get({ plain: true });
    const wordsArray = game.words.split(", ");

    console.log("Game data:", game);

    res.render("partials/wordblock", {
      wordsArray,
      correctOrder: game.correct_order,
      blankWord: game.hidden_word,
      level: game.id,
      points: game.points,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      score: req.session.userScore,
      currentLevel: req.session.currentLevel,
      userId: req.session.userId,
    });

    console.log("The username I have is, ", req.session.username);
    console.log("The user Id I have is, ", req.session.userId);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/user/:id");

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
