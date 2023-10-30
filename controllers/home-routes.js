const router = require("express").Router();
const { Users, Game } = require("../models");

// Import the custom middleware

// GET all words for homepage
// router.get

// GET one game
// Use the custom middleware before allowing the user to access the word challenge
// router.get('/games/:id', withAuth, async (req, res) => {

// GET all games for homepage
router.get("/", async (req, res) => {
  try {
    const dbGamesData = await Game.findAll({
      attributes: ["id", "words", "correct_order", "hidden_word", "score"],
    });

    const games = dbGamesData.map((game) => game.get({ plain: true }));
    console.log(games);
    res.json(games);

    // res.render("homepage", {
    //   games,
    // loggedIn: req.session.loggedIn,
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery
// Use the custom middleware before allowing the user to access the gallery
router.get("/game/:id", async (req, res) => {
  //I deleted withAuth from this line as middleware. we may want to put it back.
  try {
    const dbGameData = await Game.findByPk(req.params.id, {
      attributes: ["id", "words", "correct_order", "hidden_word", "score"],
    });

    const game = dbGameData.get({ plain: true });
    // res.render("gallery", { gallery, loggedIn: req.session.loggedIn });

    res.json(game);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
