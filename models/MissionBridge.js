
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
    getPlayer = (id) => this.Players[id];
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

    playerMove=(id,controller) => {
        console.log(controller);
        let currentPlayer = this.getPlayer(id);
        if (controller.up=="true" && currentPlayer.getJumpStatus() == false) {
            currentPlayer.setY_velocity(currentPlayer.getY_velocity()-20);
            currentPlayer.setJump_Status(true);
        }

        if (controller.left=="true") {
            currentPlayer.setX_velocity(currentPlayer.getX_velocity()-0.5);
        }

        if (controller.right=="true") {
            currentPlayer.setX_velocity(currentPlayer.getX_velocity()+0.5);

        }
        console.log("x= "+currentPlayer.get_x()+ "y= "+currentPlayer.get_y())
        console.log("y_vel= "+currentPlayer.getY_velocity()+ "x_vel= "+currentPlayer.getX_velocity())

        currentPlayer.setY_velocity(currentPlayer.getY_velocity()+1.5);//gravity
        currentPlayer.set_x(currentPlayer.getX_velocity()+ currentPlayer.get_x());
        currentPlayer.set_y(currentPlayer.getY_velocity()+ currentPlayer.get_y());

        currentPlayer.setY_velocity(currentPlayer.getY_velocity()*0.9);
        currentPlayer.setX_velocity(currentPlayer.getX_velocity()*0.9);

        // if rectangle is falling below floor line
         if (currentPlayer.get_y() > this.width-10) {
            currentPlayer.setJump_Status(false);
            currentPlayer.set_y(this.width-10);
            currentPlayer.setY_velocity(0);
         }

        // if rectangle is going off the left of the screen
         if (currentPlayer.get_x() < -32) {

            currentPlayer.set_x(320);

         } else if (currentPlayer.get_x() > 320) {// if rectangle goes past right boundary
             currentPlayer.set_x(-32);

         }


    }

}



