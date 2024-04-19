// Define the canvas element
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// Set the canvas dimensions to the full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the windmill dimensions and coordinates
const windmillWidth = 15; // Reduced width
const windmillHeight = 150; // Length kept same
const windmillX = canvas.width * 0.5;
const windmillY = canvas.height * 0.6; // Shifted up

// Define the blade dimensions and coordinates
const bladeLength = 100;
const bladeWidth = 17;
const bladeX = windmillX - bladeLength / 2;
const bladeY = windmillY - windmillHeight / 2;

// Define the pivot point dimensions
const pivotSize = 5; // Size of the pivot point

// Define the animation loop
let angle = 0;
let bladeSpeed = 0.01; // Initial speed

// Define the cloud parameters
const cloudRadius = 30;
const cloudSpeed = 0.2;
let cloudX = -cloudRadius; // Initial x-coordinate for the cloud

function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background
    drawBackground();

    // Draw the clouds
    drawCloud(cloudX, canvas.height / 4);
    drawCloud(cloudX + canvas.width / 3, canvas.height / 5);
    drawCloud(cloudX - canvas.width / 4, canvas.height / 6);

    // Draw the left windmill
    drawWindmill(windmillX - 200, windmillY);

    // Draw the middle windmill
    drawWindmill(windmillX, windmillY);

    // Draw the right windmill
    drawWindmill(windmillX + 200, windmillY);

    // Update cloud position
    cloudX += cloudSpeed;
    if (cloudX > canvas.width + cloudRadius) {
        cloudX = -cloudRadius;
    }

    // Increment the angle for the next frame based on blade speed
    angle += bladeSpeed;

    // Request the next frame
    requestAnimationFrame(animate);
}

// Function to draw the background
function drawBackground() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);

    // Fill the top half with light blue (sky)
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

    // Fill the bottom half with green (ground)
    ctx.fillStyle = 'rgb(79, 176, 79)';
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
}

// Function to draw a windmill
function drawWindmill(x, y) {
    // Draw the windmill body
    drawWindmillBody(x, y);

    // Draw the windmill blades
    ctx.save();
    ctx.translate(x, y - windmillHeight / 2);
    ctx.rotate(angle);
    drawBlade(bladeLength, bladeWidth, '#FF0000'); // Red color
    ctx.rotate((2 * Math.PI) / 3); // Rotate 120 degrees for the second blade
    drawBlade(bladeLength, bladeWidth, '#FF0000'); // Red color
    ctx.rotate((2 * Math.PI) / 3); // Rotate another 120 degrees for the third blade
    drawBlade(bladeLength, bladeWidth, '#FF0000'); // Red color
    ctx.restore();

    // Draw the pivot point
    drawPivot(x, y);
}

// Function to draw the windmill body
function drawWindmillBody(x, y) {
    ctx.beginPath();
    ctx.moveTo(x - windmillWidth / 2, y - windmillHeight / 2);
    ctx.lineTo(x + windmillWidth / 2, y - windmillHeight / 2);
    ctx.lineTo(x + windmillWidth / 2, y + windmillHeight / 2);
    ctx.lineTo(x - windmillWidth / 2, y + windmillHeight / 2);
    ctx.closePath();
    ctx.fillStyle = '#000000';
    ctx.fill();
}

// Function to draw the pivot point
function drawPivot(x, y) {
    ctx.beginPath();
    ctx.arc(x, y - windmillHeight / 2, pivotSize, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFF00';
    ctx.fill();
}

// Function to draw a blade
function drawBlade(length, width, color) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length / 2, -width / 2);
    ctx.lineTo(length, 0);
    ctx.lineTo(length / 2, width / 2);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

// Function to draw a cloud
function drawCloud(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, cloudRadius, 0, Math.PI * 2);
    ctx.arc(x + cloudRadius * 0.7, y - cloudRadius * 0.5, cloudRadius * 0.9, 0, Math.PI * 2);
    ctx.arc(x + cloudRadius * 1.7, y - cloudRadius * 0.3, cloudRadius * 0.7, 0, Math.PI * 2);
    ctx.arc(x + cloudRadius * 2.5, y, cloudRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
}

// Function to handle click events on the canvas
canvas.addEventListener('click', function (event) {
    // Check if the click is within the windmill blades' area
    if (
        event.clientX >= windmillX - bladeLength / 2 &&
        event.clientX <= windmillX + bladeLength / 2 &&
        event.clientY >= windmillY - windmillHeight / 2 &&
        event.clientY <= windmillY + windmillHeight / 2
    ) {
        // Invert the blade speed to change direction
        bladeSpeed *= -1;
    }
});

// Start the animation loop
animate();
// Function to draw the background
function drawBackground() {
  // Sky gradient
  var skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height / 2);
  skyGradient.addColorStop(0, '#87CEEB'); // Light blue
  skyGradient.addColorStop(1, '#4682B4'); // Dark blue
  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

  // Sun
  ctx.beginPath();
  ctx.arc(canvas.width * 0.8, canvas.height * 0.2, 80, 0, Math.PI * 2);
  ctx.fillStyle = '#FFD700'; // Yellow
  ctx.fill();

  // Ground
  var groundGradient = ctx.createLinearGradient(0, canvas.height / 2, 0, canvas.height);
  groundGradient.addColorStop(0, '#228B22'); // Dark green
  groundGradient.addColorStop(1, '#2E8B57'); // Green
  ctx.fillStyle = groundGradient;
  ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

  // Hills
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.bezierCurveTo(canvas.width * 0.2, canvas.height * 0.3, canvas.width * 0.4, canvas.height * 0.1, canvas.width * 0.6, canvas.height / 2);
  ctx.bezierCurveTo(canvas.width * 0.8, canvas.height * 0.7, canvas.width, canvas.height * 0.5, canvas.width, canvas.height / 2);
  ctx.fillStyle = '#556B2F'; // Olive Drab
  ctx.fill();

  // Trees
  drawTree(canvas.width * 0.1, canvas.height * 0.6, 40, 80);
  drawTree(canvas.width * 0.3, canvas.height * 0.65, 30, 60);
  drawTree(canvas.width * 0.9, canvas.height * 0.55, 50, 100);

  // Birds
  drawBird(canvas.width * 0.4, canvas.height * 0.1);
  drawBird(canvas.width * 0.5, canvas.height * 0.15);
  drawBird(canvas.width * 0.6, canvas.height * 0.1);
}

// Function to draw a tree
function drawTree(x, y, trunkWidth, trunkHeight) {
  // Trunk
  ctx.fillStyle = '#8B4513'; // Saddle Brown
  ctx.fillRect(x - trunkWidth / 2, y - trunkHeight, trunkWidth, trunkHeight);

  // Leaves
  ctx.beginPath();
  ctx.moveTo(x, y - trunkHeight - trunkHeight / 2);
  ctx.lineTo(x + trunkWidth * 2, y - trunkHeight);
  ctx.lineTo(x - trunkWidth * 2, y - trunkHeight);
  ctx.closePath();
  ctx.fillStyle = '#006400'; // Dark Green
  ctx.fill();
}

// Function to draw a bird
function drawBird(x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 20, y - 10);
  ctx.lineTo(x + 40, y);
  ctx.lineTo(x + 20, y + 10);
  ctx.closePath();
  ctx.fillStyle = '#000000'; // Black
  ctx.fill();
}