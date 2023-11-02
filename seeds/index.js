const sequelize = require('../config/connection');
// const seedGallery = require('./galleryData');
// const seedPaintings = require('./paintingData');
const seedGames = require('./gameData');
// const seedGames = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  // await seedGallery();

  // await seedPaintings();

  await seedGames();

  process.exit(0);
};

seedAll();
