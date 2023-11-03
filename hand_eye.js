const canvas = document.getElementById("container");
const ctx = canvas.getContext("2d");

const centerX_large = canvas.width / 2;
const centerY_large = canvas.height / 3;
const radius_large = 200;
let radius_small = 50; // Initial radius for the small circle
let angle = -Math.PI / 2;
let isMoving = false;

let smallCircleColor = 'black';

let isMouseOver = false;
let hoverStartTime = 0; 
let totalHoverDuration = 0;
let hoverDurations = []; // Array to store hover durations for each trial

let currentTrial = 0;
const maxTrials = 5;
let currentAngleIncrement = Math.PI / 180; // Initial angle increment

function isMouseOverSmallCircle(mouseX, mouseY) {
  const smallCircleX = centerX_large + radius_large * Math.cos(angle);
  const smallCircleY = centerY_large + radius_large * Math.sin(angle);

  const dx = mouseX - smallCircleX;
  const dy = mouseY - smallCircleY;
  return Math.sqrt(dx * dx + dy * dy) < radius_small;
}

canvas.addEventListener('mousemove', function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (isMouseOverSmallCircle(mouseX, mouseY)) {
      if (!isMouseOver) {
        isMouseOver = true;
        hoverStartTime = Date.now(); // Update start time when mouse enters the circle
      }
      smallCircleColor = 'red'; 
    } else {
      if (isMouseOver) {
        totalHoverDuration += Date.now() - hoverStartTime; // Update duration when mouse leaves the circle
        isMouseOver = false;
      }
      smallCircleColor = 'black';
    }
  
    if (!isMoving) {
      drawCircles();
    }
});

function drawCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the large circle
  ctx.beginPath();
  ctx.arc(centerX_large, centerY_large, radius_large, 0, 2 * Math.PI);
  ctx.stroke();

  // Draw the small circle
  const smallCircleX = centerX_large + radius_large * Math.cos(angle);
  const smallCircleY = centerY_large + radius_large * Math.sin(angle);
  ctx.beginPath();
  ctx.arc(smallCircleX, smallCircleY, radius_small, 0, 2 * Math.PI);
  ctx.fillStyle = smallCircleColor;
  ctx.fill();
  ctx.stroke();

  if (isMoving) {
    angle += currentAngleIncrement;
    if (angle >= 2 * Math.PI - Math.PI / 2) {
      if (isMouseOver) {
        totalHoverDuration += Date.now() - hoverStartTime; // Capture duration if mouse is still over circle
        isMouseOver = false; // Reset hover status
      }

      hoverDurations.push(totalHoverDuration); // Save the hover duration for the trial
      totalHoverDuration = 0; // Reset total hover duration for the next trial
      currentTrial++;
      angle = -Math.PI / 2; // Reset angle for the next trial

      if (currentTrial < maxTrials) {
        radius_small -= 5; // Decrease radius for the next trial
        currentAngleIncrement += Math.PI / 180 / 20; // Increase the movement speed for the next trial
      } else {
        isMoving = false; // Stop the movement after the last trial
        console.log("Trials complete. Hover durations (ms):", hoverDurations);
      }
    }
    requestAnimationFrame(drawCircles);
  }
}

// Initial draw
drawCircles();

canvas.addEventListener('click', function() {
  if (currentTrial < maxTrials) {
    isMoving = !isMoving;
    if (isMoving) {
      if (isMouseOver) {
        hoverStartTime = Date.now(); // Reset hover start time if the circle starts moving while mouse is over it
      }
      requestAnimationFrame(drawCircles);
    }
  }
});
