
let Player = require('./Player');
const getRndInteger =(min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

module.exports= class Mission {
    Players = {};
    constructor(mission_width, mission_height) {
        this.width = mission_width
        this.height = mission_height
    }
    addNewPLayer=(playerId) =>
    {
        this.Players[playerId]= new Player(getRndInteger(0,150), 130, "white");
    }
    getPlayerPoint = (id) => {
        let currentPlayer = this.getPlayer(id);
        let playerPoint={};
        playerPoint.x=currentPlayer.get_x();
        playerPoint.y=currentPlayer.get_y();
        return playerPoint;
    }
    getPlayer = (id) => this.Players[id];
    getPlayersJSON= () => {
        let PlayersJSON ={};
        PlayersJSON.players=[]
        for(let key in this.Players)
        {
            let player={};
            player.id=key;
            player.x=this.Players[key].get_x();
            player.y=this.Players[key].get_y();
            player.width=this.Players[key].getWidth();
            player.height=this.Players[key].getHeight();
            PlayersJSON.players.push(player);
        }

        return PlayersJSON;
    }
    SetPlayerPos =(id,point) =>
    {
        let currentPlayer = this.getPlayer(id);
        currentPlayer.set_x(point.x);
        currentPlayer.set_y(point.y);
    }

}




