const path = require("path");
const MissionPaint = require("../models/MissionPaint.js");
const User = require("../mongoDB/models/users");
const Game = require("../mongoDB/models/Previous_Games");
const Groups =require("./groupsController")
const moment = require('moment');
require("dotenv").config({path: 'config/.env'});
const URL = process.env.URL;
let missions ={};
module.exports = {
    loadGame: (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/view_game/PaintCanvas.html'));
    },
    StartMissionByGroupId: (req, res) => {
       let mission= new MissionPaint(req.body.groupId,req.body.group);
        missions[req.body.groupId]=mission;
    },
    GetRequestPicture: (req,res) => {
    res.send( missions[req.query.group].geReqPicture());
    },
    getPlayersColors: (req,res) => {
            res.send(missions[req.query.group].getPlayersColors());
    },
    moveColor: (req,res) => {
        res.send(missions[req.body.moveDetails.groupId].moveColor(req.body.moveDetails));
    },
    endMission: async (req,res) => {
        console.log(req.body.endMissionDetails);
        let groupId=req.body.endMissionDetails.groupId;
        let similarity=await missions[groupId].endMission(req.body.endMissionDetails);
        if (missions[groupId].isMissionEnd==false || req.body.endMissionDetails.isTeacher === "true") {
            missions[groupId].isMissionEnd=true;
            const format = 'HH:mm:ss DD.MM.YYYY';
            const today = moment().format(format);

            // get players and scores and save them to the database
            const playersString = missions[groupId].getPlayers();
            const playersArray = playersString.split(", ");
            playersArray.forEach(playerString => {
                let [name, score] = playerString.split(" : ");
                score = parseInt(score);
                let connectionsPupil=missions[groupId].getPlayersWithoutName(name);
                if(req.body.endMissionDetails.isTeacher === "true") {
                    User.findOneAndUpdate({user_name: name},
                        {$inc: {score: score}, $push: {connections: {$each: connectionsPupil}}},
                        {new: true},
                        (err, user) => {
                            if (err) {
                                console.log(err.message);
                            }
                        });
                }

            });

            if (!req.body.endMissionDetails.isTeacher){
                res.send(`${URL}/game/gameOverPupil.html?similarity=${similarity}`);

            }
            else if (req.body.endMissionDetails.isTeacher === "true"){
                res.send(`${URL}/game/gameOverTeacher.html`);
            }
            let GroupId = missions[groupId].getGroupId();
            GroupId = GroupId[GroupId.length - 1];
            if(req.body.endMissionDetails.isTeacher === "true") {
                await Game.create({
                    date: today,
                    players_scores: missions[groupId].getPlayers(),
                    group_id: GroupId
                }, (error, doc) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(`Mission for ${groupId} saved successfully`, doc);
                    }
                });
            }
        }
        else {
            res.send(`${URL}/game/gameOverPupil.html?similarity=${similarity}`);
        }
    },
    getEndMissionDetails: (req,res) =>{
        // collect all end mission details
        let endMissionJson = {};
        for (const key in missions)
        {
            let GroupId = missions[key].getGroupId();
            GroupId = GroupId[GroupId.length - 1];
            endMissionJson[GroupId] = missions[key].getPlayers();
        }
        //clear thr groups
        Groups.clearGroups();
        res.send(endMissionJson);
    }
}
