let starField;
let starField2;
let ship;
let gas;
let gasTank;
let sound;
let counter;
let turn;

/* MOVENET START
*/

let detector;
let poses;
let video;


let mx_hip;
let nose_y;
let nose_x;

let lx_hip;
let ly_hip;

let rx_hip;
let ry_hip;
let my_hip;

let degrees1;
let degrees2;

   

async function init() {
  const detectorConfig = {
    modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
  };
  detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.MoveNet,
    detectorConfig
  );
}

async function videoReady() {
  // console.log("video ready");
  await getPoses();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship(60, windowWidth/2-30, windowHeight-180);
  gas = new Gas(60, windowWidth/2, 0, 5);
  counter = new Counter();
  gasTank = new GasTank(counter);
  
  video = createCapture(VIDEO, videoReady);
  video.hide();
  init();
  starField = new StarField(8, 1, 4, 2);
  starField2 = new StarField(4, 1, 3, 1);
}
async function getPoses() {
  poses = await detector.estimatePoses(video.elt);
  // console.log(video);
  // console.log(poses);
  
  // Caculate middle of hip x value
  lx_hip = poses[0].keypoints[11].x
  ly_hip = poses[0].keypoints[11].y
  rx_hip =  poses[0].keypoints[12].x
  ry_hip =  poses[0].keypoints[12].y
  mx_hip = (lx_hip + rx_hip)/2; 
  
  
  // Calculate middle of hip y value
  my_hip = (ly_hip + ry_hip)/2; 
  
  let hip_origin_v = createVector(mx_hip, my_hip);
  let nose_v = createVector(nose_x, nose_y);
  let top_screen_v = createVector(mx_hip, 0);
  
  let v0 =  p5.Vector.sub(top_screen_v, hip_origin_v)
  let v1 =  p5.Vector.sub(nose_v, hip_origin_v)
  
  // Get nose position
  nose_x = poses[0].keypoints[0].x
  nose_y = poses[0].keypoints[0].y 
  
  // body line length from middle hip to nose
  //body_line = my_hip - ncos-1 [ (a · b) / (|a| |b|) ]ose_y 
  
  let angle = v0.angleBetween(v1)
  turn = (angle * 180/PI)
  ship.setTurn(turn);
  // console.log(turn);
  // angle is PI/2
  // print("hip:", degrees);
  
  //print(my_hip);
  //print(body_line);
  await leftShoulderAngle();
  await rightShoulderAngle();
  setTimeout(getPoses, 0);
}

async function rightShoulderAngle(){
  
  let rx_should = poses[0].keypoints[6].x;
  let ry_should = poses[0].keypoints[6].y;
  
  rx_hip =  poses[0].keypoints[12].x
  ry_hip =  poses[0].keypoints[12].y
  
  let rx_elb =  poses[0].keypoints[8].x
  let ry_elb =  poses[0].keypoints[8].y
  
  let r_elb_origin_v = createVector(rx_should, ry_should);
  let r_elb_v = createVector(rx_elb, ry_elb);
  let r_hip_v = createVector(rx_hip, ry_hip);
 
  let v2 =  p5.Vector.sub(r_elb_v, r_elb_origin_v);
  let v3 =  p5.Vector.sub(r_hip_v, r_elb_origin_v);
  
  let angle = v2.angleBetween(v3);
  degrees1 = (angle * 180) / PI;
  
  // print("right:", degrees);
  
}

async function leftShoulderAngle(){
  
  let lx_should = poses[0].keypoints[5].x;
  let ly_should = poses[0].keypoints[5].y;
  
  lx_hip = poses[0].keypoints[11].x;
  ly_hip = poses[0].keypoints[11].y;
  
  let lx_elb =  poses[0].keypoints[7].x;
  let ly_elb =  poses[0].keypoints[7].y;
  
  let l_elb_origin_v = createVector(lx_should, ly_should);
  let l_elb_v = createVector(lx_elb, ly_elb); // incorrect - gives 0
  let l_hip_v = createVector(lx_hip, ly_hip);
  
  
  let v4 =  p5.Vector.sub(l_elb_v, l_elb_origin_v);
  let v5 =  p5.Vector.sub(l_hip_v, l_elb_origin_v);
  
  let angle = v4.angleBetween(v5);
  degrees2 = (angle * 180) / PI;
  // print("left:", degrees);
  
}

