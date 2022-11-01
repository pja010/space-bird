class GasTank {
  constructor() {
    this.counter = new Count(50, 100)
    this.lost = false
  }
  
  draw(ship, gas, sound=null) {
    let sVal = this.counter.s;
    let Progress = map(sVal,0,100,0,width-20);
    
    if(this.counter.s > 20){
      fill(0,200,200);
      stroke(0,100,100);
    } 
    else {
      fill(200, 0, 0);
      stroke(200,0,0);
    }
    
    textSize(32);
    textFont('monospace')
    
    if(this.counter.s == 0){
      let txt = text('Gas : EMPTY',10,30);
      gas.state = false;
      document.getElementById("lost-screen").style.display = "flex"
      this.lost = true
    }
    else if(this.counter.s == 100){
      let txt = text('Gas : FULL' ,10,30);
    }
    else{
      let txt = text('Gas : '+ sVal + '%',10,30);
    }
    
    rect(10,40,Progress,20,15)
    noFill();
    rect(10,40,width-20,20,15)
    

    if(ship.x + ship.width >= gas.x &&
      ship.x <= gas.x + gas.width &&
      ship.y + ship.height >= gas.y &&
      ship.y <= gas.y + gas.height) {
      
      this.counter.add(30) //counter.add(x) x = % of gas tank
      
      sound.play();
    
      
      gas.reset();
      if (this.counter.s > this.counter.f)
        this.counter.s = this.counter.f
    }
  }
  
  resetGame() {
    this.counter = new Count(50, 100)
    this.lost = false
    this.counter.decreasing()
  }
  
}

class Count{
  constructor(s,f){
    this.s = s
    this.f = f
  }
  
  decreasing() {
    setInterval(() => {this.decrease(),this.s}, 100)
  }
  decrease(){
    if(this.s > 0){
      this.s --
      // this.p.html(this.s) //acted like console.log()
    }
  }
  
  add(litter) {
    this.s += litter
    // this.p.html(this.s)
  }
}

/* 

globals Counter, GasTank, StarField, Gas, Ship, ADD, ALT, ARROW, AUDIO, AUTO, AXES, BACKSPACE, BASELINE,
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