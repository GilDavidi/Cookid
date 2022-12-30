const path = require("path");

module.exports = {
    LandingPage: (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/login/landingPage.html'));
    },
    LoginTeacherPage:  (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/login/loginTeacher.html'));

    },
    LoginPupilPage:  (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/login/loginPupil.html'));

    }

}
