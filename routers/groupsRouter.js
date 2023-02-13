const express = require('express');
const groupsController= require("../controllers/groupsController");
const groupsRouter = express.Router();

groupsRouter.get('/getAllPupilInTheGame',groupsController.getAllPupilInTheGame);
groupsRouter.get('/getRecommendedGroups',groupsController.getRecommendedGroups);
groupsRouter.post('/addPupil',groupsController.addPupil);
groupsRouter.get('/clearGroups',groupsController.clearGroups);


module.exports = groupsRouter;
