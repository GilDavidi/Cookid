const express = require('express');
const fileLoaderController= require("../controllers/fileLoaderController");
const fileLoaderRouter = express.Router();

fileLoaderRouter.get('/',fileLoaderController.LandingPage);

fileLoaderRouter.get('/login/loginTeacher.html',fileLoaderController.LoginTeacherPage);
fileLoaderRouter.get('/login/loginPupil.html',fileLoaderController.LoginPupilPage);

module.exports = fileLoaderRouter;
