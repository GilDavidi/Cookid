
let Player = require('./PlayerPaint');

module.exports= class Mission {
    Players = {};
    Board = [];
    constructor(){
        for(let i=0; i<100; i++) {
            this.Board[i] = [];
            for(let j=0; j<100; j++) {
                this.Board[i][j] = "white";
            }
        }
    }
    addNewPLayer=(playerId,name) =>
    {
        this.Players[playerId]= new Player(playerId,name);
    }
    getPlayer = (id) => this.Players[id];
    getBoard= () => {
        return this.Board;
    }
}




