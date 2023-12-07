// script.js

// Function to be called when the "Random" button is clicked
function randomPic() {
    // Get the canvas element and its context
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
  
    // Calculate the canvas size to maintain a 4:3 aspect ratio
    var containerWidth = canvas.parentElement.offsetWidth;
    var canvasWidth = containerWidth * 0.9; // 90% of the container width
    var canvasHeight = (canvasWidth * 9) / 16; // Maintain a 4:3 aspect ratio
  
    // Set the canvas size
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Generate random coordinates for the black dot within the canvas
    var randomX = Math.floor(Math.random() * canvas.width);
    var randomY = Math.floor(Math.random() * canvas.height);
  
    // Set the fill color to black
    ctx.fillStyle = "black";
  
    // Draw a black dot at the random coordinates
    ctx.beginPath();
    ctx.arc(randomX, randomY, 3, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  // Make sure to call the randomPic function when the page is loaded
  document.addEventListener("DOMContentLoaded", function () {
    randomPic();
  });
  
  // Update the canvas size on window resize
  window.addEventListener("resize", function () {
    randomPic();
  });
  