const User = require('../mongoDB/models/users');
const recommandGroups =require('../DivingGroupsAlgoritm/DivingGroupsAlgoritm')
let Groups =[];
let pupilInTheGame={};
pupilInTheGame.pupil=[];
const IsPupilAlreadyExist = (id)=>{
    for(let i=0;i<pupilInTheGame.pupil.length;i++)
    {
        if(pupilInTheGame.pupil[i].id==id)
            return pupilInTheGame.pupil[i].name;
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
    },
    getRecommendedGroups: async (req,res)=> {
        let pupils = [];
        for (let i = 0; i < pupilInTheGame.pupil.length; i++) {
            await User.findOne({'id': Number(pupilInTheGame.pupil[i].id)})
                .then(result => {
                    if (result) {
                        let pupil = {};
                        pupil.id = result.id;
                        pupil.score = result.score;
                        pupil.connections = result.connections;
                        pupils.push(pupil);
                    }
                })
                .catch(err => console.log(err));
        }
        let recommendedGroupsById = recommandGroups.recomandedGroups(pupils);
        for (let i = 0; i < recommendedGroupsById.length; i++) {
            for (let key in recommendedGroupsById[i]) {
                let arrayTemp = recommendedGroupsById[i][key].slice();
                recommendedGroupsById[i][key].length = 0;
                for (let j = 0; j < arrayTemp.length; j++) {
                    recommendedGroupsById[i][key].push(`${IsPupilAlreadyExist(arrayTemp[j])}:${arrayTemp[j]}`);
                }
            }
        }
        res.send(recommendedGroupsById);

    }

}
