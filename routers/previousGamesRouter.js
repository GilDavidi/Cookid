const express = require('express');
const previousGamesController = require("../controllers/previousGamesController");
const groupsController = require("../controllers/groupsController");
const gameRouter = express.Router();

gameRouter.get('/',previousGamesController.loadPreviousGames);
gameRouter.get('/getAllPreviousGames',previousGamesController.getAllPreviousGames);
//gameRouter.get('/getPupilsScore',previousGamesController.getPupilsScore);

module.exports = gameRouter;
