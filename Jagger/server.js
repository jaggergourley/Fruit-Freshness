// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const fs = require("fs");

// Initialize the express application
const app = express();

// Middleware to parse JSON bodies from incoming requests
app.use(bodyParser.json());

// Middleware to serve static files (HTML, CSS, JS) from the current directory
app.use(express.static(__dirname));

// Route to handle the "/upload" POST request
app.post("/upload", async (req, res) => {
  // Extract the base64 encoded image from the request body
  const imageBase64 = req.body.image;

  try {
    // Send a POST request to Roboflow's API for image analysis
    const response = await axios({
      method: "POST",
      url: "https://detect.roboflow.com/fruits-detection-and-quality-analysis/3",
      params: {
        // Authentication API key for Roboflow
        api_key: "7Crms73nuS9v4MrfE7bX", // Note: This should ideally not be hardcoded, especially in a public-facing application, for security reasons
      },
      data: imageBase64, // The base64 encoded image
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Send back the response received from Roboflow to the client
    res.json(response.data);
  } catch (error) {
    // If there's an error, send a 500 Internal Server Error status with the error message
    res.status(500).json({ error: error.message });
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
