// KEYS
// SPACE = REGENERATE
// D = DISPLAY
// 1,2,3,4 = PRESET DENSITIES
// UP, DOWN = FADING SPEED
// LEFT, RIGHT = JUMP PRESENT DENSITIES
// A = AUTO VS. MANUAL (AUTO MEANS WEIGHTED RANDOM)

// Press 'f' to turn flash on/off
// FLASH SETTINGS
const FPS = 60;
const FLASH_INTERVAL = FPS * 10 // Will flash every 10s
const FLASH_HOLD = FPS * 0.5 // For 1/2 a second
const FLASH_BG = 128

// Press 'f' to turn flash on/off
let flash = false;

// GOL SETTINGS
const VIS_RES = 3 // <-- Num of rows/cols

////////////////////////
const COLS = VIS_RES + 2;
const ROWS = VIS_RES + 2;
const COL_W = window.innerWidth / COLS;
const ROW_H = window.innerHeight / ROWS;
let board = [];

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
  background(0);
  init();
}

function draw() {
  for (let c = 0; c < COLS; c++) {
    let x = c * COL_W;
    for (let r = 0; r < ROWS; r++) {
      let y = r * ROW_H;
      fill(board[c][r] ? 255 : 0);
      rect(x, y, COL_W, ROW_H);
    }
  }

  if (flash) {
    let f = frameCount % FLASH_INTERVAL;
    if (f > 0 && f < FLASH_HOLD) background(FLASH_BG);
  }
}

function mousePressed() {
  for (let c = 0; c < COLS; c++) {
    let x = c * COL_W;
    for (let r = 0; r < ROWS; r++) {
      let y = r * ROW_H;
      if(mouseX > x && mouseX < x + COL_W && mouseY > y && mouseY < y + ROW_H) {
        board[c][r] = !board[c][r];
      }
    }
  }
}

// Fill board randomly
function init() {
  for (let c = 0; c < COLS; c++) {
    board[c]= [];
    for (let r = 0; r < ROWS; r++) {
      board[c][r] = false;
    }
  }
}

function keyPressed() {
  switch (key) {
    case 'f':
      flash = !flash;
      console.log('flash on?', flash);
  }
}
