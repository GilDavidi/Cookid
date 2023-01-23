const path = require("path");
const Games = require("../mongoDB/models/Previous_Games");
module.exports = {
    loadPreviousGames: (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/game/previousGames.html'));
    },
    getAllPreviousGames: (req, res) => {
        Games.find({})
            .then(result => {
                if (result) {
                    res.send(result);
                } else {
                    res.send("No previous games exists");
                }
            })
            .catch(err => console.log(err));
    }

}