// script.js

// Function to simulate random walk and draw points on the canvas
function randomWalk() {
    // Get the canvas element and its context
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    // Calculate the canvas size to maintain a 16:9 aspect ratio
    var containerWidth = canvas.parentElement.offsetWidth;
    var canvasWidth = containerWidth * 0.8; // 80% of the container width
    var canvasHeight = (canvasWidth * 9) / 16; // Maintain a 16:9 aspect ratio

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
        ctx.arc(xx, yy, 2, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }
}
