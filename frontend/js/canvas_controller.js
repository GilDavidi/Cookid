const socket = io();
let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get('userId');
let groupId = urlParams.get('groupId');
let userName = urlParams.get('userName');
let isTeacher = urlParams.get('isTeacher');
const tableLogs = document.getElementById("Logs");

let playerJson={};
playerJson.id=userId;
playerJson.groupId=groupId;
playerJson.name=userName;
let askDetails={};
askDetails.name=userName;
let ColorSelection=  document.getElementById('ColorSelection');
let table=  document.getElementById('table-bordered');
if(!isTeacher) {
    socket.emit('addPupilToGroup', playerJson);
}
else
{
    socket.emit('addTeacherToGroup', playerJson);
}
let canvas = document.getElementById('can');
let ctx = canvas.getContext("2d");
const URL = window.location.origin;
let canvasImg;
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
        if(key==userId && !isTeacher)
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
    if(isTeacher)
    {
        document.getElementById("turquoise").style.display = 'none';

    }
    //for pupil remove the table log
    else
    {
        tableLogs.style.display = 'none';
    }
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
            if(rows[i].id!="turquoise") {
                table.removeChild(rows[i]);
            }
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
    if (isTeacher){
        return;
    }
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.pageX - canvas.offsetLeft;
        currY = e.pageY - canvas.offsetTop;

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
            currX = e.pageX - canvas.offsetLeft;
            currY = e.pageY - canvas.offsetTop;
            draw();
        }
    }
}



const draw = () => {
        if (isTeacher){
           return;
        }
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = x;
        ctx.lineWidth = y;
        ctx.stroke();
        ctx.closePath();
        canvasImg = canvas.toDataURL();

    socket.emit('sendBoard',canvasImg);
    };
socket.on('updateBoard',(canvasImg)=>{
    let img = new Image();
    img.src = canvasImg;
    img.onload=() => {
        ctx.drawImage(img, 0, 0);
    }
})



const color = (obj) => {
        switch (obj.id) {
            case "green":
                x = "green";
                y = 2;
                break;
            case "blue":
                x = "blue";
                y = 2;
                break;
            case "red":
                x = "red";
                y = 2;
                break;
            case "yellow":
                x = "yellow";
                y = 2;
                break;
            case "orange":
                x = "orange";
                y = 2;
                break;
            case "black":
                x = "black";
                y = 2;
                break;
            case "white":
                x = "white";
                y = 2;
                break;
            case "turquoise":
                x = "#d7f9f6";
                y = 7;
                break;
        }
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

    if(minutes==9 && seconds ==50)
    // if (minutes == 50)
    {
        let missionEnd={};
        let image = canvas.toDataURL("image/png");
        missionEnd.endMissionDetails={};
        missionEnd.endMissionDetails.groupId=groupId;
        missionEnd.endMissionDetails.img=image;
        missionEnd.endMissionDetails.isTeacher = isTeacher;
        console.log('mission end');
        $.post(`${URL}/game/endMission`,missionEnd)
            .done(linkEndMission =>
                {
                    window.location.replace(linkEndMission);
                }

            )
            .fail((xhr, status, error) => {
                console.error("failed send to server " + error);
            });
    }
}, 1000);



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

socket.on('updateLogTable',(message)=> {

    let ids = table.getElementsByTagName("th");

    let myString ="בוצעה העברת צבע ";
    myString +=convertColorName(message.color);
    let askerName;
    let giverName;

    for (let i = 0; i < ids.length; i++) {
        if (ids[i].id === message.idPupilAsk)
        {
            askerName= ids[i].innerHTML;
        }
        if (ids[i].id ===message.idPupilGive )
        {
            giverName=ids[i].innerHTML;
        }
    }
    myString+= " מ";
    myString+= askerName;
    myString+= " ל";
    myString+= giverName;
    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    console.log(myString);
    console.log(hours + ":" + minutes + ":" + seconds);

    // Create a new row
    let newRow = document.createElement("tr");
    let timeCell = document.createElement("th");
    timeCell.innerText=hours + ":" + minutes + ":" + seconds;
    newRow.appendChild(timeCell);
    let messageCell = document.createElement("th");
    messageCell.innerText=myString;
    newRow.appendChild(messageCell);
    tableLogs.appendChild(newRow);


});






let moveColorDetails={};
const colorAskPupil=()=> {
    if (isTeacher){
        return;
    }
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
    if (isTeacher){
        return;
    }
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
        if (isTeacher){
            return;
        }
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
