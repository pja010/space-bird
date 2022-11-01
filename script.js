let starField;
let starField2;
let ship;
let gas;
let gasTank;
let sound;
let counter;
let angles;

function preload(){
    sound = loadSound('https://cdn.glitch.global/83be1388-3079-4574-ba81-66b534fdda15/mario-coin-sound.mp3?v=1667239226171');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  starField = new StarField(8, 1, 4, 2);
  starField2 = new StarField(4, 1, 3, 1);
  ship = new Ship(60, windowWidth/2-30, windowHeight-180);
  gas = new Gas(60, windowWidth/2, 0, 5);
  counter = new Counter();
  gasTank = new GasTank(counter);
  // angles
  angles = new Angles();
  let video = createCapture(VIDEO, videoReady);
  video.hide();
  angles.setVideo(video);
  angles.init();
}

async function videoReady() {
    console.log("video ready");

    await angles.getPoses();
    console.log("here 1")
    // await angles.turnAngle();
    // console.log("here 2")
    // await angles.leftShoulderAngle();
    // console.log("here 3")
    // await angles.rightShoulderAngle();
  
}

// make the start screen goes away when a key is pressed
window.addEventListener("keydown", function() {
  document.getElementById("start-screen").style.display = "none";
  gasTank.counter.decreasing()
  counter.counter.increasing()
}, {once : true});

function draw() {
  background(0);
  starField2.draw();
  starField.draw();
  ship.draw();
  gas.draw();
  counter.draw();
  gasTank.draw(ship, gas, sound, counter);
  //angles.draw();
  // GESTURE CONTROL - call draw() in gestures.js
  
  // logic for arrow_key_up and arrow_key_down
  if (keyIsDown(UP_ARROW)) {
  // if (leftShoulderAngle() > 30 && rightSholderAngle() > 30) {  // GESTURE CONTROL
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
