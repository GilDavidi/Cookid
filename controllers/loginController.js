const User = require('../mongoDB/models/users');
const loggedUsers = {};
module.exports = {
    checkUserTeacher: (req, res) => {
        User.findOne({'user_name': req.body.userName, 'password': req.body.password})
        .then(result => {
                if (result) {
                    console.log(result.id);
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
                    console.log(result);
                    res.send(req.body.userName);
                } else {
                    res.send("The user does not exist, try again");
                }
            })
            .catch(err => console.log(err));
    }
}
