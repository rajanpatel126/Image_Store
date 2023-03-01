const express = require("express");
const app = express();
const cors = require("cors");
const connectToMongo = require("./db");
connectToMongo();
const Img = require("./model/Image");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  try {
    Img.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(409).json({ error });
      });
  } catch (error) {
    res.json({ error });
  }
});

app.post("/upload", async (req, res) => {
  const body = req.body;
  // console.log(body);
  try {
    const newImage = await Img.create(body);
    newImage.save();
    console.log(newImage);
    res.status(201).json({ msg: "Image Uploded" });
  } catch (err) {
    res.status(409).json({ msg: err.message });
    // console.error(message.err);
  }
});

app.get("/getImage", async (req, res) => {
  try {
    const newImage = await Img.findById("63ff31c2913ced4ef4301a31");
    // newImage.save();
    // console.log(newImage);
    res.status(201).json(newImage);
  } catch (err) {
    res.status(409).json({ msg: err.message });
    // console.error(message.err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
