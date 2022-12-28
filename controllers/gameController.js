const path = require("path");
const Mission = require("../models/Mission.js");
let mission= new Mission(150, 300);
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
    MovePlayerLeft: (req,res) => {
        mission.getPlayer(req.body.id).moveLeft();
        res.send("player id " + req.body.id+" move left");
    },
    MovePlayerRight: (req,res) => {
        mission.getPlayer(req.body.id).moveRight();
        res.send("player id " + req.body.id+" move right");
    }
}
