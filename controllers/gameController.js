const path = require("path");
const Mission = require("../models/MissionBridge.js");
let mission= new Mission(140, 300);
module.exports = {
    loadGame: (req, res) => {
        res.sendFile(path.join(__dirname, '../game/view/MissionCanvas.html'));
    },
    StartGame: (req, res) => {
        console.log("Server Game Started");
        res.send("Client Game Started");
    },
    GetPlayers: (req,res) => {
        res.send(mission.getPlayersJSON());
    },
    AddNewPlayer: (req,res) => {
        mission.addNewPLayer(req.body.id);
        res.send("new player add with id " + req.body.id);
    },
    MovePlayer: (req,res) => {
            mission.playerMove(req.body.id,req.body.controller);
            res.send("player id " + req.body.id+" move");
        }
}
