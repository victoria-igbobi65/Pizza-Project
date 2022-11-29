const mongoose = require('mongoose')
const config = require('../config/config')

exports.connectToDatabase = () =>{
    mongoose.connect(config.mongoUrl);

    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB Successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.log("An error occurred while connecting to MongoDB");
      console.log(err);
    });
}