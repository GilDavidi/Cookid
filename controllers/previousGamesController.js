const path = require("path");
const Games = require("../mongoDB/models/Previous_Games");
module.exports = {
    loadPreviousGames: (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/game/previousGames.html'));
    },
    getAllPreviousGames: (req, res) => {
        Games.find({})
            .then(result => {
                if (result) {
                    res.send(result);
                } else {
                    res.send("No previous games exists");
                }
            })
            .catch(err => console.log(err));
    },
    // getPupilsScore: (req, res) => {
    //     let scores = {};
    //     // Find all documents in the "Previous_Games" collection
    //     Games.find({}).toArray((err, games) => {
    //         if (err) throw err;
    //         // For each game document, extract the scores for each pupil
    //         games.forEach(game => {
    //             let players_scores = game.players_scores;
    //             let scores = players_scores.split(', ');
    //             scores.forEach(score => {
    //                 let name = score.split(':')[0];
    //                 let point = score.split(':')[1];
    //                 // If this is the first score for this pupil, create an object for them
    //                 if (!scores[name]) {
    //                     scores[name] = {};
    //                 }
    //                 ;
    //                 // Add the date and score to the pupil's object
    //                 scores[name][game.date] = point;
    //             });
    //         });
    //     });
    //
    //     res.json(scores);
    // }
}
