let player = require('models/Player.js');
let Point = require('models/Point.js');
const express = require('express');

let IsServerStart = false;

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

const cors = require('cors');
const fileLoaderRouter = require("../routers/fileLoaderRouter");
const GameRouter = require("Routers/GameRouter");
app.use(cors());

//create server

app.use('/',(req,res) => {
    app.listen(5000, () => {console.log("Game server its listening on port 5000")});
});

