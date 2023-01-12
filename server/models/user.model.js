const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

// define model
const User = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    passowrd: {type: String, required: true},
}, 
{ collation: 'user-data'}
)

const model = mongoose.model('USERDATA', User)

module.exports = model;
