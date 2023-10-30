const { Game } = require("../models");

const gameData = [
  {
    words: "Off, Hats, Top",
    correct_order: "3,2,1",
    hidden_word: NULL,
    score: 300,
  },
  {
    words: "Same, Man, Old",
    correct_order: "1,3,2",
    hidden_word: NULL,
    score: 300,
  },
  {
    words: "Belly, Beer, Flop",
    correct_order: "2,1,3",
    hidden_word: NULL,
    score: 300,
  },
  {
    words: "Red, Table, Water, Hot",
    correct_order: "1,4,3,2",
    hidden_word: NULL,
    score: 400,
  },
  {
    words: "Box, Rain, Check, Cutter",
    correct_order: "2,3,1,4",
    hidden_word: NULL,
    score: 400,
  },
  {
    words: "War, Fighter, Flame, Crime",
    correct_order: "3,1,4,2",
    hidden_word: NULL,
    score: 400,
  },
  {
    words: "Good, Feel, Out, Luck, Last",
    correct_order: "2,1,4,3,5",
    hidden_word: NULL,
    score: 500,
  },
  {
    words: "Work, Search, Paint, Job, Team",
    correct_order: "3,4,2,5,1",
    hidden_word: NULL,
    score: 500,
  },
  {
    words: "Full, Shot, Moon, Up, Beam",
    correct_order: "1,3,5,4,2",
    hidden_word: NULL,
    score: 500,
  },
  {
    words: "Come, Sense, Animal, Back, Kingdom, Talk",
    correct_order: "3,5,1,4,6,2",
    hidden_word: NULL,
    score: 600,
  },
  {
    words: "Last, Encounter, Chance, Fake, Out, Pump",
    correct_order: "6,4,5,1,3,2",
    hidden_word: NULL,
    score: 600,
  },
  {
    words: "Principle, Best, Law, Case, Abiding, Reason",
    correct_order: "2,4,3,5,1,6",
    hidden_word: NULL,
    score: 600,
  },
  {
    words: "Paper, Saint, Airplane, Patron, Wall, Hanger, Paul",
    correct_order: "4,2,7,5,1,3,6",
    hidden_word: NULL,
    score: 700,
  },
  {
    words: "Market, Off, Suit, Cap, Jacket, Track, Farmers",
    correct_order: "7,1,4,2,6,3,5",
    hidden_word: NULL,
    score: 700,
  },
  {
    words: "Shoot, Move, Smart, Trouble, Daily, Out, Double",
    correct_order: "5,7,4,1,6,3,2",
    hidden_word: NULL,
    score: 700,
  },
  //   {
  //     words: "Swimming, P, Table",
  //     correct_order: "1,2,3",
  //     hidden_word: "Pool",
  //     score: 200,
  //   },

  {
    words: "Dancer, Mister, , Hey, Bean, Peanut, Pole",
    correct_order: "4,2,6,3,5,7,1",
    hidden_word: "butter",
    score: 1000,
  },
  {
    words: "High, Stadium, Area, Flying, Seating, , Fantasy",
    correct_order: "4,1,7,6,2,5,3",
    hidden_word: "football",
    score: 1000,
  },
  {
    words: "Lava, Bad, Red, Blood, , Hot, Shade",
    correct_order: "2,4,3,6,1,5,7",
    hidden_word: "lamp",
    score: 1000,
  },
  {
    words: ", People, Down, Square, Low, Party, Dance",
    correct_order: "5,3,1,4,7,6,2",
    hidden_word: "town",
    score: 1000,
  },
  {
    words: "Flash, Game, Woman, Card, Boy, Board, ",
    correct_order: "1,4,6,2,5,7,3",
    hidden_word: "wonder",
    score: 700,
  },
  {
    words: "Hole, Yellow, Walk, Belly, , Man, Fat",
    correct_order: "2,4,7,5,3,6,1",
    hidden_word: "cat",
    score: 1000,
  },
  {
    words: "Banana, , Phone, Case, Cabinet, File, Storage",
    correct_order: "1,3,2,4,6,7,5",
    hidden_word: "book",
    score: 1000,
  },
  {
    words: "Lands, Step, Zone, Bad, Breaking, , End",
    correct_order: "2,6,5,4,1,7,3",
    hidden_word: "back",
    score: 1000,
  },
  {
    words: "Sugar, Candy, Daddy, Thick, , Cane, Issues",
    correct_order: "4,5,2,6,1,3,7",
    hidden_word: "skull",
    score: 1000,
  },
];

const seedGallery = () => Game.bulkCreate(gameData);

module.exports = seedGallery;
