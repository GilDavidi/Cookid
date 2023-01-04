const express = require('express');
const groupsController= require("../controllers/groupsController");
const groupsRouter = express.Router();

groupsRouter.get('/createGroups',groupsController.createGroups);


module.exports = groupsRouter;
