import { useState, useEffect } from "react";
import "./App.css";
import avatar from "./assets/upload.png";

import axios from "axios";

const url = "http://localhost:5000/upload";

function App() {
  const [postImage, setPostImage] = useState({ myFile: "" });
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    handleImageUrl();
  }, []);

  const createPost = async (newImage) => {
    try {
      await axios.post(url, newImage);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageUrl = async () => {
    try {
      let { data } = await axios.get("http://localhost:5000/getImage");
      console.log(data);
      setImageUrl(data.myFile);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage);
    console.log("Uploaded");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setPostImage({ ...postImage, myFile: base64 });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="custom-file-upload">
          <img src={postImage.myFile || avatar} alt="" />
        </label>

        <input
          type="file"
          lable="Image"
          name="myFile"
          id="file-upload"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />

        <h3>Doris Wilder</h3>
        <span>Designer</span>

        <button type="submit">Submit</button>
      </form>
      <img src={imageUrl} height={"100px"} width={"100px"} />
    </div>
  );
}

export default App;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
