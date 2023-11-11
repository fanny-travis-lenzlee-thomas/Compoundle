const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Game, UserPuzzle } = require("../models");

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
        "upload_date",
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
      uploadDate: game.upload_date,
    });

    console.log("The username I have is, ", req.session.username);
    console.log("The user Id I have is, ", req.session.userId);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/game/api/users/userPuzzle", async (req, res) => {
  const { username, user_id, level } = req.query;
  const tableName = `${username}${user_id}_up`;
  const solvedValue = await sequelize.query(
    `SELECT puzzle, solved FROM ${tableName} WHERE PUZZLE = ${level}`
  );
  res.json(solvedValue);
});

router.get("/today", async (req, res) => {
  const today = new Date();
  console.log("This is the date I have: ", today);
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  console.log("This is the formatted date, ", formattedDate);

  try {
    const dbGameData = await Game.findOne({
      where: {
        upload_date: formattedDate,
      },
      attributes: [
        "id",
        "words",
        "correct_order",
        "hidden_word",
        "points",
        "level",
        "upload_date",
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
      uploadDate: game.upload_date,
    });

    console.log("The username I have is, ", req.session.username);
    console.log("The user Id I have is, ", req.session.userId);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const dbUserPuzzleData = await UserPuzzle.findByPk(req.params.id, {
      attributes: ["time", "solved", "solved_date", "number_of_attempts"], // <-- Corrected comma here
    });

    const dbUserData = await User.findByPk(req.params.id, {
      attributes: ["username"],
    });

    const userPuzzle = dbUserPuzzleData.get({ plain: true });
    const user = dbUserData.get({ plain: true });

    console.log("user puzzle data:", userPuzzle);
    console.log("user data", user);

    res.render("partials/userpage", {
      username: user.username,
      time: userPuzzle.time,
      number_of_attempts: userPuzzle.number_of_attempts,
      solved: userPuzzle.solved,
      date_solved: userPuzzle.solved_date,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  id = req.session.id;
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
