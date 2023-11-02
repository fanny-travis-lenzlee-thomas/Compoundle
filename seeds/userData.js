const sequelize = require("../config/connection");
const User = require("../models/User");

const userData = [
  {
    username: "example",
    email: "example@email.com",
    password: "password",
  },
  {
    username: "example1",
    email: "example1@email.com",
    password: "password1",
  },
  {
    username: "example2",
    email: "example2@email.com",
    password: "password2",
  },
];

const seedUserTable = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedUserTable();
