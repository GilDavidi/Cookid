const express = require('express');
const gameController= require("../controllers/gameController");
const gameRouter = express.Router();

gameRouter.get('/',gameController.loadGame);
gameRouter.post('/StartMissionByGroupId',gameController.StartMissionByGroupId);
gameRouter.get('/GetRequestPicture',gameController.GetRequestPicture);
gameRouter.get('/getPlayersColors',gameController.getPlayersColors);
gameRouter.post('/moveColor',gameController.moveColor);


module.exports = gameRouter;
