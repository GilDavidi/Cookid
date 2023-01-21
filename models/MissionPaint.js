
let Player = require('./Player');
let scoreAlgorithm = require('../AlgorithmScore/DirecectedGraph');
let imageCompare =  require('../compareImages/compareImages');


module.exports= class MissionPaint {
    colors=["red","green","blue","yellow","orange","black","white"];
    Players = {};
    successRate=0;
    ReqPicture="";
    groupId="";
    constructor(groupId,groupPlayers){
        this.groupId= groupId;
        let arrayPlayers= [];
        for (const key in groupPlayers)
        {
            arrayPlayers.push(groupPlayers[key].id);
            this.Players[groupPlayers[key].id]=new Player(groupPlayers[key].id,groupPlayers[key].name);
        }
        scoreAlgorithm.setAllStudent(arrayPlayers);
        let randomNumber = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        this.ReqPicture=`../images/paint${randomNumber}.png`;

        const colorsPerPupil = Math.floor(this.colors.length / Object.values(this.Players).length);
        let colorIndex = 0;

        for (const value of  Object.values(this.Players)) {

            for (let j = -1; j < colorsPerPupil; j++) {
                if(this.colors[colorIndex]) {
                    value.add_color(this.colors[colorIndex]);
                    colorIndex++;
                }
            }
        }

    }
    getGroupId = () => {return this.groupId}
    getPlayers = () => {
        let players_scores = "";
        for (const value of  Object.values(this.Players)){
            players_scores += value.get_name();
            players_scores += " : ";
            players_scores += value.getScore();
            players_scores += ", ";
        }
        players_scores = players_scores.slice(0, -2);
        return players_scores;
    }
    geReqPicture= () => {
        return this.ReqPicture;
    }
    getPlayersColors=() => {
        let playerColorJson = {};
        for (let key in this.Players) {
            playerColorJson[key] = {};
            playerColorJson[key].colors = this.Players[key].get_colors();
            playerColorJson[key].name = this.Players[key].get_name();
        }
        return playerColorJson;
    }
    moveColor=(moveDetails) =>{
        for (let key in this.Players) {
            if(key==moveDetails.idPupilAsk)
            {
                this.Players[key].add_color(moveDetails.color)
            }
            else if (key==moveDetails.idPupilGive)
            {
                this.Players[key].remove_color(moveDetails.color)
            }
        }
        scoreAlgorithm.addTransfer(moveDetails.idPupilGive,moveDetails.idPupilAsk,moveDetails.color);
        return this.getPlayersColors();
    }
    endMission=async (endMissionDetails)=>
    {

        //compare images
         await imageCompare.compareImages(endMissionDetails.img,this.ReqPicture).then(successRate=>
               {
                   this.successRate=successRate;

               }

           )
        //score pupils
        for (let key in this.Players){
            this.Players[key].setScore(scoreAlgorithm.scoreStudent(key)) ;
            console.log(`student: ${key} receive  ${this.Players[key].getScore()}`);
        }

        return this.successRate;

    }

}




