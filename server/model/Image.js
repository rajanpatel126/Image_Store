const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const imgSchema = new Schema({
  myFile: String,
});
const Img = mongoose.model("img", imgSchema);
module.exports = Img;
 