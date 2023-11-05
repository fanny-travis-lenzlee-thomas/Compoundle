## Rearranger

Rearranger is an engaging word game built with JavaScript, Node.js, Express, and MySQL. Challenge yourself to create chains of compound words and phrases, and track your scores by creating user profiles.

## Overview

This application offers an interactive experience where users can sign up or start playing immediately. Rearrange the words on the screen to form compound words or phrases with neighboring words (e.g., "Big Bird Seed" becomes Big Bird, Bird Seed). Verify your answers with the check button, and correct placements are highlighted in green, while incorrect ones are in red. Fill in blank spaces with the appropriate words for a seamless gaming experience.

## Screenshots

## Application Links:

- GITHUB Repo: https://github.com/fanny-travis-lenzlee-thomas/rearranger-working

- Wireframes & Data Models: https://whimsical.com/wireframes-for-project-2-Wv3cRLETuxDvhTZVdxpumD

- Heroku URL: https://rearrangerapp-b7a73ed90fe8.herokuapp.com/

## Contributions

- The following files of code were modified or levereged from Northwestern Bootcamp Week 14 (MVC) Module 20.
  config/connections.js
  controllers/api/index.js
  controllers/index.js
  public/js/login.js
  public/js/logout.js
  utils/auth.js
  utils/helpers.js
  views/login.handlebars

- Sorting function (public/js/script.js lines 87-93), and getIdOfBlock functions (public/js/script.js lines 32-38) leveraged and modified from GeeksForGeeks.org user geetanjali16 (https://www.geeksforgeeks.org/how-to-create-a-drag-and-drop-feature-for-reordering-the-images-,using-html-css-and-jqueryui/)

- flip CSS Animation (public/js/styles.css 492-494, 509,521) leveraged and modified from user Fralle on StackOverFlow (https://stackoverflow.com/questions/74192108/wordle-letter-flipping-animation)

- Confetti CSS Stylings and Animation (public/css/styles.css lines 367-509) leveraged and modified from codepen.io user zer0kool (https://codepen.io/zer0kool/pen/KjZWRW)

- MDN web docs for reference when using methods and functions

- Sequelize Package: https://www.npmjs.com/package/sequelize

- dotenv package: https://www.npmjs.com/package/dotenv

- MySQL2 package: https://www.npmjs.com/package/mysql2

- Node.js: https://nodejs.org/en/docs

# License

MIT License

Copyright (c) 2023 fanny-travis-lenzlee-thomas

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
