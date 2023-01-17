const {Schema, model} = require('mongoose');

const gameSchema = new Schema({
    date: String,
    players_scores: String,
    group_id: String,
}, {collection: 'Previous_Games'});

const Game = model('Game', gameSchema);

module.exports = Game;