const mongoose = require("mongoose");
// const { MongoClient, ServerApiVersion } = require('mongodb');
function initdb(){
    //console.log(process.env.MONGODB_URI)
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





    // const uri = "mongodb+srv://BarakAdmin:VS1dZNzNq049u6M@articlesapi.j1pmeai.mongodb.net/?retryWrites=true&w=majority";
    // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    // client.connect(err => {
    //   const collection = client.db("articlesAPI").collection("balloonExpress");
    //   // perform actions on the collection object
    //   console.log(collection);
    //   client.close();
    // });
    

}

module.exports = initdb;