const path = require("path");
const Mission = require("../models/Mission.js");
let mission;
module.exports = {
    loadGame: (req, res) => {
        res.sendFile(path.join(__dirname, '../game/view/MissionCanvas.html'));
    },
    StartGame: (req, res) => {
        console.log("Game Started");
        mission= new Mission(150, 300);
        res.send("Game Started");
    },
    Update: (req,res) =>
    {
        console.log(mission.getPlayer());
        res.send(JSON.parse(mission));
    }

}
