const express = require('express');
const fileLoaderRouter =require('./routers/fileLoaderRouter');
const gameRouter =require('./routers/gameRouter');
const socket = require('socket.io');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

const cors = require('cors');
app.use(cors());

//load files
app.use('/', fileLoaderRouter);
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/favicon.ico', express.static('./favicon.ico'));

//game
app.use('/game',gameRouter);

// create server
const server =app.listen(3001, () => {console.log("server its listening on port 3001")});

const io = socket(server);
// Runs when client connect to our sever
io.on('connection', socket => {
    console.log("New player enter to the game");

});

