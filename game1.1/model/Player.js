import Point from "./Point.js";
// let canvas = document.getElementById('mycanvas');
// let ctx = canvas.getContext("2d");
// let playerlist = {};
// let index=0;
// const canvas_width = canvas.scrollWidth;
// const canvas_height = canvas.scrollHeight;
//
// console.log("the canvas width  and height : " , canvas.scrollWidth , canvas.scrollHeight);

export  default class Player
{

    constructor (point, spdx, spdy, color)
    {
        this.set_point(point)
        // this.set_spdx(spdx);
        // this.set_spdy(spdy);
        console.log(`NEW PLAYER CRATED AT -> ${point}`)
    }

    set_point = (point) => this.point = point;
    set_color = (color) => this.color = color;

    toString = () => `Player -> ${this.point.toString()}`
    get_point = () => this.point

    moveUp = () => {this.set_point(new Point(this.point.get_x(), this.point.get_y() + 1))}
    moveDown = () => {this.set_point(new Point(this.point.get_x(), this.point.get_y() - 1))}
    moveLeft = () => {this.set_point(new Point(this.point.get_x()-1, this.point.get_y()))}
    moveRight = () => {this.set_point(new Point(this.point.get_x()+1, this.point.get_y()))}
    // get_color(){
    //     return this.color;
    // }



    //
    // //change the speed of our entity
    // speed_player()
    // {
    //     console.log("x is " + this.get_x() + " y is " + this.get_y());
    //
    // }
    //
    // //draw the design of our entity
    // draw_player(color)
    // {
    //     ctx.beginPath();
    //     ctx.lineWidth = "6";
    //     ctx.strokeStyle = color;
    //     ctx.rect(5, 5, 5, 5);
    //     ctx.stroke();
    //     ctx.fillStyle = this.get_color() ;
    // }
    //
    // //check the entiy stay in the boundaries
    // check_entity_pos()
    // {
    //     if(this.get_x() > canvas_width){
    //         console.log("x out of baclne");
    //         this.change_derctionx();
    //     }
    //     if( this.get_x() < 0 ){
    //         console.log("x is less then  zero");
    //         this.change_derctionx();
    //     }
    //     if(this.get_y() > canvas_width){
    //         console.log("y is out of balance");
    //         this.change_directiony();
    //     }
    //     if(e1.get_y() < 0 ){
    //         console.log("y is less then zero");
    //         this.change_directiony();
    //     }
    //     console.log("x is " + this.get_x() +" y is " + this.get_y());
    // }
    //
    //
    //
    // //check the distance between to entity
    // get_distance_between_entity(entity)
    // {
    //     console.log("this is get distance between");
    //     console.log("this x is " + this.get_x() + "and entity x is " + entity.get_x());
    //     var vx = this.get_x() - entity.get_x();
    //     var vy = this.get_y() - entity.get_y();
    //     return Math.sqrt(vx^2+vy^2);
    // }
    //
    // //call the check distance and then we see what the distance between two entity
    // check_colidning_between_two_entity()
    // {
    //     console.log("check if there is colliding between two entity");
    //     for(var key in enlist)
    //     {
    //         console.log("key is : " + key);
    //         var distance = this.getdistancebeetweenentity(enlist[key]);
    //     }
    //     console.log(" distance is : " + distance);
    //     return distance < 10 ;
    // }
    // //moveplayerwitharrowkey
    // move_player()
    // {
    //     // Add event listener on keypress
    //     console.log("move player");
    //     document.addEventListener('keypress', (event) =>
    //     {
    //         var name = event.key;
    //         var code = event.code;
    //         // Alert the key name and key code on keydown
    //         alert(`Key pressed ${name} \r\n Key code value: ${code}`);
    //     }, false);
    //
    // }

}

//
// //section of creat entity and add them to list of enlist
// let e1 = new player(1,1,1,1,"blue");
//
// /*
// var e2 = new entity(0,0,8,8,"rectangle","red",100);
// var e3 = new entity(0,0,3,3,"rectangle","yellow",200);
// var e4 = new entity(0,0,2,2,"rectangle","black",200);
// */
// enlist['e1']=e1;
// //enlist['e2']=e2;
// //enlist['e3']=e3;
// //enlist['e4']=e4;
//
//
// //section to change the speed
// function update(){
//     //clear the screen more easy to see
//     ctx.clearRect(0,0,canvas.scrollWidth,canvas.scrollHeight)
//
//     for(var number in enlist){
//         enlist[number].draw_entity();
//         enlist[number].move_player();
//
//
//     }
// }
//
//
//
//
//
// //ask the browser where the mouse is when we move him
// setInterval(update,100);
//
//
//
//
//
//
// const func_gbd = () => {
//     console.log("hey gbd");
//
// };
//
//
//
//
// function player(id,x,y,spdx,spdy){
//    var player = {
//     mid:id,
//     mx:x,
//     my:y,
//     mspdx:spdx,
//     mspdy:spdy
//
//   };
//   playerlist[mid] = player
// }
//
// function enemy(id,x,y,spdx,spdy){
//   var enemy = {
//     mid:id,
//     mx:x,
//     my:y,
//     mspdx:spdx,
//     mspdy:spdy
//   };
//   enemylist[mid] = enemy;
// }
//
// player(1,1,1,3,3);
// player(2,1,1,20,20);
// player(3,1,1,30,30);
// enemy(1,2,2,4,4);
// enemy(1,3,3,4,4);
//

