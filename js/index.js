// Sizing the Canvas //
const canvas = document.getElementById("canvas");

if (canvas.getContext) {
  var ctx = canvas.getContext("2d");
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Adding Mouse Object //
let mouse = {
  x: undefined,
  y: undefined
};

const xCenter = canvas.width * .5
const yCenter = canvas.height * .5
let sTenths = 0
const targetTimer = 8 // Tenths of a second
let hitMarker = true;
let hitMarkerCounter = 0;
const hitMarkerTimer = 5
const radius = 20
const collisionBorder = radius * 5

// Get Random Starting Positions //
function xRandPos() {
  return Math.random() * (canvas.width - radius * 2) + radius
}

function yRandPos() {
  return Math.random() * (canvas.height - collisionBorder * 2) + collisionBorder
}

// Adding Mouse Event Listener //
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Get Time in Seconds //
function incrementTime() {
  sTenths += 1
  hitMarkerCounter += 1
}

let cancel = setInterval(incrementTime, 100)

// Circle Object //
function Circle(x, y, xSpeed, ySpeed, radius) {
  this.x = x;
  this.y = y;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.radius = radius;
  const aoe = 20
  const maxDistance = radius + aoe;
  let colour = 'orange';
  let xPosition = 0;
  let yPosition = 0;

  // Event Click //
  canvas.addEventListener("click", getClickedPosition, false);

  let self = this

  function getClickedPosition(e) {
    xPosition = e.clientX
    yPosition = e.clientY

    if (
      xPosition - self.x < maxDistance &&
      xPosition - self.x > -maxDistance &&
      yPosition - self.y < maxDistance &&
      yPosition - self.y > -maxDistance
    ) {
      colour = 'red'
      hitMarket = false
    } else {
      hitMarker = true
      hitMarkerCounter = 0
    }
  }

  // Draws & Fills on Tick //
  this.draw = function () {
    ctx.beginPath();
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = "rgba(255, 0, 0, .5)"
    ctx.fillRect(xCenter, yCenter, 40, 40);
    if (hitMarker) {
      ctx.fillRect(xPosition, yPosition, 10, 10)
    }
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = colour;
    ctx.fill();
  };

  // Update on Tick //
  this.update = function () {

    // Random Chance to Change Direction //
    if (sTenths >= targetTimer) {
      sTenths = 0
      this.x = xRandPos()
      this.y = yRandPos()
      colour = 'orange'
    }

    // Handles Fading of Hit Marker //
    if (hitMarkerCounter > hitMarkerTimer) {
      hitMarker = false
    }

    this.draw();
  };
}

// Creates a Beautiful Target //
let circle = new Circle(xRandPos(), yRandPos(), 4, 4, radius);

function animate() {
  requestAnimationFrame(animate);
  circle.update();
}

animate();