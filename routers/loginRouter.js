const express = require('express');
const loginController= require("../controllers/loginController");
const loginRouter = express.Router();

loginRouter.post('/checkUserTeacher',loginController.checkUserTeacher);
loginRouter.post('/checkUserPupil',loginController.checkUserPupil);


module.exports = loginRouter;
