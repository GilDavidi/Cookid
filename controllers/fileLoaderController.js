const path = require("path");

module.exports = {
    LandingPage: (req, res) => {
        res.sendFile(path.join(__dirname, '../login/landingPage.html'));
    },
    LoginTeacherPage:  (req, res) => {
        res.sendFile(path.join(__dirname, '../login/loginTeacher.html'));

    },
    LoginPupilPage:  (req, res) => {
        res.sendFile(path.join(__dirname, '../login/loginPupil.html'));

    }

}
