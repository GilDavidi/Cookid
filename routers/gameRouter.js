const express = require('express');
const gameController= require("../controllers/gameController");
const gameRouter = express.Router();

gameRouter.get('/',gameController.loadGame);
gameRouter.get('/StartGame',gameController.StartGame);
gameRouter.get('/Update',gameController.Update);

module.exports = gameRouter;
