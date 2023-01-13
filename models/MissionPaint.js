
let Player = require('./Player');

module.exports= class MissionPaint {
    colors=[];
    Players = {};
    ReqPicture="";
    constructor(){
        this.colors= ["red","green","blue","red","yellow","orange","black","white"];
    }
    addNewPLayer=(playerId,name) =>
    {
        this.Players[playerId]= new Player(playerId,name);
    }
    getPlayer = (id) => this.Players[id];
    geReqPicture= () => {
        return this.ReqPicture;
    }
    divideColors=()=>
    {
        let amountOfPupils= this.Players.length;
        for (let i = 0; i < this.colors.length; i++) {
            let pupilIndex = i % amountOfPupils
            this.Players[i].set_colors(this.colors[i]);
        }
    }
}




