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
