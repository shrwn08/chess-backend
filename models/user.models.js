const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    rating : {
        type : Number,
        default : 1200,
    },
    savedGame : {
        type : String,
        default : '',
    },
    timeEnabled: {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('User', userSchema);