/* MOVENET END
*/


function preload(){
    sound = loadSound('https://cdn.glitch.global/83be1388-3079-4574-ba81-66b534fdda15/mario-coin-sound.mp3?v=1667239226171');
}

// make the start screen goes away when a key is pressed
window.addEventListener("keydown", function() {
  document.getElementById("start-screen").style.display = "none";
  gasTank.counter.decreasing()
  counter.counter.increasing()
}, {once : true});

function draw() {
  background(0);
  ship.draw();
  gas.draw();
  counter.draw();
  gasTank.draw(ship, gas, sound, counter);
  
  
  starField2.draw();
  starField.draw();
  
  // GESTURE CONTROL - call draw() in gestures.js
  // background(255,255,255,0);
  translate(video.width, 0);
  scale(-1, 1);
  // image(video, 0, 0);
  if (poses && poses.length > 0) {
    for (let kp of poses[0].keypoints) {
      const { x, y, score } = kp;
      if (score > 0.4) {
        
        // Draws body_line
        stroke(255, 204, 0);
        strokeWeight(4);
        line(mx_hip, my_hip, mx_hip, 0)
        
        // Draws body_line
        stroke(255, 0, 0);
        strokeWeight(4);
        line(mx_hip, my_hip, nose_x, nose_y)
        
        // Draws dots on person 
        fill(255);
        stroke(0);
        strokeWeight(4);
        circle(x, y, 16);
      }
    }
  }
  
  // starField2.draw();
  // starField.draw();
//   const availableColors = [
//     color(255, 247, 222),
//     color(230, 255, 253),
//     color(255, 255, 250),
//   ];
//   const randomIndex = Math.floor(Math.random() * availableColors.length);

//   let fillColor = availableColors[randomIndex];
//   fill(fillColor)
  
  // logic for arrow_key_up and arrow_key_down
  // if (keyIsDown(UP_ARROW)) {
  // let lef = leftShoulderAngle().then(result => result.data)
  // console.log(degrees1, degrees2)
  if (degrees2 > 30 && degrees1 < -30) {  // GESTURE CONTROL
    console.log("sdfsd")
    let a = ship.getAcceleration();
    starField.addSpeed(a);
    starField2.addSpeed(a/1.5);
    gas.addSpeed(a*1.5);
  } else {
    starField.resetSpeed();
    starField2.resetSpeed();
    gas.resetSpeed();
  }
  
}

// restart the game upon a mouseclick
function mousePressed() {
  if (gasTank.lost) {
    document.getElementById("lost-screen").style.display = "none";
    gasTank.resetGame()
    gas.state = true
  }
}

