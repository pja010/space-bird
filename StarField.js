class Star {
  constructor(x, y, maxSize) {
    this.x = x;
    this.y = y;
    this.maxSize = maxSize;
    this.color = color(0, 0, 0);
    this.size = 0;

    this.init();
  }

  init() {
    this.createRandomSize();
    this.createRandomColor();
  }

  createRandomSize() {
    this.size = (Math.random() * this.maxSize) / 2 + this.maxSize / 2;
  }

  createRandomColor() {
    const availableColors = [
      color(255, 247, 222),
      color(230, 255, 253),
      color(255, 255, 250),
    ];
    const randomIndex = Math.floor(Math.random() * availableColors.length);

    this.color = availableColors[randomIndex];
  }

  draw() {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

class StarField {
  constructor(rowsRequiredForANewStar, numOfStarsPerRow, starSize, speed) {
    this.pixelRowsCount = 0;
    this.rowsRequiredForANewStar = rowsRequiredForANewStar;
    this.numOfStarsPerRow = numOfStarsPerRow;
    this.starSize = starSize;
    this.speed = speed;
    this.initialSpeed = speed;
    this.stars = [];
  }

  createStar() {
    const star = new Star(Math.random() * width, 1, this.starSize);
    this.stars.push(star);
  }

  createStars() {
    if (
      this.rowsRequiredForANewStar > 1 &&
      this.pixelRowsCount % this.rowsRequiredForANewStar == 0
    ) {
      this.createStar();
    } else if (this.rowsRequiredForANewStar > 1) {
      return;
    }

    for (let i = 0; i < this.numOfStarsPerRow; i++) {
      this.createStar();
    }
  }
  
  setSpeed(v) {
    this.speed = v;
  }
  resetSpeed() {
    this.speed = this.initialSpeed
  }

  cleanUpStars() {
    let newStarSet = [];
    for (let s of this.stars) {
      if (s.y <= height) {
        newStarSet.push(s);
      }
    }
    this.stars = newStarSet;
  }

  draw() {
    this.createStars();
    for (let s of this.stars) {
      s.draw();
      s.y += this.speed;
    }
    this.cleanUpStars();
    this.pixelRowsCount += this.speed;
  }
}

/* 

globals StarField, Gas, Ship, ADD, ALT, ARROW, AUDIO, AUTO, AXES, BACKSPACE, BASELINE,
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
lightFalloff, lightness, lights, line, loadBytes, loadFont, loadImage, 
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
