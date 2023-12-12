// script.js

// Function to simulate random walk and draw points on the canvas
function randomWalk() {
    // Get the canvas element and its context
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    // Calculate the canvas size to maintain a 16:9 aspect ratio
    var containerWidth = canvas.parentElement.offsetWidth;
    var canvasWidth = containerWidth; // 80% of the container width
    var canvasHeight = (canvasWidth * 1) / 2; // Maintain aspect ratio

    // Set the canvas size
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Starting position
    var x = canvas.width / 2;
    var y = canvas.height / 2;

    var xx = x;
    var yy = y;

    var walk = 50000;

    // Simulate random walk
    for (var i = 0; i < walk; i++) {
        var r = Math.random() * 360;
        xx += Math.cos((r * Math.PI) / 180);
        yy += Math.sin((r * Math.PI) / 180);

        // Draw a point
        ctx.beginPath();
        ctx.arc(xx, yy, 1, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }
}

// Call the function when upload image and send a image to server using banary tranmission
function uploadImage() {
    const fileInput = document.getElementById('imgUpload');
    const uploadedImage = document.getElementById('uploadedImage');

    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedImage.src = e.target.result;
        };
        reader.readAsDataURL(file);

        sendImg_toServer(file);
    } else {
        console.error('No file selected');
    }
}
function sendImg_toServer(file) {
    // Create a new FormData object to handle the file data
    const formData = new FormData();
    // Instead of appending the base64 string, append the raw file data
    formData.append('file', file, file.name);
    // Perform a fetch request to the backend endpoint (replace with your actual backend URL)
    fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            // Log the response from the backend
            console.log('Response from backend:', data);
        })
        .catch(error => {
            // Log an error message
            console.error('Error uploading image:', error);
        });
}