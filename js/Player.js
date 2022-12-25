import Point from "./Point.js";
// let canvas = document.getElementById('mycanvas');
// let ctx = canvas.getContext("2d");
// let playerlist = {};
// let index=0;
// const canvas_width = canvas.scrollWidth;
// const canvas_height = canvas.scrollHeight;
//
// console.log("the canvas width  and height : " , canvas.scrollWidth , canvas.scrollHeight);

export  default class Player {

    constructor(point, color) {
        this.set_point(point)
        // this.set_spdx(spdx);
        // this.set_spdy(spdy);
        console.log(`NEW PLAYER CRATED AT -> ${point}`)
    }

    set_point = (point) => this.point = point;
    set_color = (color) => this.color = color;

    toString = () => `Player -> ${this.point.toString()}`
    get_point = () => this.point

    moveUp = () => {
        console.log("press the up");

        this.set_point(new Point(this.point.get_x(), this.point.get_y() + 1))
    }
    moveDown = () => {
        console.log("press the up");
        this.set_point(new Point(this.point.get_x(), this.point.get_y() - 1))
    }
    moveLeft = () =>
    {
        console.log("press the left");
        if(this.point.get_x() -1 > 3 )
        {
            this.set_point(new Point(this.point.get_x() - 1, this.point.get_y()));
        }
        else
        {
            console.log("x is less then zero");
        }

    }
    moveRight = () =>
    {
        if(this.point.get_x() + 1 < 289 )
        {
            this.set_point(new Point(this.point.get_x() + 1, this.point.get_y()));
        }
        else
        {
            console.log("x is more then 289");
        }

    }

    SpaceAction = () =>
    {
        console.log("you press the Spacebutton action is on ")
    }
    BackspaceButton = () => {
        console.log("you press the Space_button")
    }

}