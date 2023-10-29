const sequelize = require('../config/connection');
const seedGame = require("./gameData");
// const seedUsers = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedGame();
  // await seedUsers();

  process.exit(0);
};

seedAll();