const User = require('../mongoDB/models/users');
const {default: axios} = require("axios");
const loggedUsers = {};
module.exports = {
    checkUserTeacher: (req, res) => {
        User.findOne({'user_name': req.body.userName, 'password': req.body.password})
        .then(result => {
                if (result) {
                    res.send("The user exist");
                } else {
                    res.send("The user does not exist, try again");
                }
            })
                .catch(err => console.log(err));
    },
    checkUserPupil: (req, res) => {

        User.findOne({'user_name': req.body.userName})
            .then(result => {
                if (result) {
                    let pupilJson={};
                    pupilJson.id=result.id;
                    pupilJson.name=result.user_name;
                    res.send(pupilJson);
                } else {
                    res.send("The user does not exist, try again");
                }
            })
            .catch(err => console.log(err));
    }
}
