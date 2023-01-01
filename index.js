require("dotenv").config({path: 'config/.env'});
//data base
const db = require('./mongoDB/dbConnection');
const express = require('express');
const fileLoaderRouter =require('./routers/fileLoaderRouter');
const gameRouter =require('./routers/gameRouter');
const loginRouter =require('./routers/loginRouter')
const socket = require('socket.io');
const app = express();

db.connectToDB();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

const cors = require('cors');
const path = require("path");
const server = require("express/lib/application");
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

// create server
 serverExpress = app.listen(3001, () => {
    console.log("server its listening on port 3001");});


const io = socket(serverExpress);
// Runs when client connect to our sever
let connection=0;

io.on('connection',(client) =>
    {
        console.log("New player enter to the game");
        connection++;
        client.on('disconnect', function() {
            connection--;
        });
        console.log("Number of connected players " +connection);
    }

);



