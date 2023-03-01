const mongoose = require("mongoose");

// url for connect database
const mongoURI =
  "mongodb+srv://rajan:rajan@cluster0.lymgoaf.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo Successfully");
  });
};

module.exports = connectToMongo;
