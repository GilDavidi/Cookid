const path = require("path");
const MissionPaint = require("../models/MissionPaint.js");
const User = require("../mongoDB/models/users");

let mission;
module.exports = {
    loadGame: (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/view_game/PaintCanvas.html'));
    },
    StartMissionByGroupId: (req, res) => {
        mission= new MissionPaint(req.body.groupId,req.body.group);
    },
    GetRequestPicture: (req,res) => {
            res.send(mission.geReqPicture());
    },
    getPlayersColors: (req,res) => {
            res.send(mission.getPlayersColors());
    },
    moveColor: (req,res) => {
        console.log(req.body.moveDetails);
        res.send(mission.moveColor(req.body.moveDetails));
    }

}
