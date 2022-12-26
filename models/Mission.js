
let Point = require('./Point');
let Player = require('./Player');


module.exports= class Mission {

    Players = []
    player_start = new Point(50, 50);

    constructor(mission_width, mission_height) {
        this.width = mission_width
        this.height = mission_height
        this.Players.push(new Player(this.player_start, "white"));
    }

    getPlayers= () => this.Players;
    getPlayer = () => this.Players[0]

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



