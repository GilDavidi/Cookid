const path = require("path");
const MissionPaint = require("../models/MissionPaint.js");
const User = require("../mongoDB/models/users");
const Game = require("../mongoDB/models/Previous_Games")
require("dotenv").config({path: 'config/.env'});
const URL = process.env.URL;

let mission;
let isMissionEnd=false;
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
    },
    endMission: async (req,res) => {
        if (isMissionEnd==false) {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            today = dd + '.' + mm + '.' + yyyy;
            let similarity=await mission.endMission(req.body.endMissionDetails);
            res.send(`${URL}/game/gameOverPupil.html?similarity=${similarity}`);
            isMissionEnd=true;
            await Game.create({date: today, players_scores: "${userName} : 21,{userName}$ : 43", group_id: groupId}, (error, doc) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Document inserted successfully", doc);
                }
            });
        }
    }

}
