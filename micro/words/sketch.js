let ab = { 'a' : [], 'b': [] };
let phrases = structuredClone(ab);;
let speakers = structuredClone(ab);

let urlParams = new URLSearchParams(window.location.search);

// SETTINGS
let load = parseInt(urlParams.get('load') || 0);
let debug = parseInt(urlParams.get('debug') || 0);

// RECORD
let record = structuredClone(ab);
let timers = structuredClone(ab);

// CUES
let cues = [];
let stage_mgr;


function preload() {
  for(let l in ab) phrases[l] = loadStrings(l + '.txt');
  if(load) timers = loadJSON('record.json');
  cues = loadJSON('cues.json');
  stage_mgr = loadSound('bell.wav');
  stage_mgr.setVolume(0.25);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let l in ab) {
    speakers[l] = new p5.Speech(); // speech synthesis object
    speakers[l].setPitch(l == 'a' ? 0.5 : 2);
    speakers[l].setVolume(0.5);
  }
  randomSeed(7);
  noStroke();
  background(0);
}

function draw() {
  // auto-pilot;

  for(let ab in timers) {
    let timer = timers[ab];
    for(let fc of timer) {
      if(frameCount == fc) {
        next(ab);
        break;
      }
    }
  }

  // cues
  for(let c in cues) {
    let fc = cues[c] * 60;
    if(frameCount == fc) {
      stage_mgr.play();
    }
  }

  if(frameCount % 180 == 0) background(0);
}

function next(k) {
  let random_phrase = random(phrases[k]);
  speakers[k].speak(random_phrase);
  textSize(48);
  textAlign(CENTER);
  
  let x = k == "a" ? 0 : width/2;

  fill(255);
  rect(x, 0, width/2, height);
  if(debug) {
    fill(128);
    text(random_phrase, x + (width/4), height / 2);
  }

  // log it
  record[k].push(frameCount);
}

function keyPressed() {
  if(load) return;
  if (key in record) next(key);
  else if(keyCode == ENTER) saveJSON(record, 'record-'+ Date.now() + '.json');
}
