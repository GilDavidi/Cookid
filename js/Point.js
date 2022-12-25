export default class Point
{
    constructor(x, y) {
        this.set_x(x);
        this.set_y(y);
    }

    set_x = (x) => this.x = x
    set_y = (y) => this.y = y;
    get_x = () => this.x;
    get_y = () => this.y;
    toString = () => `Point -> x: ${this.x}\ty:${this.y}`
}