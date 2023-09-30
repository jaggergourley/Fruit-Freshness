const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post("/upload", async (req, res) => {
  const imageBase64 = req.body.image;

  try {
    const response = await axios({
      method: "POST",
      url: "https://detect.roboflow.com/fruits-detection-and-quality-analysis/3",
      params: {
        api_key: "7Crms73nuS9v4MrfE7bX",
      },
      data: imageBase64,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
