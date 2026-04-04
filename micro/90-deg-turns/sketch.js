// Press 'f' to turn flash on/off
// Press ENTER/RETURN to force rotation

// FLASH SETTINGS
const FPS = 60;
const FLASH_INTERVAL = FPS * 10 // Will flash every 10s
const FLASH_HOLD = FPS * 0.5 // For 1/2 a second
const FLASH_BG = 128
let flash = false;

// TURN SETTINGS
const TURN_INTERVAL = FPS * 60 * 10; // 10 minutes
let counter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();

}

function draw() {
  background(0)
  fill(255);

  let f = counter % (TURN_INTERVAL * 4);
  if (f < TURN_INTERVAL * 1) rect(0, 0, width / 2, height);
  else if (f < TURN_INTERVAL * 2) rect(0, 0, width, height/2);
  else if (f < TURN_INTERVAL * 3) rect(width/2, 0, width / 2, height);
  else rect(0, height/2, width, height / 2);
  counter++;

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

  switch(keyCode) {
    case ENTER:
      counter += TURN_INTERVAL;
  }
}



