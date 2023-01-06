const User = require('../mongoDB/models/users');
let Groups =[];
let pupilInTheGame={};
pupilInTheGame.pupil=[];
const IsPupilAlreadyExist = (id)=>{
    for(let i=0;i<pupilInTheGame.pupil.length;i++)
    {
        if(pupilInTheGame.pupil[i].id==id)
            return true;
    }
    return false;
}
module.exports = {
    addPupil: (req, res) => {
        if(IsPupilAlreadyExist(req.body.id)== false)
        {
            pupilInTheGame.pupil.push(req.body);
            res.send(pupilInTheGame);
        }
        else
        res.send("This Student already connected");
    },
    getAllPupilInTheGame: (req,res) =>
    {
        res.send(pupilInTheGame);
    }
}
