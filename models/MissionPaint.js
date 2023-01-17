
let Player = require('./Player');

module.exports= class MissionPaint {
    colors=["red","green","blue","yellow","orange","black","white"];
    Players = {};
    ReqPicture="";
    groupId="";
    constructor(groupId,groupPlayers){
        this.groupId= groupId;
        for (const key in groupPlayers)
        {
            this.Players[groupPlayers[key].id]=new Player(groupPlayers[key].id,groupPlayers[key].name);
        }
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
        return this.getPlayersColors();
    }

}




