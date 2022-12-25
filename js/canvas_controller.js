import {handleEvent, startGame} from "./main_controller.js"

// Prepeare canvas and context
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const FLOOR_LVL = canvas.height - 10
const PLAYER_W = 10;
const PLAYER_H = 10;
export  const canvas_width = canvas.getBoundingClientRect().width;
export  const canvas_height = canvas.getBoundingClientRect().height;



// Rendering method
export const render = (gameObjects) => {
  // console.log("->\tRendering...")

  drawField();
  drawFloor();
  drawGameObjects(gameObjects);

}

const drawFloor = () => {
  ctx.beginPath();
  ctx.moveTo(0, FLOOR_LVL);
  ctx.lineTo(canvas.width, FLOOR_LVL);
  ctx.stroke();
  ctx.closePath();
}

const clearField = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const drawField = () => {
  ctx.fillStyle = "white";
  ctx.strokeRect(0, 0, canvas.width, canvas.height)
}

const drawGameObjects = (gameObjects) => {
  // console.log(gameObjects)
  // console.log("->\tRendering Player")
  gameObjects.forEach((object) => {
    ctx.fillRect(
        object.get_point().get_x(),
        FLOOR_LVL -  PLAYER_H,
        PLAYER_W, PLAYER_H)
  })
  ctx.stroke();

}

document.onkeydown = function (event){
  clearField();
  handleEvent(event)
}




startGame();
