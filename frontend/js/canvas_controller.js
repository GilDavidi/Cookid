
const socket = io();
let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get('userId');
let groupId = urlParams.get('groupId');
let playerJson={};
playerJson.id=userId;
playerJson.groupId=groupId;
socket.emit('addPupilToGroup',playerJson);
let canvas = document.getElementById('can');
let ctx = canvas.getContext("2d");
const URL = window.location.origin;
let  flag = false,
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
        let canvasImg = canvas.toDataURL();
        socket.emit('sendBoard',canvasImg);
    }
socket.on('updateBoard',(canvasImg)=>{
    console.log('Updating Board');
    let img = new Image();
    img.src = canvasImg;
    ctx.drawImage(img, 0, 0);
})
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
        y = 2;

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
