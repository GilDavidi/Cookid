const path = require("path");
const MissionPaint = require("../models/MissionPaint.js");
const User = require("../mongoDB/models/users");
let mission= new MissionPaint();
module.exports = {
    loadGame: (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/view_game/PaintCanvas.html'));
    },
    StartGame: (req, res) => {
        console.log("Server Game Started");
        res.send("Client Game Started");
    },
    GetRequestPicture: (req,res) => {
            res.send(mission.geReqPicture);
    },
    AddNewPlayer: (req,res) => {
        mission.addNewPLayer(res.body.id,res.body.name);
    },
    DivideColors:  (req,res) => {
        mission.divideColors();
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
