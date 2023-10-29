const sequelize = require('../config/connection');
const seedGame = require("./gameData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedGame();

  process.exit(0);
};

seedAll();