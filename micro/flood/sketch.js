// Press 'f' to turn flash on/off
// Press 'UP' and 'DOWN' arrows to manually move flood up and down

// FLASH SETTINGS
const FPS = 60;
const FLASH_INTERVAL = FPS * 10 // Will flash every 10s
const FLASH_HOLD = FPS * 0.5 // For 1/2 a second
const FLASH_BG = 128

// Press 'f' to turn flash on/off
let flash = false;

// FLOAT SETTINGS
const DURATION = FPS * 60 * 10; // 10 minutes
let rate; // How fast flood advances
let h = 0; // Shoreline

function setup() {
  createCanvas(windowWidth, windowHeight);
  rate = height / DURATION;
  noCursor();
}

function draw() {
  background(0)
  fill(255);
  rect(0, 0, width, h);
  h+=rate;

  if (flash) {
    let f = frameCount % FLASH_INTERVAL;
    if (f > 0 && f < FLASH_HOLD) background(FLASH_BG);
  }
}

function keyPressed() {
  switch (key) {
    case 'f':
      flash = !flash;
      console.log('flash on?', flash);
  }

  switch (keyCode) {
    case UP_ARROW:
        h -= height/4;
        break;
    case DOWN_ARROW:
        h += height/4;
        break;
    
  }
}



