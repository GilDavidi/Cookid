import {render} from "../view/canvas_controller.js"
import Player from "../model/Player.js";
import Point from "../model/Point.js";
let gameRunning = true
const player = new Player(new Point(50, 50), 0, 0, 'none')
const gameObjects = [player]


// Initialize game, start game loop
export const startGame = () => {
  console.log("->\tGame Started")
    setInterval(() =>render(gameObjects), 100)
    // while(gameRunning)
  // render(gameObjects);

}
export const handleEvent = (e) => {
  // alert(e.key)
  switch (e.key){
    case "ArrowUp": gameObjects[0].moveUp(); break;
    case "ArrowDown": gameObjects[0].moveDown(); break;
    case "ArrowLeft": gameObjects[0].moveLeft(); break;
    case "ArrowRight": gameObjects[0].moveRight(); break;
    default: break;
  }
}
// startGame();

