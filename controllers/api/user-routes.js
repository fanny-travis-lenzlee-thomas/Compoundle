const router = require("express").Router();
const { User } = require("../../models");

// CREATE new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.userScore = dbUserData.user_score;
      req.session.currentLevel = dbUserData.current_user_level;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.userScore = dbUserData.user_score;
      req.session.currentLevel = dbUserData.current_user_level;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { newScore, nextLevel } = req.body;

    // Update user in the database
    await User.update(
      { user_score: newScore, current_user_level: nextLevel },
      { where: { id } }
    );

    // Fetch the updated user data from the database
    const updatedUserData = await User.findByPk(id, {
      attributes: ["user_score", "current_user_level"],
    });
    console.log("updated user data,", updatedUserData);
    console.log("Before session save:", req.session);

    // Update session values
    req.session.userScore = updatedUserData.user_score;
    req.session.currentLevel = updatedUserData.current_user_level;
    console.log("After session save: ", req.session);

    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update score" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.id, {
      attributes: [
        "id",
        "username",
        "email",
        "password",
        "user_score",
        "current_user_level",
      ],
    });

    const user = dbUserData.get({ plain: true });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    //Sequelize query to get all categories
    const userData = await User.findAll({});
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
