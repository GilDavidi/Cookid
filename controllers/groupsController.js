const User = require('../mongoDB/models/users');
let Groups =[];
let pupilInTheGame={};
pupilInTheGame.pupil=[];

module.exports = {
    createGroups: (req, res) => {
    },
    addPupil: (req, res) => {
        pupilInTheGame.pupil.push(req.body);
        console.log(pupilInTheGame);
        res.send(pupilInTheGame);
    },
    getAllPupilInTheGame: (req,res) =>
    {
        res.send(pupilInTheGame);
    }
}
