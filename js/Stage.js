import Point from "../GameServer/models/Point.js";
import Player from "../GameServer/models/Player.js";

export default class Stage {

    stageObjects = []
    player_start = new Point(50, 50);

    constructor(stage_width, stage_height) {
        this.width = stage_width
        this.height = stage_height
        this.stageObjects.push(new Player(this.player_start, "white"));
    }

    getGameObjects = () => this.stageObjects;
    getPlayer = () => this.stageObjects[0]

    playerMoveUp = () => {
        if(this.getPlayer().get_y() >= 0) this.getPlayer().moveUp();
    }
    playerMoveDown = () => {
        if(this.getPlayer().get_y() + this.getPlayer().getHeight() < this.height) this.getPlayer().moveDown()
    }
    playerMoveLeft = () => {
        if(this.getPlayer().get_x() > 0) this.getPlayer().moveLeft();
    }

    playerMoveRight = () => {
        if(this.getPlayer().get_x() + this.getPlayer().getWidth() < this.width) this.getPlayer().moveRight();
    }







}



