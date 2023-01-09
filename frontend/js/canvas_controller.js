
const socket = io("http://localhost:3001");
let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get('userId');
let playerJson={};
playerJson.id=userId;
const URL = window.location.origin;
let canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;
let x = "black",
    y = 2;
const getPlayerName = () => {
    $.get(`${URL}/game/GetPlayerName`, playerJson)
        .done(serverMessage => {
            console.log(serverMessage);
        })
        .fail((xhr, status, error) => {
            console.error("failed send to server " + error);
        });
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
    $.post(`${URL}/game/GetPlayerName`, playerJson)
        .done(serverMessage => {
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

const init = () => {
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}


const findxy = (res, e) => {
    const rect = canvas.getBoundingClientRect();
    console.log(`Mouse position: (${currX}, ${currY})`);
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 1, 1);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}
const draw = () => {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = x;
        ctx.lineWidth = y;
        ctx.stroke();
        ctx.closePath();
    }

const color = (obj) => {
        switch (obj.id) {
            case "green":
                x = "green";
                break;
            case "blue":
                x = "blue";
                break;
            case "red":
                x = "red";
                break;
            case "yellow":
                x = "yellow";
                break;
            case "orange":
                x = "orange";
                break;
            case "black":
                x = "black";
                break;
            case "white":
                x = "white";
                break;
        }
        if (x == "white") y = 14;
        else y = 2;

    }
    const draw_rec = () => {
        console.log("draw rectangle on canvas");
        ctx.beginPath();
        ctx.fillStyle = x;
        ctx.fillRect(currX, currY, 2, 2);
        ctx.closePath();
    }
//Timer JS
// Calculate the time 10 minutes from now
let deadline = new Date().getTime() + 600000;

// Update the timer every second
setInterval(function() {
    // Get the current time
    let currentTime = new Date().getTime();

    // Calculate the time remaining
    let timeRemaining = deadline - currentTime;

    // Convert the time remaining to minutes and seconds
    let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Display the time remaining on the page
    document.getElementById("timer").innerHTML = "Time remaining: " + minutes + ":" + seconds;
}, 1000);

// NOT IN USE

// function erase() {
//     var m = confirm("Want to clear");
//     if (m) {
//         ctx.clearRect(0, 0, w, h);
//         document.getElementById("canvasimg").style.display = "none";
//     }
// }
//
// function save() {
//     document.getElementById("canvasimg").style.border = "2px solid";
//     let dataURL = canvas.toDataURL();
//     document.getElementById("canvasimg").src = dataURL;
//     document.getElementById("canvasimg").style.display = "inline";
// }
startGame();
init();




// let playersArray;
// let controller = {
//     left:false,
//     right:false,
//     up:false,
//     keyListener: (event) => {
//         let key_state = (event.type == "keydown")?true:false;
//         switch(event.keyCode) {
//             case 37:// left key
//                 controller.left = key_state;
//                 break;
//             case 38:// up key
//                 controller.up = key_state;
//                 break;
//             case 39:// right key
//                 controller.right = key_state;
//                 break;
//         }
//         playerJson.point={};
//         playerJson.point.x=player.x;
//         playerJson.point.y=player.y;
//         if(controller.left==true  || controller.right==true || controller.up==true ) {
//             $.post(`${URL}/game/MovePlayer`, playerJson)
//                 .done(serverMessage => {
//                     console.log(serverMessage);
//                 })
//                 .fail((xhr, status, error) => {
//                     console.error("failed send to server " + error);
//                 });
//         }
//      }
// };
// let player = {
//     height:10,
//     jumping:true,
//     width:10,
//     x:144, // center of the canvas
//     x_velocity:0,
//     y:0,
//     y_velocity:0
//
// };
// const calPlayerPos = () =>
// {
//     if (controller.up && player.jumping == false) {
//
//         player.y_velocity -= 20;
//         player.jumping = true;
//         console.log("x:"+ player.x + " y:" +player.y );
//         console.log("vel_x:"+ player.x_velocity + " vel_y:" +player.y_velocity );
//
//     }
//
//     if (controller.left) {
//         player.x_velocity -= 0.5;
//
//     }
//
//     if (controller.right) {
//
//         player.x_velocity += 0.5;
//
//     }
//     player.y_velocity += 1.5;// gravity
//     player.x += player.x_velocity;
//     player.y += player.y_velocity;
//     player.x_velocity *= 0.9;// friction
//     player.y_velocity *= 0.9;// friction
//
//
//
//
//     // if rectangle is falling below floor line
//     if (player.y > 130) {
//
//         player.jumping = false;
//         player.y = 130;
//         player.y_velocity = 0;
//
//     }
//
//     // if rectangle is going off the left of the screen
//     if (player.x < -32) {
//
//         player.x = 320;
//
//     } else if (player.x > 320) {// if rectangle goes past right boundary
//
//         player.x = -32;
//     }
// }
//
// // Prepare canvas and context
// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");
//
//
// const drawCurrentPlayer = () =>{
//     ctx.fillStyle = "#ff0000";// hex for red
//     ctx.rect(player.x, player.y, player.width, player.height);
//     ctx.fill();
// }
// const drawPlayers = () => {
//     ctx.beginPath();
//     $.get(`${URL}/game/GetPlayers`)
//         .done(PlayersJSON=>
//         {
//             playersArray=JSON.parse(JSON.stringify(PlayersJSON));
//
//         })
//         .fail((xhr, status, error) => {
//             console.error("failed send to server " + error);
//         });
//     console.log(playersArray);
//
//   if(playersArray)
//   {
//
//       for(let key in playersArray.players)
//       {
//           if(playersArray.players[key].id != userId) { //don't paint the current player
//               ctx.fillStyle = "#ff0000";// hex for red
//               ctx.rect(playersArray.players[key].x, playersArray.players[key].y, playersArray.players[key].width, playersArray.players[key].height);
//               ctx.fill();
//           }
//       }
//   }
//
//
// }
// const drawBoardBackGround =() =>
// {
//     ctx.fillStyle = "#202020";
//     ctx.fillRect(0, 0, 320, 180);// x, y, width, height
// }
// const drawFloorLine =() =>
// {
//     ctx.fillStyle = "white";
//     ctx.strokeStyle = "white";
//     ctx.lineWidth = 4;
//     ctx.beginPath();
//     ctx.moveTo(0, 164);
//     ctx.lineTo(320, 164);
//     ctx.stroke();
// }
//
// window.addEventListener("keydown", controller.keyListener)
// window.addEventListener("keyup", controller.keyListener);

// const gameLoop= () =>
// {
//     calPlayerPos();
//     drawBoardBackGround();
//     drawCurrentPlayer();
//     drawPlayers();
//     drawFloorLine();
//
//     // call update when the browser is ready to draw again
//     window.requestAnimationFrame(gameLoop);
// }
// window.requestAnimationFrame(gameLoop);