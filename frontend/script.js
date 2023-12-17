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

// Call the function when uploading an image and send an image to the server using binary transmission
let imageUrl;  // Variable to store the Data URL of the image

function uploadImage() {
    const fileInput = document.getElementById('imgUpload');
    const uploadedImage = document.getElementById('uploadedImage');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = async (e) => {
            imageUrl = e.target.result;  // Store the Data URL in imageUrl
            uploadedImage.src = imageUrl;
            await sendImgToServer(file);
            uploadedImage.src = imageUrl;  // Set the src attribute to imageUrl after the fetch request
        };

        reader.readAsDataURL(file);
    }
}

async function sendImgToServer(file) {
    const formData = new FormData();
    formData.append('file', file, file.name);

    try {
        const response = await fetch('http://localhost:8000/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Response from the backend:', data);
        } else {
            console.error('Error uploading image:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

