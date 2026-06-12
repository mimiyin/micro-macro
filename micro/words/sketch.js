let phrases = [];
let prompter;

let urlParams = new URLSearchParams(window.location.search);

// SETTINGS
let src = urlParams.get('src') || 'words';
console.log(src);

function preload() {
  phrases = loadStrings(src + '.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  prompter = new p5.Speech(); // speech synthesis object
}

function draw() {
  // if (frameCount % 300 == 1) {
  //   let random_phrase = random(phrases);
  //   prompter.speak(random_phrase);
  //   textSize(48);
  //   textAlign(CENTER);
  //   background(0);
  //   fill('white');
  //   text(random_phrase, width / 2, height / 2);
  // }
}

function next() {
  let random_phrase = random(phrases);
    prompter.speak(random_phrase);
    textSize(48);
    textAlign(CENTER);
    background(0);
    fill('white');
    text(random_phrase, width / 2, height / 2);
}

function keyPressed() {
  next();
}
