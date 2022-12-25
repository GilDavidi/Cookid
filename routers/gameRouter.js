const express = require('express');
const gameController= require("../controllers/gameController");
const fileLoaderRouter = express.Router();

fileLoaderRouter.get('/',gameController.loadGame);

module.exports = fileLoaderRouter;
