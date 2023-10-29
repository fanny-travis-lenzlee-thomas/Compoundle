const router = require('express').Router();
const { Gallery, Painting } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all words for homepage
router.get('/', async (req, res) => {
  try {
    const dbRearrangerData = await Rearranger.findAll({
      include: [
        {
          model: Rearranger,
          attributes: ['words', 'correctOrder'],
        },
      ],
    });

    const words = dbRearranger.map((words) =>
      words.get({ plain: true })
    );

    res.render('homepage', {
      words,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one game
// Use the custom middleware before allowing the user to access the gallery
router.get('/games/:id', withAuth, async (req, res) => {
  try {
    const dbRearrangerData = await Words.findByPk(req.params.id, {
      include: [
        {
          model: Words,
          attributes: [
            'id',
            'words',
            'correctOrder',
            'hiddenWord',
            'score'
          ],
        },
      ],
    });

    const words = dbRearrangerData.get({ plain: true });
    res.render('words', { words, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one user
// Use the custom middleware before allowing the user to access the painting
router.get('/users/:id', withAuth, async (req, res) => {
  try {
    const dbUserData = await Users.findByPk(req.params.id);

    const User = dbUserData.get({ plain: true });

    res.render('user', { painting, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
