const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true
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

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    try {
       const salt = await bcrypt.genSalt(10);
       this.password = await bcrypt.hash(this.password, salt);
       next(); 
    } catch (error) {
        next(error)
    }

});

userSchema.methods.comparePassword = async function (inputPassword){
    return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);