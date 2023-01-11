const path = require("path");
const Mission = require("../models/MissionPaint.js");
const User = require("../mongoDB/models/users");
let mission= new Mission();
module.exports = {
    loadGame: (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/view_game/PaintCanvas.html'));
    },
    StartGame: (req, res) => {
        console.log("Server Game Started");
        res.send("Client Game Started");
    },
    GetBoard: (req,res) => {
            res.send(mission.getBoard());
    },
    AddNewPlayer: (req,res) => {
        res.send("new player add with id " + req.body.id);
    },
    GetPlayerName: (req, res) => {
        let id = req.body.id;
        User.findOne({'id': id})
            .then(result => {
                if (result) {
                    res.send(result.user_name);
                } else {
                    res.send("The user does not exist, try again");
                }
            })
            .catch(err => console.log(err));
    }

}
