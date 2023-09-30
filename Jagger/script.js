// Display confidence and class from results
function displayResults(data) {
  const resultsDiv = document.getElementById("resultsSection");
  resultsDiv.style.display = "block"; // Make it visible

  // Clear any previous results
  while (resultsDiv.firstChild && resultsDiv.childNodes.length > 1) {
    resultsDiv.removeChild(resultsDiv.lastChild);
  }

  data.predictions.forEach((prediction) => {
    const item = document.createElement("p");
    item.innerHTML = `Class: ${prediction.class}, 
    Confidence: ${prediction.confidence.toFixed(2)}`;
    resultsDiv.appendChild(item);
  });
}

// Display the selected image in the preview section
document.getElementById("imageUpload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    document.getElementById("preview").src = reader.result;
    document.getElementById("preview").style.display = "block";
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    document.getElementById("preview").src = "";
  }
});

// Update the label when a file is selected (Bootstrap custom file input behavior)
document.getElementById("imageUpload").addEventListener("change", function () {
  let fileName = "";
  if (this.files && this.files.length > 1) {
    fileName = (this.getAttribute("data-multiple-caption") || "").replace(
      "{count}",
      this.files.length
    );
  } else {
    fileName = this.value.split("\\").pop();
  }

  if (fileName) {
    document.querySelector(".custom-file-label").textContent = fileName;
  }
});

document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const file = document.getElementById("imageUpload").files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    const imageBase64 = reader.result.split(",")[1]; // Extract only base64 content

    // Send the image to your server for processing
    fetch("/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageBase64 }),
    })
      .then((response) => response.json())
      .then((data) => {
        displayResults(data); // This will have the inference data from Roboflow
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});
