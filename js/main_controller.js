import {render} from "./canvas_controller.js"
import Player from "./Player.js";
import Point from "./Point.js";
let gameRunning = true
const player = new Player(new Point(50, 50), 0, 0, 'none')
const gameObjects = [player]


// Initialize game, start game loop
export const startGame = () =>
{
  console.log("->\tGame Started")

  setInterval(() =>render(gameObjects), 100)

  // while(gameRunning)
  // render(gameObjects);

}

//player press button  and the object make action
export const handleEvent = (e) => {
  console.log("x is : " , player.get_point().get_x() , " y is : " , player.get_point().get_y() );
  switch (e.code){
    case "ArrowUp": gameObjects[0].moveUp(); break;
    case "ArrowDown": gameObjects[0].moveDown(); break;
    case "ArrowLeft": gameObjects[0].moveLeft(); break;
    case "ArrowRight": gameObjects[0].moveRight(); break;
    case "Space" :console.log("Space Event");gameObjects[0].SpaceAction();break;
    default: break;

  }
}
// startGame();

