const socket = io();
let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get('userId');
let playerJson={};
playerJson.id=userId;
const URL = window.location.origin;
let playersArray;

export const startGame = (width, height) =>
{
  $.get(`${URL}/game/StartGame`)
      .done(serverMessage=>
      {
        console.log(serverMessage);
      })
      .fail((xhr, status, error) => {
        console.error("failed send to server " + error);
      });

  $.post(`${URL}/game/AddNewPlayer`,playerJson)
      .done(serverMessage=>
      {
          console.log(serverMessage);
      })
      .fail((xhr, status, error) => {
          console.error("failed send to server " + error);
      });

  setInterval(() => render(), 1000/60);
}

//player presses buttons and the object make actions
export const handleEvent = (e) => {
    //if(e.code == "ArrowUp") mission.playerMoveUp();
    // if(e.code == "ArrowDown") mission.playerMoveDown();
    if (e.code == "ArrowLeft")
    {
        $.post(`${URL}/game/MovePlayerLeft`,playerJson)
            .done(serverMessage=>
            {
                console.log(serverMessage);
            })
            .fail((xhr, status, error) => {
                console.error("failed send to server " + error);
            });
    }
  if(e.code == "ArrowRight")
  {
      $.post(`${URL}/game/MovePlayerRight`,playerJson)
          .done(serverMessage=>
          {
              console.log(serverMessage);
          })
          .fail((xhr, status, error) => {
              console.error("failed send to server " + error);
          });
  }
}

// Prepare canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const FLOOR_LVL = canvas.height - 10
export let frames = 0;
// Rendering method
export const render = () => {
  frames++;
  clearField();
  drawField();
  drawFloor();
  drawPlayers();
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

const drawPlayers = () => {

  $.get(`${URL}/game/GetPlayers`)
      .done(PlayersJSON => {
          playersArray=JSON.parse(JSON.stringify(PlayersJSON));
      })
      .fail((xhr, status, error) => {
        console.error("failed send to server" + error);
      });
  if(playersArray)
  {
      for(let key in playersArray.players)
      {
             ctx.fillRect(playersArray.players[key].x, playersArray.players[key].y, playersArray.players[key].width, playersArray.players[key].height);
      }
      ctx.stroke();
  }

}

export const getCurrentFrames = () => frames;

document.onkeydown = (event) => handleEvent(event)
startGame(canvas.width, canvas.height);




