const router = require("express").Router();
const { Users, Game } = require("../models");

// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all games for homepage
router.get("/", async (req, res) => {
  try {
    const dbGamesData = await Game.findAll({
      attributes: ["id", "words", "correct_order", "hidden_word", "score"],
    });

    const games = dbGamesData.map((game) => game.get({ plain: true }));
    console.log(games);
    res.json(games);

    res.render("homepage", {
      games,
    loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one game
// Use the custom middleware before allowing the user to access the gallery
router.get("/game/:id", async (req, res) => {
  try {
    const dbGameData = await Game.findByPk(req.params.id, {
      attributes: ["id", "words", "correct_order", "hidden_word", "score"],
    });

    const game = dbGameData.get({ plain: true });
    const wordsArray = game.words.split(", ");
    console.log(wordsArray);
    for (i = 0; i < wordsArray.length; i++) {
      console.log(`The word at index ${[i]} is ${wordsArray[i]}! Woohoo!`);
      console.log(`The correct order is, ${game.correct_order}`);
    }

    res.render("partials/wordblock", {
      wordsArray,
      correctOrder: game.correct_order,
      blankWord: game.hidden_word,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // if (req.session.loggedIn) {
  //   // res.redirect('/game/1');
  //   //res.redirect('/');
  //   return;
  // }

  res.render('login');
});

module.exports = router;
