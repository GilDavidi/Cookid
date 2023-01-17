
const socket = io();
let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get('userId');
let groupId = urlParams.get('groupId');
let userName = urlParams.get('userName');
let playerJson={};
playerJson.id=userId;
playerJson.groupId=groupId;
playerJson.name=userName;
let askDetails={};
askDetails.name=userName;
let ColorSelection=  document.getElementById('ColorSelection');
let table=  document.getElementById('table-bordered');
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




const updateColors =(playerColors) =>
{
    for (let key in playerColors)
    {
        //fill my colors
        if(key==userId)
        {
            for (const value of playerColors[key].colors) {
                ColorSelection.innerHTML += `<div class="paint" style="background:${value}" id="${value}" onClick="color(this)" ></div>`;
            }
        }
        //fill all pupils colors
        else
        {

            // Create a new row
            let newRow = document.createElement("tr");

            let nameCell = document.createElement("th");
            nameCell.id=key;
            nameCell.innerText=playerColors[key].name;
            newRow.appendChild(nameCell);
            let colorCell = document.createElement("td");
            newRow.appendChild(colorCell);


            let ColorSelectionTable= document.createElement("div");
            ColorSelectionTable.className="ColorSelectionTable";
            // Set the content of the cells

            for (const value of playerColors[key].colors) {
                ColorSelectionTable.innerHTML +=  `<div class="paint" style="background:${value}" id="${value}" onClick="colorAskPupil(this)" ></div>`;
            }
            colorCell.appendChild(ColorSelectionTable);
            table.appendChild(newRow);

        }

    }
}

 const startGame = () =>
{
    $.get(`${URL}/game/GetRequestPicture`)
        .done(imgURL => {
            $('#imageContainerId').attr('src',imgURL);

        })
        .fail((xhr, status, error) => {
            console.error("failed send to server " + error);
        });

    $.get(`${URL}/game/getPlayersColors`)
        .done(playerColors => {
            updateColors(playerColors);
        })
        .fail((xhr, status, error) => {
            console.error("failed send to server " + error);
        });
}
const clearColors= ()=>
{
        let table = document.getElementById("table-bordered");
        let rows = table.getElementsByTagName("tr");
        for (let i = rows.length-1; i > 0; i--) {
            table.removeChild(rows[i]);
        }
        let colorSelection = document.getElementById("ColorSelection");
        while (colorSelection.firstChild) {
            colorSelection.removeChild(colorSelection.firstChild);
        }
}
socket.on('updateColors',(playerColors)=>{
    clearColors();
    updateColors(playerColors);
});
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
    console.log('Draw Board',canvasImg);
    socket.emit('sendBoard',canvasImg);
    }
socket.on('updateBoard',(canvasImg)=>{
    console.log('Updating Board',canvasImg);
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
let deadline = new Date().getTime() + (10 * 60 * 1000);

// Update the timer every second
setInterval(function() {
    // Get the current time
    let currentTime = new Date().getTime();

    // Calculate the time remaining
    let timeRemaining = deadline - currentTime;

    // Convert the time remaining to minutes and seconds
    let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Add a leading zero to seconds if less than 10
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    // Display the time remaining on the page
    document.getElementById("timer").innerHTML = "הזמן שנותר: " + minutes + ":" + seconds;
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

// Get the wrapper

let wrapper = document.getElementById("wrapper");

// Get the modal element
let modal = document.getElementById("myModal");
// Get the yes and no buttons
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
// Get the text element
const modalText = document.getElementById("modalText");
const convertColorName =(colorName)=>
{
    switch(colorName)
    {
        case 'green':
            return'ירוק'
        break;
        case 'blue':
            return'כחול'
            break;
        case 'red':
            return'אדום'
            break;
        case 'orange':
            return'כתום'
            break;
        case 'yellow':
            return'צהוב'
            break;
        case 'black':
            return'שחור'
            break;
        case 'white':
            return'לבן'
            break;
    }

}

let moveColorDetails={};
const colorAskPupil=()=> {
// Get all elements with class "paint"
const paintDivs = document.getElementsByClassName("paint");

// Loop through each element and attach a click event
for (let i = 0; i < paintDivs.length; i++) {
    paintDivs[i].addEventListener("click", function() {
        // Get the text content of the nearest "th" element
        const studentName = this.closest("tr").querySelector("th") ? this.closest("tr").querySelector("th").textContent : "";
        const idPupilGive= this.closest("tr").querySelector("th").id;
        // Get the color name from the id attribute
        const colorName = this.getAttribute("id");
        // Show the modal
        yesBtn.innerText="כן";
        noBtn.innerText="לא";
        modal.style.display = "block";
        wrapper.classList.add("modal-open");
        // Set the text in the modal
        let colorNameTranslate=convertColorName(colorName);

        modalText.innerHTML = "?האם לבקש מ" + studentName + " את הצבע ה" + colorNameTranslate;
        askDetails.idPupilAsk= userId;
        askDetails.idPupilGive= idPupilGive;
        askDetails.color= colorName;
    });
}

}

const showAskColor =(studentName,colorName) =>
{
    yesBtn.innerText="מאשר";
    noBtn.innerText="לא מאשר";
    modal.style.display = "block";
    wrapper.classList.add("modal-open");
    // Set the text in the modal
    let colorNameTranslate=convertColorName(colorName);
    modalText.innerHTML = studentName + " מבקש ממך את הצבע " + colorNameTranslate;
}


// When the user clicks on the yes button, do the ask
yesBtn.onclick = function() {
    if (yesBtn.innerText == "כן")
    {
    socket.emit('askColor',askDetails);
    }
    else
    {
        socket.emit('moveColor',moveColorDetails);
    }
    modal.style.display = "none";
    wrapper.classList.remove("modal-open");

}

socket.on('showAskColor',askMessage=>
    {
        moveColorDetails.color=askMessage.color;
        moveColorDetails.idPupilAsk= askMessage.idPupilAsk;
        moveColorDetails.idPupilGive= askMessage.idPupilGive;
        moveColorDetails.groupId=groupId;
        showAskColor(askMessage.name,askMessage.color);
    }
)
// When the user clicks on the no button, close the modal
noBtn.onclick = function() {
    modal.style.display = "none";
    wrapper.classList.remove("modal-open");
}
// When the user clicks anywhere outside the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

startGame();
init();
