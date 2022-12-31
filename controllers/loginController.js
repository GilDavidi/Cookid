const User = require('../mongoDB/models/users');
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
                    res.send("The user exist");
                } else {
                    res.send("The user does not exist, try again");
                }
            })
            .catch(err => console.log(err));
    }
}
