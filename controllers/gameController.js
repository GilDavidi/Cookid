const path = require("path");
const MissionPaint = require("../models/MissionPaint.js");
const User = require("../mongoDB/models/users");
const Game = require("../mongoDB/models/Previous_Games");
const moment = require('moment');
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
        let similarity=await mission.endMission(req.body.endMissionDetails);
        if (isMissionEnd==false || req.body.endMissionDetails.isTeacher === "true") {
            isMissionEnd=true;
            const format = 'HH:mm:ss DD.MM.YYYY';
            const today = moment().format(format);
            console.log(req.body.endMissionDetails.isTeacher);
            if (!req.body.endMissionDetails.isTeacher){
                res.send(`${URL}/game/gameOverPupil.html?similarity=${similarity}`);
            }
            else if (req.body.endMissionDetails.isTeacher === "true"){
                res.send(`${URL}/game/gameOverTeacher.html`);
            }
            let GroupId = mission.getGroupId();
            GroupId = GroupId[GroupId.length - 1];
            await Game.create({date: today, players_scores: mission.getPlayers(), group_id: GroupId}, (error, doc) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Document inserted successfully", doc);
                }
            });
        }
        else {
            res.send(`${URL}/game/gameOverPupil.html?similarity=${similarity}`);
        }
    },
    getEndMissionDetails: (req,res) =>{
        let endMissionJson = {};
        let GroupId = mission.getGroupId();
        GroupId = GroupId[GroupId.length - 1];
        endMissionJson[GroupId] = mission.getPlayers();
        res.send(endMissionJson);
    }

}
