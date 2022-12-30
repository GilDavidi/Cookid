const express = require('express');
const gameController= require("../controllers/gameController");
const gameRouter = express.Router();

gameRouter.get('/',gameController.loadGame);
gameRouter.get('/StartGame',gameController.StartGame);
gameRouter.get('/GetPlayers',gameController.GetPlayers);
gameRouter.post('/AddNewPlayer',gameController.AddNewPlayer);
gameRouter.post('/MovePlayer',gameController.MovePlayer);

module.exports = gameRouter;
