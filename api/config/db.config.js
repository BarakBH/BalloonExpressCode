const mongoose = require("mongoose");
function initdb(){
    if(mongoose.connection.readyState){
        return console.log("Already connected")
    }
    mongoose.connect(process.env.MONGODB_URI)
    mongoose.connection.on('connected',() => {
        console.log("Connected to database")
    })
    mongoose.connection.on('error',(err) => {
        console.log("Error connecting to database:",err)
    })
}

module.exports = initdb;