const path = require("path");
const Mission = require("../models/MissionBridge.js");
let mission= new Mission(140, 300);
module.exports = {
    loadGame: (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/view_game/MissionCanvas.html'));
    },
    StartGame: (req, res) => {
        console.log("Server Game Started");
        res.send("Client Game Started");
    },
    GetPlayers: (req,res) => {
        let playersJSON =mission.getPlayersJSON();
            res.send(playersJSON);
    },
    AddNewPlayer: (req,res) => {
        mission.addNewPLayer(req.body.id);
        res.send("new player add with id " + req.body.id);
    },
    MovePlayer: (req,res) => {
        mission.SetPlayerPos(req.body.id,req.body.point);
        res.send("player "+req.body.id+ "move to " + req.body.point);
    }
}