/* 
globals Angles, Counter, GasTank, StarField, Gas, Ship, ADD, ALT, ARROW, AUDIO, AUTO, AXES, BACKSPACE, BASELINE,
BEVEL, BEZIER, BLEND, BLUR, BOLD, BOLDITALIC, BOTTOM, BURN, CENTER, CHORD,
CLAMP, CLOSE, CONTROL, CORNER, CORNERS, CROSS, CURVE, DARKEST, DEGREES,
DEG_TO_RAD, DELETE, DIFFERENCE, DILATE, DODGE, DOWN_ARROW, ENTER, ERODE,
ESCAPE, EXCLUSION, FALLBACK, FILL, GRAY, GRID, HALF_PI, HAND, HARD_LIGHT,
HSB, HSL, IMAGE, IMMEDIATE, INVERT, ITALIC, LABEL, LANDSCAPE, LEFT,
LEFT_ARROW, LIGHTEST, LINEAR, LINES, LINE_LOOP, LINE_STRIP, MIRROR, MITER,
MOVE, MULTIPLY, NEAREST, NORMAL, OPAQUE, OPEN, OPTION, OVERLAY, P2D, PI,
PIE, POINTS, PORTRAIT, POSTERIZE, PROJECT, QUADRATIC, QUADS, QUAD_STRIP,
QUARTER_PI, RADIANS, RADIUS, RAD_TO_DEG, REMOVE, REPEAT, REPLACE, RETURN,
RGB, RIGHT, RIGHT_ARROW, ROUND, SCREEN, SHIFT, SOFT_LIGHT, SQUARE, STROKE,
SUBTRACT, TAB, TAU, TESS, TEXT, TEXTURE, THRESHOLD, TOP, TRIANGLES,
TRIANGLE_FAN, TRIANGLE_STRIP, TWO_PI, UP_ARROW, VIDEO, WAIT, WEBGL,
accelerationX, accelerationY, accelerationZ, deltaTime, deviceOrientation,
displayHeight, displayWidth, focused, frameCount, height, isKeyPressed,
key, keyCode, keyIsPressed, mouseButton, mouseIsPressed, mouseX, mouseY, movedX,
movedY, pAccelerationX, pAccelerationY, pAccelerationZ, pRotateDirectionX,
pRotateDirectionY, pRotateDirectionZ, pRotationX, pRotationY, pRotationZ,
pixels, pmouseX, pmouseY, pwinMouseX, pwinMouseY, rotationX, rotationY, rotationZ,
touches, turnAxis, width, winMouseX, winMouseY, windowHeight, windowWidth,
abs, acos, alpha, ambientLight, ambientMaterial, angleMode, append,
applyMatrix, arc, arrayCopy, asin, atan, atan2, background, beginContour, 
beginShape, bezier, bezierDetail, bezierPoint, bezierTangent, bezierVertex, 
blend, blendMode, blue, boolean, box, brightness, byte, camera, ceil, char, 
circle, clear, clearStorage, color, colorMode, concat, cone, constrain, 
copy, cos, createA, createAudio, createButton, createCamera, createCanvas, 
createCapture, createCheckbox, createColorPicker, createDiv, createElement, 
createFileInput, createGraphics, createImage, createImg, createInput, 
createNumberDict, createP, createRadio, createSelect, createShader, 
createSlider, createSpan, createStringDict, createVector, createVideo, 
createWriter, cursor, curve, curveDetail, curvePoint, curveTangent, 
curveTightness, curveVertex, cylinder, day, debugMode, degrees, describe, 
describeElement, directionalLight, displayDensity, dist, downloadFile, ellipse, 
ellipseMode, ellipsoid, emissiveMaterial, endContour, endShape, erase, 
exitPointerLock, exp, fill, filter, float, floor, fract, frameRate, 
frustum, fullscreen, get, getFrameRate, getItem, getURL, getURLParams, 
getURLPath, green, gridOutput, hex, hour, httpDo, httpGet, httpPost, hue, 
image, imageMode, int, isLooping, join, keyIsDown, lerp, lerpColor, 
lightFalloff, lightness, lights, line, loadSound, loadBytes, loadFont, loadImage, 
loadJSON, loadModel, loadPixels, loadShader, loadStrings, loadTable, loadXML, 
log, loop, mag, map, match, matchAll, max, millis, min, minute, model, month, 
nf, nfc, nfp, nfs, noCanvas, noCursor, noDebugMode, noErase, noFill, noLights, 
noLoop, noSmooth, noStroke, noTint, noise, noiseDetail, noiseSeed, norm, normalMaterial, 
orbitControl, ortho, perspective, pixelDensity, plane, point, pointLight, pop, popMatrix, 
popStyle, pow, print, push, pushMatrix, pushStyle, quad, quadraticVertex, radians, random, 
randomGaussian, randomSeed, rect, rectMode, red, redraw, registerPromisePreload, removeElements, 
removeItem, requestPointerLock, resetMatrix, resetShader, resizeCanvas, reverse, rotate, rotateX, 
rotateY, rotateZ, round, saturation, save, saveCanvas, saveFrames, saveGif, saveJSON, 
saveJSONArray, saveJSONObject, saveStrings, saveTable, scale, second, select, 
selectAll, set, setAttributes, setCamera, setFrameRate, setMoveThreshold, 
setShakeThreshold, shader, shearX, shearY, shininess, shorten, shuffle, sin, 
smooth, sort, specularColor, specularMaterial, sphere, splice, split, 
splitTokens, spotLight, sq, sqrt, square, storeItem, str, stroke, strokeCap, 
strokeJoin, strokeWeight, subset, tan, text, textAlign, textAscent, textDescent, textFont, textLeading, 
textOutput, textSize, textStyle, textWidth, texture, textureMode, textureWrap, 
tint, torus, translate, triangle, trim, unchar, unhex, updatePixels, vertex, 
writeFile, year 

*/
