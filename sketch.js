// Add some header info
// For TM template code

// Video
let video;
let label = "waiting..";
let classifier;
let imageModelURL = "https://teachablemachine.withgoogle.com/models/DGjrtRRDY/";
// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2: Start classifying
  classifyVideo();
}

// STEP 2 classify!
function classifyVideo() {
  classifier.classify(video, gotResult);
}

function draw() {
  background(0);

  // Draw the video
  image(video, 0, 0);

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);
}

// STEP 3: Get the classification!
// function gotResult(error, results) {
//   if (error) {
//     console.error(error);
//     return;
//   }
//   label = results[0].label;
//   classifyVideo();
// }

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;

  // Assuming label is a string like '1', '2', ... '6'
  let steps = parseInt(label);
  if(!isNaN(steps)) {
    // Send this to the Unity Game via the jslib function
    UnityWebGLInteractions.SendMessageToUnity(steps.toString());
  }
  

  classifyVideo();
}

