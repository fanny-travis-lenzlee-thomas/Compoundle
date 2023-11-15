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
    res.status(500).render("error", { errorMessage: err.message });
  }
});

router.get("/puzzles", async (req, res) => {
  try {
    // const dbGamesData = await Game.findAll({
    //   attributes: [
    //     "id",
    //     "words",
    //     "correct_order",
    //     "hidden_word",
    //     "points",
    //     "upload_date",
    //     "compoundled",
    //   ],
    // });

    const dbGamesData = await sequelize.query(`SELECT *
    FROM game
    WHERE STR_TO_DATE(upload_date, '%m/%d/%Y') < CURDATE();
    `);

    // const games = dbGamesData.map((game) => game.get({ plain: true }));
    // // console.log(games);
    // // res.json(games);
    console.log("This is the dbgamesData", dbGamesData[0]);

    res.render("partials/notloggedinpuzzles", {
      dbGamesData: dbGamesData[0],
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      currentLevel: req.session.currentLevel,
    });
    console.log(req.session.username);
    console.log("This is the current user level, ", req.session.currentLevel);
  } catch (err) {
    console.log(err);
    res.status(500).render("error", { errorMessage: err.message });
  }
});

// GET one game
// router.get("/game/:id", async (req, res) => {
//   try {
//     const dbGameData = await Game.findByPk(req.params.id, {
//       attributes: [
//         "id",
//         "words",
//         "compoundled",
//         "correct_order",
//         "hidden_word",
//         "points",
//         "level",
//         "upload_date",
//       ],
//     });

//     const game = dbGameData.get({ plain: true });
//     const wordsArray = game.words.split(", ");
//     const id = req.params.id;

//     if (req.session.loggedIn) {
//       const { username, userId } = req.session;
//       const tableName = `${username}${userId}_up`;

//       console.log("Game data:", game);

//       const [userData, metadata] = await sequelize.query(
//         `
//         SELECT solved from ${tableName} where puzzle = ${id}
//         `,
//         {}
//       );

//       console.log("This is my user data: ", userData);

//       console.log(`the user ${username} has an id of ${userId}`);
//       console.log(
//         `This is the number of attempts, ${userData[0].number_of_attempts}`
//       );

//       console.log(`This is the time ${userData[0].time}`);

//       if (userData && userData[0] && userData[0].solved === 1) {
//         res.render("partials/solved", {
//           numberOfAttempts: userData[0].number_of_attempts,
//           time: userData[0].time,
//           compoundled: game.compoundled,
//           nextLevel: game.level + 1,
//         });
//       } else {
//         res.render("partials/wordblock", {
//           wordsArray,
//           correctOrder: game.correct_order,
//           blankWord: game.hidden_word,
//           level: game.id,
//           points: game.points,
//           loggedIn: req.session.loggedIn,
//           username: req.session.username,
//           score: req.session.userScore,
//           currentLevel: req.session.currentLevel,
//           userId: req.session.userId,
//           uploadDate: game.upload_date,
//         });
//       }
//     } else {
//       // Handle the case when the user is not logged in
//       res.render("partials/wordblock", {
//         wordsArray,
//         correctOrder: game.correct_order,
//         blankWord: game.hidden_word,
//         level: game.id,
//         points: game.points,
//         loggedIn: req.session.loggedIn,
//         username: req.session.username,
//         score: req.session.userScore,
//         currentLevel: req.session.currentLevel,
//         userId: req.session.userId,
//         uploadDate: game.upload_date,
//       });
//     }

//     console.log("The username I have is, ", req.session.username);
//     console.log("The user Id I have is, ", req.session.userId);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.get("/game/:id", async (req, res) => {
  try {
    const dbGameData = await Game.findByPk(req.params.id, {
      attributes: [
        "id",
        "words",
        "compoundled",
        "correct_order",
        "hidden_word",
        "points",
        "level",
        "upload_date",
      ],
    });

    const game = dbGameData.get({ plain: true });
    const wordsArray = game.words.split(", ");
    const id = req.params.id;

    if (req.session.loggedIn) {
      const { username, userId } = req.session;
      const tableName = `${username}${userId}_up`;

      console.log("Game data:", game);

      const [userData, metadata] = await sequelize.query(
        `
        SELECT * from ${tableName} where puzzle = ${id}
        `,
        {}
      );

      console.log("This is my user data: ", userData);

      console.log(`the user ${username} has an id of ${userId}`);

      if (userData && userData[0] && userData[0].solved === 1) {
        res.render("partials/solved", {
          numberOfAttempts: userData[0].number_of_attempts,
          time: userData[0].time,
          compoundled: game.compoundled,
          nextLevel: game.level + 1,
          uploadDate: game.upload_date,
        });
      } else {
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
      }
    } else {
      // Handle the case when the user is not logged in
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
    }

    console.log("The username I have is, ", req.session.username);
    console.log("The user Id I have is, ", req.session.userId);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/game/api/users/userPuzzle", async (req, res) => {
  try {
    const { username, user_id, level } = req.query;
    const tableName = `${username}${user_id}_up`;
    const solvedValue = await sequelize.query(
      `SELECT puzzle, solved FROM ${tableName} WHERE PUZZLE = ${level}`
    );
    res.json(solvedValue);
  } catch (err) {
    console.log(err);
    res.status(500).render("error", { errorMessage: err.message });
  }
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
        "compoundled",
        "correct_order",
        "hidden_word",
        "points",
        "level",
        "upload_date",
      ],
    });

    const game = dbGameData.get({ plain: true });
    const wordsArray = game.words.split(", ");

    if (req.session.loggedIn) {
      const { username, userId } = req.session;
      const tableName = `${username}${userId}_up`;

      console.log("Game data:", game);

      const [userData, metadata] = await sequelize.query(
        `
        SELECT * from ${tableName} where puzzle = ${game.id}
        `,
        {}
      );

      console.log("This is my user data: ", userData);

      console.log(`the user ${username} has an id of ${userId}`);

      if (userData && userData[0] && userData[0].solved === 1) {
        res.render("partials/solved", {
          loggedIn: req.session.loggedIn,
          username: req.session.username,
          numberOfAttempts: userData[0].number_of_attempts,
          time: userData[0].time,
          compoundled: game.compoundled,
          nextLevel: game.level + 1,
          uploadDate: game.upload_date,
        });
      } else {
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
      }
    } else {
      // Handle the case when the user is not logged in
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
    }

    console.log("The username I have is, ", req.session.username);
    console.log("The user Id I have is, ", req.session.userId);
  } catch (err) {
    console.log(err);
    res.status(500).render("error", { errorMessage: err.message });
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
    res.status(500).render("error", { errorMessage: err.message });
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

router.get("/allPuzzles", async (req, res) => {
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
    if (req.session.loggedIn) {
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
      res.render("partials/testpuzzle", {
        beforeTodayCombinedData: beforeTodayCombinedData,
        combinedData: combinedData,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
        currentLevel: req.session.currentLevel,
      });
      console.log(req.session.username);
    } else {
      console.log("This is my db games data", dbGamesData);
      res.render("partials/testpuzzlesnotloggedin", {
        dbGamesData: dbGamesData,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
        currentLevel: req.session.currentLevel,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).render("error", { errorMessage: err.message });
  }
});

module.exports = router;
