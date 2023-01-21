require("dotenv").config({path: 'config/.env'});
//data base
const db = require('./mongoDB/dbConnection');
const express = require('express');
const fileLoaderRouter =require('./routers/fileLoaderRouter');
const gameRouter =require('./routers/gameRouter');
const loginRouter =require('./routers/loginRouter')
const socket = require('socket.io');
const app = express();
const axios = require('axios').default;
const URL = process.env.URL;
const gameController= require('./controllers/gameController');
let pupilList={};

db.connectToDB();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

const cors = require('cors');
const path = require("path");
const server = require("express/lib/application");
const groupsRouter = require("./routers/groupsRouter");
const previousGamesRouter = require("./routers/previousGamesRouter");
app.use(cors());

//load files
app.use('/', fileLoaderRouter);
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/favicon.ico', express.static('./favicon.ico'));

app.use(express.static(path.join(__dirname, 'frontend')))

//game
app.use('/game',gameRouter);

//login
app.use('/login',loginRouter);

//groups
app.use('/groups',groupsRouter);

//previousGames
app.use('/previousGames',previousGamesRouter)

// create server
 serverExpress = app.listen(3001, () => {
    console.log("server its listening on port 3001");});



const io = socket(serverExpress);

const session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
});
app.use(session);
const sharedsession = require("express-socket.io-session");
io.use(sharedsession(session));


// Runs when client connect to our sever
let connection=0;
let teacherSocketId;
let pupilSockets={};
pupilSockets.pupils=[];

const isPupilConnected =(id)=>{

    let result=false;
    pupilSockets.pupils.forEach(
        (pupil)=>{
            if(pupil.id==id)
            {
                result= pupil.socketId;
            }
    });
    return result;
}

const switchSocketId =(id,socketId)=>
{
    pupilSockets.pupils.forEach(
        (pupil)=> {
            if (pupil.id == id)
                pupil.socketId = socketId;
        });
}
io.on('connection',(client) => {
        // Save the socket id in the session
        client.handshake.session.socketId = client.id;
        client.handshake.session.save();
        connection++;
        client.on('disconnect', () => {
            connection--;
        });

        client.on('pupilConnected', (pupilDetails) => {
            let result = isPupilConnected(pupilDetails.id);

            if (result != false) {
                io.sockets.sockets.forEach((socketPupil) => {
                    // If given socket id is exist in list of all sockets, kill it
                    if (socketPupil.id == result) {
                        io.to(socketPupil.id).emit('close');
                    }
                });

            }

            pupilSockets.pupils.push({id: pupilDetails.id, socketId: client.id});

            let pupilJSONDetails = {};
            pupilJSONDetails.id = pupilDetails.id;
            pupilJSONDetails.name = pupilDetails.name;
            axios.post(`${URL}/groups/addPupil`, pupilJSONDetails)
                .then((pupilListResponse) => {
                    if (teacherSocketId) {
                        io.to(teacherSocketId).emit('updatePupilList', pupilListResponse.data);
                    }
                    console.log(`Pupil with id ${pupilDetails.id}  and  connected`);

                })
                .catch(err => {
                    console.error(err.message);
                })


        })

        client.on('teacherConnected', () => {
            teacherSocketId = client.id;
            console.log("The Teacher connected")
        });
        client.on('saveGroups', (groups) => {
            for (const key in groups) {
                if (groups.hasOwnProperty(key) && groups[key].length) {
                    const element = groups[key];
                    for (let i = 0; i < element.length; i++) {
                        const pupilSocket = isPupilConnected(element[i].id);
                        io.to(pupilSocket).emit('startMission', `${URL}/game/PaintCanvas.html?userId=${element[i].id}&userName=${element[i].name}&groupId=${key}`);
                    }
                    let groupIdJSON = {};
                    groupIdJSON.groupId = key;
                    groupIdJSON.group = groups[key];
                    axios.post(`${URL}/game/StartMissionByGroupId`, groupIdJSON)
                        .then(() => {
                            console.log(`Server Game Started to ${groupIdJSON.groupId}`);
                        })
                        .catch(err => {
                            console.error(err.message);
                        })
                }
            }

        });

        client.on('joinGroupTeacher',(id)=> {
            let group = `'group${id}'`;
            client.join(group);
            client.emit('gameControlPage',`${URL}/game/PaintCanvas.html?isTeacher=true&groupId=${id}`);
        }
    )
        client.on('addPupilToGroup', (pupilDetails) => {
            switchSocketId(pupilDetails.id, client.id);
            client.join(pupilDetails.groupId);
        })

        client.on('sendBoard', (canvasImg) => {
            io.to('group1').emit('updateBoard', canvasImg);
        })

        client.on('askColor', (requestDetails) => {
            const pupilSocket = isPupilConnected(requestDetails.idPupilGive);
            io.to(pupilSocket).emit('showAskColor',requestDetails);
        })
        client.on('moveColor',(moveDetails)=>{
            let groupToEmit= moveDetails.groupId;
           let colorMoveDetails={};
            colorMoveDetails.moveDetails=moveDetails;
            axios.post(`${URL}/game/moveColor`, colorMoveDetails)
                .then((playersColorUpdate) => {
                    io.to(groupToEmit).emit('updateColors',playersColorUpdate.data);
                })
                .catch(err => {
                    console.error(err.message);
                })


        })
    }
);





