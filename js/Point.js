export default class Point
{
    constructor(x, y) {
        this.max_x = 500
        this.max_y = 500
        if(x >= 0 && x <= this.max_x) this.x = x; else x = 0
        if(y >= 0 && y <= this.max_y) this.y = y; else y = 0

    }

    set_x = (x) => {if(x >= 0 && x <= this.max_x) this.x = x};
    set_x = (y) => {if(y >= 0 && y <= this.max_y) this.y = y};
    get_x = () => {return this.x;}
    get_y = () => {return this.y;}
    toString = () => `Point -> x: ${this.x}\ty:${this.y}`
}