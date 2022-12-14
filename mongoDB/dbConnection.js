const mongoose = require('mongoose');
const consts = require('./constants');

const {DB_HOST, DB_USER, DB_PASS} = consts;
const url = DB_HOST;


mongoose.set('strictQuery', false);


const options = {
    useNewUrlParser: true,    // For deprecation warnings
    useUnifiedTopology: true, // For deprecation warnings
    user: DB_USER,
    pass: DB_PASS
};


exports.connectToDB = () => {
    mongoose
        .connect(url, options)
        .then(() => {
            console.log('connected to Cookid-DB')
        })
        .catch(err => console.log(`connection error: ${err}`));
}
