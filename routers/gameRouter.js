const express = require('express');
const gameController= require("../controllers/gameController");
const gameRouter = express.Router();

gameRouter.get('/',gameController.loadGame);
gameRouter.get('/StartGame',gameController.StartGame);
gameRouter.get('/GetPlayers',gameController.GetPlayers);
gameRouter.post('/AddNewPlayer',gameController.AddNewPlayer);
gameRouter.post('/MovePlayerLeft',gameController.MovePlayerLeft);
gameRouter.post('/MovePlayerRight',gameController.MovePlayerRight);

module.exports = gameRouter;
