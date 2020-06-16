const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'A username is required'],
        minlength: 4,
        unique: true
    },
    hash: {
        type: String,
        required: [true, 'Can\'t save a user without a hash']
    },
    firstname: {
        type: String,
        required: [true, 'No users without names'],
        minlength: 2
    }
})

module.exports = mongoose.model('User', userSchema);