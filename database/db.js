const  mongoose  = require("mongoose")

const dbConnection = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);

        console.log("Mongo database connected successfully")
    } catch (error) {
        console.error("failed to connect Mongo Database")
    }
}

module.exports = dbConnection;
