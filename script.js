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
let clockwise = true; // Flag to track rotation direction

// Define the cloud parameters
const cloudRadius = 30;
const cloudSpeed = 0.2;
let cloudX1 = -cloudRadius; // Initial x-coordinate for the cloud
let cloudX2 = -cloudRadius - 100; // Initial x-coordinate for the second cloud
let cloudX3 = -cloudRadius + 200; // Initial x-coordinate for the third cloud
let cloudX4 = -cloudRadius + 400; // Initial x-coordinate for the fourth cloud
let cloudX5 = -cloudRadius + 600; // Initial x-coordinate for the fifth cloud

// Day and Night Mode
let isDay = true;

// Define bird parameters
const birdSpeed = 1; // Horizontal speed of birds
let bird1X = -50; // Initial x-coordinate for bird 1
let bird2X = -100; // Initial x-coordinate for bird 2
let bird3X = -150; // Initial x-coordinate for bird 3
let bird4X = -200; // Initial x-coordinate for bird 4
let bird5X = -250; // Initial x-coordinate for bird 5
let bird6X = -300; // Initial x-coordinate for bird 6

function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background
    drawBackground();

    // Draw the clouds
    drawCloud(cloudX1, canvas.height / 4);
    drawCloud(cloudX2, canvas.height / 5);
    drawCloud(cloudX3, canvas.height / 6);
    drawCloud(cloudX4, canvas.height / 3);
    drawCloud(cloudX5, canvas.height / 7);

    // Draw the left windmill
    drawWindmill(windmillX - 200, windmillY, angle, clockwise);

    // Draw the middle windmill
    drawWindmill(windmillX, windmillY, angle, clockwise);

    // Draw the right windmill
    drawWindmill(windmillX + 200, windmillY, angle, clockwise);

    // Update cloud position
    cloudX1 += cloudSpeed;
    cloudX2 += cloudSpeed;
    cloudX3 += cloudSpeed;
    cloudX4 += cloudSpeed;
    cloudX5 += cloudSpeed;
    if (cloudX1 > canvas.width + cloudRadius) {
        cloudX1 = -cloudRadius;
    }
    if (cloudX2 > canvas.width + cloudRadius) {
        cloudX2 = -cloudRadius;
    }
    if (cloudX3 > canvas.width + cloudRadius) {
        cloudX3 = -cloudRadius;
    }
    if (cloudX4 > canvas.width + cloudRadius) {
        cloudX4 = -cloudRadius;
    }
    if (cloudX5 > canvas.width + cloudRadius) {
        cloudX5 = -cloudRadius;
    }

    // Update bird position
    if (isDay) {
        bird1X += birdSpeed;
        bird2X += birdSpeed;
        bird3X += birdSpeed;
        bird4X += birdSpeed;
        bird5X += birdSpeed;
        bird6X += birdSpeed;
    }

    // Draw birds
    if (isDay) {
        drawBird(bird1X, canvas.height * 0.1);
        drawBird(bird2X, canvas.height * 0.15);
        drawBird(bird3X, canvas.height * 0.1);
        drawBird(bird4X, canvas.height * 0.15);
        drawBird(bird5X, canvas.height * 0.1);
        drawBird(bird6X, canvas.height * 0.15);
    }

    // Increment the angle for the next frame based on blade speed and direction
    angle += (clockwise ? 1 : -1) * bladeSpeed;

    // Request the next frame
    requestAnimationFrame(animate);
}

// Function to draw the background
function drawBackground() {
    if (isDay) {
        // Day Background
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
    } else {
        // Night Background
        // Sky
        var skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height / 2);
        skyGradient.addColorStop(0, '#000033'); // Dark blue
        skyGradient.addColorStop(1, '#000000'); // Black
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

        // Moon
        ctx.beginPath();
        ctx.arc(canvas.width * 0.8, canvas.height * 0.2, 60, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFE0'; // Light Yellow
        ctx.fill();

        // Stars
        for (let i = 0; i < 50; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * (canvas.height / 2);
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF'; // White
            ctx.fill();
        }
    }

    // Ground
    var groundGradient = ctx.createLinearGradient(0, canvas.height / 2, 0, canvas.height);
    if (isDay) {
        groundGradient.addColorStop(0, '#228B22'); // Dark green
        groundGradient.addColorStop(1, '#2E8B57'); // Green
    } else {
        groundGradient.addColorStop(0, '#013220'); // Dark gray
        groundGradient.addColorStop(1, '#013208'); // Dark gray
    }
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

    // Mountains
    drawMountain(canvas.width * 0.05, canvas.height * 0.5, 0.95, '#554124'); // Olive Drab
    drawMountain(canvas.width * 0.25, canvas.height * 0.5, 0.9, '#554124'); // Olive Drab
    drawMountain(canvas.width * 0.45, canvas.height * 0.5, 1.0, '#554124'); // Olive Drab
    drawMountain(canvas.width * 0.65, canvas.height * 0.5, 0.9, '#554124'); // Olive Drab
    drawMountain(canvas.width * 0.85, canvas.height * 0.5, 0.8, '#554124'); // Olive Drab

    // Trees
    drawTree(canvas.width * 0.1, canvas.height * 0.6, 40, 80);
    drawTree(canvas.width * 0.3, canvas.height * 0.65, 30, 60);
    drawTree(canvas.width * 0.9, canvas.height * 0.55, 50, 100);
}

// Function to draw a mountain
function drawMountain(x, y, scale, color) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + canvas.width * 0.1 * scale, canvas.height * 0.4);
    ctx.lineTo(x + canvas.width * 0.2 * scale, y);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
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

// Function to draw the windmill
function drawWindmill(x, y, angle, clockwise) {
    // Draw the windmill body
    ctx.beginPath();
    ctx.moveTo(x - windmillWidth / 2, y - windmillHeight / 2);
    ctx.lineTo(x + windmillWidth / 2, y - windmillHeight / 2);
    ctx.lineTo(x + windmillWidth / 2, y + windmillHeight / 2);
    ctx.lineTo(x - windmillWidth / 2, y + windmillHeight / 2);
    ctx.closePath();
    ctx.fillStyle = '#000000';
    ctx.fill();

    // Draw the pivot point
    ctx.beginPath();
    ctx.arc(x, y - windmillHeight / 2, pivotSize, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFF00';
    ctx.fill();

    // Draw the blades
    ctx.save();
    ctx.translate(x, y - windmillHeight / 2);
    ctx.rotate(angle * (clockwise ? 1 : -1)); // Reverse rotation if not clockwise
    drawBlade(bladeLength, bladeWidth, '#FF0000'); // Red color
    ctx.rotate((2 * Math.PI) / 3);
    drawBlade(bladeLength, bladeWidth, '#FF0000'); // Red color
    ctx.rotate((2 * Math.PI) / 3);
    drawBlade(bladeLength, bladeWidth, '#FF0000'); // Red color
    ctx.restore();
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

// Toggle Day/Night Mode
canvas.addEventListener('click', function (event) {
    if (
        event.clientX >= canvas.width * 0.8 - 80 &&
        event.clientX <= canvas.width * 0.8 + 80 &&
        event.clientY >= canvas.height * 0.2 - 80 &&
        event.clientY <= canvas.height * 0.2 + 80
    ) {
        isDay = !isDay;
    } else {
        // Toggle rotation direction when clicking on the windmill blade
        clockwise = !clockwise;
    }
});

// Start the animation loop
animate();