import {handleEvent, startGame} from "./main_controller.js"

// Prepare canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const FLOOR_LVL = canvas.height - 10
export let frames = 0;
// Rendering method
export const render = (gameObjects) => {
  frames++;
  // console.log(frames)
  clearField();
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
  gameObjects.forEach((object) => {
    ctx.fillRect(object.get_x(), object.get_y(), object.getWidth(), object.getHeight())
  })
  ctx.stroke();

}

export const getCurrentFrames = () => frames;

document.onkeydown = (event) => handleEvent(event)
startGame(canvas.width, canvas.height);

