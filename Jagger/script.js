// Function to display analysis results on the webpage
function displayResults(data) {
  // Get the div that will display the results
  const resultsDiv = document.getElementById("resultsSection");
  resultsDiv.style.display = "block"; // Show the results div

  // Clear out any old results (keeping the header)
  while (resultsDiv.firstChild && resultsDiv.childNodes.length > 1) {
    resultsDiv.removeChild(resultsDiv.lastChild);
  }

  // Loop through each prediction and append to the results div
  data.predictions.forEach((prediction) => {
    const item = document.createElement("p");
    item.innerHTML = `Class: ${prediction.class}, 
      Confidence: ${prediction.confidence.toFixed(2)}`; // Format confidence to two decimal places
    resultsDiv.appendChild(item);
  });
}

// Event listener to show the selected image in the preview section
document.getElementById("imageUpload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    // Display the preview of uploaded image
    document.getElementById("preview").src = reader.result;
    document.getElementById("preview").style.display = "block";
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    document.getElementById("preview").src = "";
  }
});

// Event listener to update the file input label when a file is chosen
document.getElementById("imageUpload").addEventListener("change", function () {
  let fileName = "";
  if (this.files && this.files.length > 1) {
    // If multiple files are allowed and selected, show the number of files
    fileName = (this.getAttribute("data-multiple-caption") || "").replace(
      "{count}",
      this.files.length
    );
  } else {
    // Get the last segment of the filepath (i.e., the actual file name)
    fileName = this.value.split("\\").pop();
  }

  // Update the custom Bootstrap file input label with the chosen filename
  if (fileName) {
    document.querySelector(".custom-file-label").textContent = fileName;
  }
});

// Event listener to handle form submission (i.e., when the "Upload" button is pressed)
document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the form from doing a default form submission

  const file = document.getElementById("imageUpload").files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    // Extract the base64 representation of the image (without the MIME type prefix)
    const imageBase64 = reader.result.split(",")[1];

    // Send the base64-encoded image to the server for analysis
    fetch("/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageBase64 }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Process and display the response data (assumed to come from Roboflow)
        displayResults(data);
      })
      .catch((error) => {
        // Log any errors to the console
        console.error("Error:", error);
      });
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});
