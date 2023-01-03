const express = require('express');
const gameController= require("../controllers/gameController");
const gameRouter = express.Router();

gameRouter.get('/',gameController.loadGame);
gameRouter.get('/StartGame',gameController.StartGame);
gameRouter.get('/GetBoard',gameController.GetBoard);
gameRouter.post('/AddNewPlayer',gameController.AddNewPlayer);
gameRouter.post('/GetPlayerName',gameController.GetPlayerName);


module.exports = gameRouter;
