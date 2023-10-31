const sequelize = require("../config/connection");
const Game = require("../models/Game");

const gameData = [
  {
    words: "Off, Hats, Top",
    correct_order: "2,1,0",
    hidden_word: null,
    score: 300,
  },
  {
    words: "Same, Man, Old",
    correct_order: "0,2,1",
    hidden_word: null,
    score: 300,
  },
  {
    words: "Belly, Beer, Flop",
    correct_order: "1,0,2",
    hidden_word: null,
    score: 300,
  },
  {
    words: "Red, Table, Water, Hot",
    correct_order: "0,3,2,1",
    hidden_word: null,
    score: 400,
  },
  {
    words: "Box, Rain, Check, Cutter",
    correct_order: "1,2,0,3",
    hidden_word: null,
    score: 400,
  },
  {
    words: "War, Fighter, Flame, Crime",
    correct_order: "2,0,3,1",
    hidden_word: null,
    score: 400,
  },
  {
    words: "Good, Feel, Out, Luck, Last",
    correct_order: "1,0,3,2,4",
    hidden_word: null,
    score: 500,
  },
  {
    words: "Work, Search, Paint, Job, Team",
    correct_order: "2,3,1,4,0",
    hidden_word: null,
    score: 500,
  },
  {
    words: "Full, Shot, Moon, Up, Beam",
    correct_order: "0,2,4,3,1",
    hidden_word: null,
    score: 500,
  },
  {
    words: "Come, Sense, Animal, Back, Kingdom, Talk",
    correct_order: "2,4,0,3,5,1",
    hidden_word: null,
    score: 600,
  },
  {
    words: "Last, Encounter, Chance, Fake, Out, Pump",
    correct_order: "5,3,4,0,2,1",
    hidden_word: null,
    score: 600,
  },
  {
    words: "Principle, Best, Law, Case, Abiding, Reason",
    correct_order: "1,3,2,4,0,5",
    hidden_word: null,
    score: 600,
  },
  {
    words: "Paper, Saint, Airplane, Patron, Wall, Hanger, Paul",
    correct_order: "3,1,6,4,0,2,5",
    hidden_word: null,
    score: 700,
  },
  {
    words: "Market, Off, Suit, Cap, Jacket, Track, Farmers",
    correct_order: "6,0,3,1,5,2,4",
    hidden_word: null,
    score: 700,
  },
  {
    words: "Shoot, Move, Smart, Trouble, Daily, Out, Double",
    correct_order: "4,6,3,0,5,2,1",
    hidden_word: null,
    score: 700,
  },
  {
    words: "Dancer, Mister, , Hey, Bean, Peanut, Pole",
    correct_order: "3,1,5,2,4,6,0",
    hidden_word: "butter",
    score: 1000,
  },
  {
    words: "Flash, Game, Woman, Card, Boy, Board, ",
    correct_order: "0,3,5,1,4,6,2",
    hidden_word: "wonder",
    score: 1000,
  },
  {
    words: "High, Stadium, Area, Flying, Seating, , Fantasy",
    correct_order: "3,0,6,5,1,4,2",
    hidden_word: "football",
    score: 1000,
  },
  {
    words: "Lava, Bad, Red, Blood, , Hot, Shade",
    correct_order: "1,3,2,5,0,4,6",
    hidden_word: "lamp",
    score: 1000,
  },
  {
    words: ", People, Down, Square, Low, Party, Dance",
    correct_order: "4,2,0,3,6,5,1",
    hidden_word: "town",
    score: 1000,
  },
  {
    words: "Hole, Yellow, Walk, Belly, , Man, Fat",
    correct_order: "1,3,6,4,2,5,0",
    hidden_word: "cat",
    score: 1000,
  },
  {
    words: "Banana, , Phone, Case, Cabinet, File, Storage",
    correct_order: "0,2,1,3,5,6,4",
    hidden_word: "book",
    score: 1000,
  },
  {
    words: "Lands, Step, Zone, Bad, Breaking, , End",
    correct_order: "1,5,4,3,0,6,2",
    hidden_word: "back",
    score: 1000,
  },
  {
    words: "Sugar, Candy, Daddy, Thick, , Cane, Issues",
    correct_order: "3,4,1,5,0,2,6",
    hidden_word: "skull",
    score: 1000,
  },
];

// I believe the below is redundant code for this setup but I am not sure.
// const seedGameTable = () => Game.bulkCreate(gameData);

//I think this is the correct code.
const seedGameTable = async () => {
  await sequelize.sync({ force: true });

  await Game.bulkCreate(gameData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedGameTable();

//I also do not believe we need to export the seedGameTable function. I believe that is for if seeding code is in multiple files and controlled via a central index.
// module.exports = seedGameTable;
