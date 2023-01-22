const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    user_name: {type: String, required: true},
    password: String,
    id: String,
    type: String,
    score: Number,
}, {collection: 'Users'});

const User = model('User', userSchema);

module.exports = User;

