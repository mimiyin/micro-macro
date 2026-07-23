let socket = io('/a');

// Listen for connection
// Log a success message
socket.on("connect", function () {
  console.log("Connected");
});

let ab = { 'a': [], 'b': [] };
let phrases;
let speaker;

let urlParams = new URLSearchParams(window.location.search);

// RECORD
let timers = structuredClone(ab);

// CUES
let cues = [];
let stage_mgr;

let debug = true;


function preload() {
  phrases = loadStrings('../a.txt');
  timers = loadJSON('../record.json');
  cues = loadJSON('../cues.json');
  stage_mgr = loadSound('../bell.wav');
  stage_mgr.setVolume(0.25);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  speaker = new p5.Speech(); // speech synthesis object
  speaker.setVolume(0.5);

  randomSeed(7);
  noStroke();
  background(0);
}

function draw() {
  // auto-pilot;

  for (let ab in timers) {
    let timer = timers[ab];
    for (let fc of timer) {
      if (frameCount == fc) {
        if(ab == 'a') speak();
        else socket.emit('next');
        break;
      }
    }
  }

  // cues
  for (let c in cues) {
    let fc = cues[c] * 60;
    if (frameCount == fc) {
      stage_mgr.play();
      socket.emit('cue');
    }
  }

  if (frameCount % 180 == 0) background(0);
}

function speak() {
  let random_phrase = random(phrases);
  speaker.speak(random_phrase);
  textSize(48);
  textAlign(CENTER);

  background(255);
  if (debug) {
    fill(128);
    text(random_phrase, width/2, height / 2);
  }
}

function keyPressed() {
  if(key == 'd') debug = !debug;
}