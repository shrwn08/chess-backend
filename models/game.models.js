const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    whitePlayer : {type: mongoose.Schema.Types.ObjectId, ref : "User"},
    blackPlayer : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "User"
    },
    moves : [String],
    result : {
        type : String, default : 'ongoing'
    },
    createAt : {type : Date, default : Date.now}
})

module.exports = mongoose.model("Game", gameSchema);

