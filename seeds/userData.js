const { User } = require("../models");

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

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
