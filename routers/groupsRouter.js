const express = require('express');
const groupsController= require("../controllers/groupsController");
const groupsRouter = express.Router();

groupsRouter.get('/getAllPupilInTheGame',groupsController.getAllPupilInTheGame);
groupsRouter.post('/addPupil',groupsController.addPupil);


module.exports = groupsRouter;
