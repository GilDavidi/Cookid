const express = require('express');
const fileLoaderRouter =require('./routers/fileLoaderRouter');
const gameRouter =require('./routers/gameRouter');
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
app.listen(3000, () => {console.log("server its listening on port 3000")});
