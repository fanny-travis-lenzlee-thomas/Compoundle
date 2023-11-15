const router = require("express").Router();
const sequelize = require("../../config/connection");
const { User, Game } = require("../../models");
const { DataTypes, Op } = require("sequelize");

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

router.get("/puzzles", async (req, res) => {
  try {
    const dbGamesData = await Game.findAll({
      attributes: [
        "id",
        "compoundled",
        "words",
        "level",
        "correct_order",
        "hidden_word",
        "points",
        "upload_date",
      ],
    });

    const beforeTodayData = await sequelize.query(`SELECT *
    FROM game
    WHERE STR_TO_DATE(upload_date, '%m/%d/%Y') < CURDATE();
    `);

    console.log("This is the beforeTodayData, ", beforeTodayData[0][0]);

    parsableBeforeTodayDatas = beforeTodayData[0];

    // console.log("This is the new dbGamesData: ", dbGamesData);

    const { username, userId } = req.session;
    // Dynamically construct the table name
    const tableName = `${username}${userId}_up`;
    const [userData, metadata] = await sequelize.query(
      `
      SELECT * from ${tableName}
      `,
      {}
    );

    const games = dbGamesData.map((game) => game.get({ plain: true }));

    const userDataMap = userData.reduce((acc, user) => {
      acc[user.puzzle] = user;
      return acc;
    }, {});

    const beforeTodayCombinedData = parsableBeforeTodayDatas.map(
      (parsableBeforeTodayData) => {
        const userDataItem = userDataMap[parsableBeforeTodayData.level] || {}; // Default to an empty object if no match is found
        return {
          ...parsableBeforeTodayData,
          userData: userDataItem,
        };
      }
    );

    console.log(
      "This is the before today data combined, ",
      beforeTodayCombinedData
    );

    const combinedData = games.map((game) => {
      const userDataItem = userDataMap[game.level] || {}; // Default to an empty object if no match is found
      return {
        ...game,
        userData: userDataItem,
      };
    });

    res.render("partials/puzzles", {
      beforeTodayCombinedData: beforeTodayCombinedData,
      combinedData: combinedData,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      currentLevel: req.session.currentLevel,
    });
    console.log(req.session.username);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/userPuzzle", async (req, res) => {
  try {
    const { username, user_id } = req.body;
    const { time, number_of_attempts, level, solved, solved_date } = req.body;

    let puzzle = level;

    // Dynamically construct the table name
    const tableName = `${username}${user_id}_up`;
    console.log("I am about to update the table named, ", tableName);

    // Update user in the database
    await sequelize.query(
      `INSERT INTO ${tableName} (user_id, puzzle, time, number_of_attempts, solved, solved_date) VALUES (:user_id, :puzzle, :time, :number_of_attempts, :solved, :solved_date)`,
      {
        replacements: {
          user_id,
          time,
          number_of_attempts,
          puzzle,
          solved,
          level,
          solved_date,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update score" });
  }
});

router.put("/userPuzzle", async (req, res) => {
  try {
    const { username, user_id } = req.body;
    const { time, number_of_attempts, level, solved, solved_date } = req.body;

    let puzzle = level;

    // Dynamically construct the table name
    const tableName = `${username}${user_id}_up`;
    console.log("I am about to update the table named, ", tableName);

    // Update user in the database
    await sequelize.query(
      `UPDATE ${tableName} SET time = :time, number_of_attempts = :number_of_attempts, solved = :solved, solved_date = :solved_date WHERE puzzle = :level`,
      {
        replacements: {
          user_id,
          time,
          number_of_attempts,
          puzzle,
          solved,
          level,
          solved_date,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update score" });
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

    // Update session values
    req.session.userScore = updatedUserData.user_score;
    req.session.currentLevel = updatedUserData.current_user_level;

    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update score" });
  }
});

router.get("/profile", async (req, res) => {
  try {
    const { username, userId } = req.session;
    console.log("This is the session I have for the profile page", req.session);
    // Dynamically construct the table name
    const tableName = `${username}${userId}_up`;
    console.log("I am about to update the table named, ", tableName);
    const [userData, metadata] = await sequelize.query(
      `
      SELECT * from ${tableName}
      `,
      {}
    );

    const averagesData = await sequelize.query(
      `
      SELECT
      AVG(time) as avg_time,
      AVG(number_of_attempts) as avg_attempts,
      MIN(time) as best_time,
      (SELECT id FROM ${tableName} WHERE time = MIN(t.time) LIMIT 1) as best_time_id
  FROM ${tableName} t;
        `,
      {}
    );

    console.log("This is my averages data, ", averagesData);

    const gamesData = await sequelize.query(
      `SELECT compoundled, upload_date from game;`
    );
    console.log("This is my games data: ", gamesData[0]);
    console.log("This is the averages data I have: ", averagesData[0][0]);

    const combinedData = userData.map((userDataItem, index) => {
      return {
        ...userDataItem,
        gameData: gamesData[0][index],
      };
    });

    console.log("This is my combined data: ", combinedData);
    console.log("This is the User Data I got back: ", userData);
    res.render("partials/userpage", {
      username: req.session.username,
      currentLevel: req.session.currentLevel,
      loggedIn: req.session.loggedIn,
      averageTime: averagesData[0][0].avg_time,
      averageAttempts: averagesData[0][0].avg_attempts,
      bestTime: averagesData[0][0].best_time,
      bestTimeLevel: averagesData[0][0].best_time_id,
      combinedData: combinedData,
    });
  } catch (err) {
    console.log(err);
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
    console.log(err);
    res.status(500).json({ error: "Could not update score" });
  }
});

router.get("/", async (req, res) => {
  try {
    //Sequelize query to get all categories
    const userData = await User.findAll({});
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Could not update score" });
  }
});

router.post("/createTable", async (req, res) => {
  const id = req.body.newUserId;
  const username = req.body.username;
  const userPuzzleTableName = `${username}${id}_up`;
  // const userPuzzleTablenNumberOfAttempts = req.body.numberOfAttempts;
  // console.log(typeof numberOfAttempts);
  // console.log("This is the number of attempts I have", numberOfAttempts);

  // Create a new table using Sequelize's `define` method
  const NewUserPuzzle = sequelize.define(
    userPuzzleTableName,
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        defaultValue: 0,
      },
      puzzle: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      time: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      number_of_attempts: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      solved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      solved_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: "userpuzzle",
      timestamps: false,
    }
  ); // Closing parenthesis moved here

  await sequelize.sync();

  await NewUserPuzzle.create({
    user_id: id,
  });

  res.json(`Table ${NewUserPuzzle} created successfully!`);
});

module.exports = router;
