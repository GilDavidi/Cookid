
module.exports= class Player {
    color=0;
    jumping=true;
    PLAYER_W = 10;
    PLAYER_H = 10;
    x_velocity=0;
    y_velocity= 0;
    x=0;
    y=0;

    constructor(x,y, color) {
        this.set_x(x);
        this.set_y(y);
        this.set_color(color);
        console.log(`NEW PLAYER CRATED AT X->${x} Y->${y}`);
    }
    set_x = (x) => this.x = x
    set_y = (y) => this.y = y;
    setX_velocity = (x_velocity) => this.x_velocity = x_velocity;
    setY_velocity = (y_velocity) => this.y_velocity = y_velocity;
    setJump_Status = (jump) => this.jumping = jump;
    set_color = (color) => this.color = color;


    get_x = () => this.x;
    get_y = () => this.y;
    getJumpStatus = () => this.jumping
    getX_velocity = () => this.x_velocity
    getY_velocity = () => this.y_velocity
    getWidth = () => this.PLAYER_W
    getHeight = () => this.PLAYER_H
}
