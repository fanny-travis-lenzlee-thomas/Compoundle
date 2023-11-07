const sequelize = require("../config/connection");

const seedGames = require("./gameData");
const seedUser = require("./userData");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- Database Synced -----\n");

  await seedUser();
  console.log("\n----- User Seeded -----\n");

  await seedGames();
  console.log("\n----- Game Seeded -----\n");

  process.exit(0);
};

seedAll();
