
let Point = require('./Point');
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
        let playerStartPoint = new Point(getRndInteger(0,150), 130);
        this.Players[playerId]= new Player(playerStartPoint, "white");
    }
    getPlayers= () => this.Players;
    getPlayer = (i) => this.Players[i];
    getPlayersJSON= () => {
        let PlayersJSON ={};
        PlayersJSON.players=[]
        for(let key in this.Players)
        {
            let player={};
            player.x=this.Players[key].get_x();
            player.y=this.Players[key].get_y();
            player.width=this.Players[key].getWidth();
            player.height=this.Players[key].getHeight();
            PlayersJSON.players.push(player);
        }

        return PlayersJSON;
    }
    playerMoveUp = () => {
        if(this.getPlayer().get_y() >= 0) this.getPlayer().moveUp();
    }
    playerMoveDown = () => {
        if(this.getPlayer().get_y() + this.getPlayer().getHeight() <= 140) this.getPlayer().moveDown()
    }
    playerMoveLeft = () => {
        if(this.getPlayer().get_x() > 0) this.getPlayer().moveLeft();
    }

    playerMoveRight = () => {
        if(this.getPlayer().get_x() + this.getPlayer().getWidth() < this.width) this.getPlayer().moveRight();
    }

}



