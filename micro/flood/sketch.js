// Press 'f' to turn flash on/off
// Press 'UP' and 'DOWN' arrows to manually move flood up and down

// FLASH SETTINGS
const FPS = 60;
let flash_mult = 1;
const FLASH_INTERVAL = FPS * flash_mult; // Will flash every 10s
const FLASH_HOLD = FPS * flash_mult; // For 1/2 a second
const FLASH_BG = 0;

// Press 'f' to turn flash on/off
let flash = false;

// FLOAT SETTINGS
const DURATION = FPS * 60 * 10; // 10 minutes
let rate; // How fast flood advances
let h = 0; // Shoreline

function setup() {
  createCanvas(windowWidth, windowHeight);
  rate = height / DURATION;
  noStroke();
  noCursor();
}

function draw() {
  background(0)
  fill(255);

  if (flash) {
    let f = frameCount % floor(FLASH_INTERVAL * flash_mult);
    if (f > 0 && f < FLASH_HOLD) fill(FLASH_BG);
  }

  rect(0, 0, width, h);
  h += rate;

}

function mousePressed() {
  h = mouseY;
}

function keyPressed() {
  switch (key) {
    case 'f':
      flash = !flash;
      if (flash) {
        flash_mult *= 0.9;
        flash_mult = max(flash_mult, 0.1);
      }
      console.log('flash on?', flash);
  }

  switch (keyCode) {
    case UP_ARROW:
      rate--;
      break;
    case DOWN_ARROW:
      rate++;
      break;
    case RIGHT_ARROW:
      rate += 0.1;
      break;
    case LEFT_ARROW:
      rate -= 0.1;
      break;
  }

  // Constrain rate
  rate = constrain(rate, -5, 5);
}



