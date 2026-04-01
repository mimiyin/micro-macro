// FLASH SETTINGS
const FLASH_INTERVAL = 60 * 10 // Will flash every 10s
const FLASH_HOLD = 30 // For 1/2 a second
const FLASH_BG = 128

// Press 'f' to turn flash on/off
let flash = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
}

function draw() {
  background(0)
  let f = frameCount % FLASH_INTERVAL;
  if(f > 0  && f < FLASH_HOLD) background(FLASH_BG)
}

function keyPressed() {
  switch (key) {
    case 'f':
      flash = !flash;
      console.log('flash on?', flash);
  }
}