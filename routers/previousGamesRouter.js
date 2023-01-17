const express = require('express');
const previousGamesController = require("../controllers/previousGamesController");
const gameRouter = express.Router();

gameRouter.get('/',previousGamesController.loadPreviousGames);
gameRouter.get('/getAllPreviousGames',previousGamesController.getAllPreviousGames);


module.exports = gameRouter;