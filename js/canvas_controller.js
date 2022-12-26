import Player from "./Player.js";
import Point from "./Point.js";
const URL = window.location.origin;
//import Mission from "./Mission.js";
let gameRunning = true;

const player = new Player(new Point(50, 50), 0, 0, 'none')
const gameObjects = [player]
let mission;

// Initialize game, start game loop
export const startGame = (width, height) =>
{
  console.log("Start Game!!!!!!!!");
  //mission = new Mission(width, height);
  $.get(`${URL}/game/StartGame`)
      .done(massage =>
      {
        console.log(massage);
      })
      .fail((xhr, status, error) => {
        console.error("failed send to server" + error);
      });

  $.get(`${URL}/game/Update`)
      .done(massage =>
      {
        console.log(JSON.stringify(massage));
      })
      .fail((xhr, status, error) => {
        console.error("failed send to server" + error);
      });


  setInterval(() => render(mission.getPlayers()), 1000/60);



}

//player presses buttons and the object make actions
export const handleEvent = (e) => {
  if(e.code == "ArrowUp") mission.playerMoveUp();
  if(e.code == "ArrowDown") mission.playerMoveDown();
  if(e.code == "ArrowLeft") mission.playerMoveLeft();
  if(e.code == "ArrowRight") mission.playerMoveRight();
}

// Prepare canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const FLOOR_LVL = canvas.height - 10
export let frames = 0;
// Rendering method
export const render = (Players) => {
  frames++;
  // console.log(frames)
  clearField();
  drawField();
  drawFloor();
  drawPlayers(Players);
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

const drawPlayers = (gameObjects) => {
  gameObjects.forEach((object) => {
    ctx.fillRect(object.get_x(), object.get_y(), object.getWidth(), object.getHeight())
  })
  ctx.stroke();

}

export const getCurrentFrames = () => frames;

document.onkeydown = (event) => handleEvent(event)
startGame(canvas.width, canvas.height);




