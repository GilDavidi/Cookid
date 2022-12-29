const socket = io();
let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get('userId');
let playerJson={};
playerJson.id=userId;
const URL = window.location.origin;
let playersArray;
let controller = {
    left:false,
    right:false,
    up:false
};
const keyListener =(event) => {
    let key_state = (event.type == "keydown")?true:false;
    switch(event.keyCode) {

        case 37:// left key
            controller.left = key_state;
            break;
        case 38:// up key
            controller.up = key_state;
            break;
        case 39:// right key
            controller.right = key_state;
            break;

    }
    playerJson.controller=controller;
    if(controller.left==true  || controller.right==true || controller.up==true ) {
        $.post(`${URL}/game/MovePlayer`, playerJson)
            .done(serverMessage => {
                console.log(serverMessage);
            })
            .fail((xhr, status, error) => {
                console.error("failed send to server " + error);
            });

    }


}


 const startGame = () =>
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

}

const gameLoop =() => {
    drawField();
    drawFloor();
    drawPlayers();
    window.requestAnimationFrame(gameLoop);
}


// Prepare canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const FLOOR_LVL = canvas.height - 10;

const drawField = () => {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

const drawFloor = () => {
  ctx.beginPath();
  ctx.strokeStyle = "#202830";
  ctx.moveTo(0, FLOOR_LVL);
  ctx.lineTo(canvas.width, FLOOR_LVL);
  ctx.stroke();

}

const drawPlayers = () => {
    ctx.beginPath();
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
          ctx.fillStyle = "#ff0000";// hex for red
          ctx.rect(playersArray.players[key].x, playersArray.players[key].y, playersArray.players[key].width, playersArray.players[key].height);
          ctx.fill();
      }
  }


}


window.addEventListener("keydown", keyListener)
window.addEventListener("keyup", keyListener);

startGame();
window.requestAnimationFrame(gameLoop);





