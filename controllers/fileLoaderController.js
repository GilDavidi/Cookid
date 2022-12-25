const path = require("path");

module.exports = {
    LandingPage: (req, res) => {
        res.sendFile(path.join(__dirname, '../login/landingPage.html'));
    },

}
