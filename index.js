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


// create server
 serverExpress = app.listen(3001, () => {
    console.log("server its listening on port 3001");});


const io = socket(serverExpress);
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
io.on('connection',(client) =>
    {
        connection++;
        client.on('disconnect', ()=> {
            connection--;
        });

        client.on('pupilConnected',(pupilDetails)=>
        {

            let result= isPupilConnected(pupilDetails.id);
            if(result!=false)
            {
                io.sockets.sockets.forEach((socketPupil) => {
                    // If given socket id is exist in list of all sockets, kill it
                    if(socketPupil.id == result) {
                        io.to(socketPupil.id).emit('close');
                    }
                });

            }
            pupilSockets.pupils.push({id:pupilDetails.id,socketId:client.id});

            client.join("waiting_room");
            let pupilJSONDetails={};
            pupilJSONDetails.id=pupilDetails.id;
            pupilJSONDetails.name=pupilDetails.name;

            axios.post('http://localhost:3001/groups/addPupil', pupilJSONDetails)
                .then( (pupilListResponse)=> {
                    if(teacherSocketId )
                    {
                        io.to(teacherSocketId).emit('updatePupilList',pupilListResponse.data);
                    }
                    console.log(`Pupil with id ${pupilDetails.id}  and  connected`);

                })
                .catch(err => {
                    console.error(err.message);
                })


        })

        client.on('teacherConnected',() =>{
            teacherSocketId=client.id;
            console.log("The Teacher connected")});
    }

);





