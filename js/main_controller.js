import {render} from "./canvas_controller.js"
import Player from "./Player.js";
import Point from "./Point.js";
import Stage from "./Stage.js";
let gameRunning = true
const player = new Player(new Point(50, 50), 0, 0, 'none')
const gameObjects = [player]
let stage;

// Initialize game, start game loop
export const startGame = (width, height) =>
{
  console.log("->\tGame Started")
  stage = new Stage(width, height)
  setInterval(() => render(stage.getGameObjects()), 1000/60)

  // while(gameRunning)
  // render(gameObjects);

}

//player presses buttons and the object make actions
export const handleEvent = (e) => {
  if(e.code == "ArrowUp") stage.playerMoveUp();
  if(e.code == "ArrowDown") stage.playerMoveDown();
  if(e.code == "ArrowLeft") stage.playerMoveLeft();
  if(e.code == "ArrowRight") stage.playerMoveRight();
}
// startGame();

