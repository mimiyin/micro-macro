let ab = { 'a' : [], 'b': [] };
let phrases = structuredClone(ab);;
let speakers = structuredClone(ab);

let urlParams = new URLSearchParams(window.location.search);

// SETTINGS
let src = urlParams.get('src') || 'words';
console.log(src);

// RECORD
let record = structuredClone(ab);
let timers = structuredClone(ab);

// SOUND
let sound;

function preload() {
  for(let l in ab) phrases[l] = loadStrings(l + '.txt');
  sound = loadSound('copter.wav');
  //timers = loadJSON('record.json');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let l in ab) {
    speakers[l] = new p5.Speech(); // speech synthesis object
    speakers[l].setPitch(l == 'a' ? 0.5 : 2);
  }
  sound.loop();
  background(128);
}

function draw() {
  // auto-pilot;
  for(let ab in timers) {
    let timer = timers[ab];
    for(let fc of timer) {
      if(frameCount > fc) {
        next(ab);
        break;
      }
    }
  }
}

function next(k) {
  let random_phrase = random(phrases[k]);
  speakers[k].speak(random_phrase);
  textSize(48);
  textAlign(CENTER);
  
  let x = key == 'a' ? 0 : width/2;
  fill(x == 0 ? 33 : 66);
  rect(x, 0, width/2, height);
  fill('white');
  text(random_phrase, x + (width/4), height / 2);

  // log it
  record[k].push(frameCount);
}

function keyPressed() {
  if (key in record) next(key);
  else if(keyCode == ENTER) saveJSON(record, 'record-'+ Date.now() + '.json');
}
