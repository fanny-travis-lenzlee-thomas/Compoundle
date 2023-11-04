const sequelize = require("../config/connection");
const Game = require("../models/Game");

const gameData = [
  {
    words: "Belly, Beer, Flop",
    correct_order: "1,0,2",
    hidden_word: null,
    points: 300,
    level: 1,
  },
  {
    words: "Stakes, Sweep, Chimney",
    correct_order: "2,1,0",
    hidden_word: null,
    points: 300,
    level: 2,
  },
  {
    words: "Variety, Garden, Show",
    correct_order: "1,0,2",
    hidden_word: null,
    points: 300,
    level: 3,
  },
  {
    words: "Red, Table, Water, Hot",
    correct_order: "0,3,2,1",
    hidden_word: null,
    points: 400,
    level: 4,
  },
  {
    words: "Box, Rain, Check, Cutter",
    correct_order: "1,2,0,3",
    hidden_word: null,
    points: 400,
    level: 5,
  },
  {
    words: "War, Fighter, Flame, Crime",
    correct_order: "2,0,3,1",
    hidden_word: null,
    points: 400,
    level: 6,
  },
  {
    words: "Good, Feel, Out, Luck, Last",
    correct_order: "1,0,3,2,4",
    hidden_word: null,
    points: 500,
    level: 7,
  },
  {
    words: "Work, Search, Paint, Job, Team",
    correct_order: "2,3,1,4,0",
    hidden_word: null,
    points: 500,
    level: 8,
  },
  {
    words: "Full, Shot, Moon, Up, Beam",
    correct_order: "0,2,4,3,1",
    hidden_word: null,
    points: 500,
    level: 9,
  },
  {
    words: "Come, Sense, Animal, Back, Kingdom, Talk",
    correct_order: "2,4,0,3,5,1",
    hidden_word: null,
    points: 600,
    level: 10,
  },
  {
    words: "Last, Encounter, Chance, Fake, Out, Pump",
    correct_order: "5,3,4,0,2,1",
    hidden_word: null,
    points: 600,
    level: 11,
  },
  {
    words: "Principle, Best, Law, Case, Abiding, Reason",
    correct_order: "1,3,2,4,0,5",
    hidden_word: null,
    points: 600,
    level: 12,
  },
  {
    words: "Paper, Saint, Airplane, Patron, Wall, Hanger, Paul",
    correct_order: "3,1,6,4,0,2,5",
    hidden_word: null,
    points: 700,
    level: 13,
  },
  {
    words: "Market, Off, Suit, Cap, Jacket, Track, Farmers",
    correct_order: "6,0,3,1,5,2,4",
    hidden_word: null,
    points: 700,
    level: 14,
  },
  {
    words: "Shoot, Move, Smart, Trouble, Daily, Out, Double",
    correct_order: "4,6,3,0,5,2,1",
    hidden_word: null,
    points: 700,
    level: 15,
  },
  {
    words: "Swimming, , Table",
    correct_order: "0,1,2",
    hidden_word: "pool",
    points: 700,
    level: 16,
  },
  {
    words: "Dancer, Mister, , Hey, Bean, Peanut, Pole",
    correct_order: "3,1,5,2,4,6,0",
    hidden_word: "butter",
    points: 1000,
    level: 17,
  },
  {
    words: "Flash, Game, Woman, Card, Boy, Board, ",
    correct_order: "0,3,5,1,4,6,2",
    hidden_word: "wonder",
    points: 1000,
    level: 18,
  },
  {
    words: "High, Stadium, Area, Flying, Seating, , Fantasy",
    correct_order: "3,0,6,5,1,4,2",
    hidden_word: "football",
    points: 1000,
    level: 19,
  },
  {
    words: "Lava, Bad, Red, Blood, , Hot, Shade",
    correct_order: "1,3,2,5,0,4,6",
    hidden_word: "lamp",
    points: 1000,
    level: 20,
  },
  {
    words: ", People, Down, Square, Low, Party, Dance",
    correct_order: "4,2,0,3,6,5,1",
    hidden_word: "town",
    points: 1000,
    level: 21,
  },
  {
    words: "Hole, Yellow, Walk, Belly, , Man, Fat",
    correct_order: "1,3,6,4,2,5,0",
    hidden_word: "cat",
    points: 1000,
    level: 22,
  },
  {
    words: "Banana, , Phone, Case, Cabinet, File, Storage",
    correct_order: "0,2,1,3,5,6,4",
    hidden_word: "book",
    points: 1000,
    level: 23,
  },
  {
    words: "Lands, Step, Zone, Bad, Breaking, , End",
    correct_order: "1,5,4,3,0,6,2",
    hidden_word: "back",
    points: 1000,
    level: 24,
  },
  {
    words: "Sugar, Candy, Daddy, Thick, , Cane, Issues",
    correct_order: "3,4,1,5,0,2,6",
    hidden_word: "skull",
    points: 1000,
    level: 25,
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
