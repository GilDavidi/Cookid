
module.exports= class Player {

    speed = 3;
    PLAYER_W = 10;
    PLAYER_H = 10;


    constructor(point, color) {
        this.set_point(point)
        console.log(`NEW PLAYER CRATED AT -> ${point}`)
    }

    set_point = (point) => this.point = point;
    set_color = (color) => this.color = color;

    toString = () => `Player -> ${this.point.toString()}`
    get_point = () => this.point
    get_x = () => this.point.get_x();
    get_y = () => this.point.get_y();

    moveUp = () => {
        const actionFrame = getCurrentFrames()
        while(getCurrentFrames() < actionFrame + 20) {
            setInterval( () => {this.point.set_y(this.point.get_y() - this.speed)}, 10)
        }
    }
    moveDown = () => this.point.set_y(this.point.get_y() + this.speed)
    moveLeft = () => this.point.set_x(this.point.get_x() - this.speed)
    moveRight = () => this.point.set_x(this.point.get_x() + this.speed)
    SpaceAction = () => console.log("you press the SpaceBar action is on ")
    BackspaceButton = () => console.log("you press the Space_button")
    getWidth = () => this.PLAYER_W
    getHeight = () => this.PLAYER_H

}
