const path = require("path");

module.exports = {
    loadGame: (req, res) => {
        //res.sendFile(path.join(__dirname, '../game/view/MissionCanvas.html'));
        console.log("load game is good");
        res.send('localhost:5000/');
    },

}
