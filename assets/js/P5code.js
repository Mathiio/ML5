/*  rate slider */
const container = document.querySelector('.slider__box');
const btn = document.querySelector('.slider__btn');
const color = document.querySelector('.slider__color');
const tooltip = document.querySelector('.slider__tooltip');
const container2 = document.querySelector('.slider__box2');
const btn2 = document.querySelector('.slider__btn2');
const color2 = document.querySelector('.slider__color2');
const tooltip2 = document.querySelector('.slider__tooltip2');
const imagecontainer = document.querySelector('.noise_section-image');
const showresults = document.querySelector('.noise_section-results-clic');
const resultspicto = document.querySelector('.noise_section-results-clic-picto');
const loader = document.querySelector('#loader');
const inputs = document.querySelectorAll('input');
let currentHeight=0;
let percentPosition=0;
let percentPosition2=0;
let shouldRedraw=true;
let drawnLines = [];
let drawnCircles = [];
let drawnSquares = [];
let curRandomSeed = 0;
let resultsTable;
let resultsArr = [];




// Définir les variables pour l'image et le modèle de classification
let img, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14;
let classifier;
let label = '';
let line = '';
let ctx;

// set the initial checked input
let checkedInput = document.querySelector('input:checked');
let checkedIndex = Array.prototype.indexOf.call(inputs, checkedInput);

// add click event listener to each input
inputs.forEach((input, index) => {
  input.addEventListener('click', () => {
    checkedInput.removeAttribute('checked');
    input.setAttribute('checked', 'checked');
    checkedInput = input;
    checkedIndex = index;
    shouldRedraw=true;
  });
});






dragElement = (target, btn) => {
  target.addEventListener('mousedown', (e) => {
      onMouseMove(e);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
  });

  onMouseMove = (e) => {
      e.preventDefault();
      let targetRect = target.getBoundingClientRect();
      let x = e.pageX - targetRect.left + 10;
      if (x > targetRect.width) { x = targetRect.width};
      if (x < 0){ x = 0};
      btn.x = x - 10;
      btn.style.left = btn.x + 'px';

      // get the position of the button inside the container (%)
      percentPosition = (btn.x + 10) / targetRect.width * 100;
      
      // color width = position of button (%)
      color.style.width = percentPosition + "%";

      // move the tooltip when button moves, and show the tooltip
      tooltip.style.left = btn.x - 5 + 'px';
      tooltip.style.opacity = 1;

      // show the percentage in the tooltip
      tooltip.textContent = Math.round(percentPosition) + '%';
      shouldRedraw=true;
  };

  onMouseUp  = (e) => {
      window.removeEventListener('mousemove', onMouseMove);
      tooltip.style.opacity = 0;

      btn.addEventListener('mouseover', function() {
        tooltip.style.opacity = 1;
      });
      
      btn.addEventListener('mouseout', function() {
        tooltip.style.opacity = 0;
      });
  };
};
dragElement(container, btn);


dragElement2 = (target, btn2) => {
  target.addEventListener('mousedown', (e) => {
      onMouseMove2(e);
      window.addEventListener('mousemove', onMouseMove2);
      window.addEventListener('mouseup', onMouseUp2);
  });

  onMouseMove2 = (e) => {
      e.preventDefault();
      let targetRect2 = target.getBoundingClientRect();
      let x = e.pageX - targetRect2.left + 10;
      if (x > targetRect2.width) { x = targetRect2.width};
      if (x < 0){ x = 0};
      btn2.x = x - 10;
      btn2.style.left = btn2.x + 'px';

      // get the position of the button inside the container (%)
      percentPosition2 = (btn2.x + 10) / targetRect2.width * 100;
      
      // color width = position of button (%)
      color2.style.width = percentPosition2 + "%";

      // move the tooltip when button moves, and show the tooltip
      tooltip2.style.left = btn2.x - 5 + 'px';
      tooltip2.style.opacity = 1;

      // show the percentage in the tooltip
      tooltip2.textContent = Math.round(percentPosition2) + '%';
      shouldRedraw=true;
  };

  onMouseUp2  = (e) => {
      window.removeEventListener('mousemove', onMouseMove2);
      tooltip2.style.opacity = 0;

      btn2.addEventListener('mouseover', function() {
        tooltip2.style.opacity = 1;
      });
      
      btn2.addEventListener('mouseout', function() {
        tooltip2.style.opacity = 0;
      });
  };
};
dragElement2(container2, btn2);










function preload() {
  // Charger les images
  img1 = loadImage('assets/img/1.jpg');
  img2 = loadImage('assets/img/2.jpg');
  img3 = loadImage('assets/img/3.jpg');
  img4 = loadImage('assets/img/4.jpg');
  img5 = loadImage('assets/img/5.jpg');
  img6 = loadImage('assets/img/6.jpg');
  img7 = loadImage('assets/img/7.jpg');
  img8 = loadImage('assets/img/8.jpg');
  img9 = loadImage('assets/img/9.jpg');
  img10 = loadImage('assets/img/10.jpg');
  img11 = loadImage('assets/img/11.jpg');
  img12 = loadImage('assets/img/12.jpg');
  img13 = loadImage('assets/img/13.jpg');
  img14 = loadImage('assets/img/14.jpg');
  
  // Charger le modèle de classification
  classifier = ml5.imageClassifier('MobileNet');
}

function setup() {
  let canvas = createCanvas(500, 350);
  ctx = canvas.canvas.getContext('2d');
  canvas.parent(imagecontainer);
  changeImage();
  classifier.classify(canvas, gotResult);

  changeimg=select('#change_image');
  changeimg.mousePressed(changeImage);
}

function draw() {
  if (shouldRedraw) {
    image(img, 0, 0, width, height);
    if(checkedInput.value==1){
      drawnSquares = [];
      drawnCircles = [];
      drawnLines = [];
    }
    else if(checkedInput.value==2){
      drawLines(percentPosition);
      drawnSquares = [];
      drawnCircles = [];
    }else if(checkedInput.value==3){
      drawCircles(percentPosition);
      drawnLines = [];
      drawnSquares = [];
    }else if(checkedInput.value==4){
      drawSquares(percentPosition);
      drawnLines = [];
      drawnCircles = [];
    }
    changeRandomSeed(percentPosition2);
    classifier.classify(canvas, gotResult);
    shouldRedraw = false;
  }
}










function changeImage() {
  const randomNum = Math.floor(Math.random() * 14) + 1;
  if(randomNum==1){
    img=img1;
  }else if(randomNum==2){
    img=img2;
  }else if(randomNum==3){
    img=img3;
  }else if(randomNum==4){
    img=img4;
  }else if(randomNum==5){
    img=img5;
  }else if(randomNum==6){
    img=img6;
  }else if(randomNum==7){
    img=img7;
  }else if(randomNum==8){
    img=img8;
  }else if(randomNum==9){
    img=img9;
  }else if(randomNum==10){
    img=img10;
  }else if(randomNum==11){
    img=img11;
  }else if(randomNum==12){
    img=img12;
  }else if(randomNum==13){
    img=img13;
  }else if(randomNum==14){
    img=img14;
  }
  shouldRedraw=true;
}

function changeRandomSeed(randomSeed) {
  randomSeed = int(randomSeed);
  randomSeed = randomSeed || 0;
  randomSeed = randomSeed + 1;
  randomSeed = randomSeed * 100000;
  randomSeed = randomSeed % 4294967296; // 2^32
  randomSeed = randomSeed - 2147483648; // 2^(32-1)
  randomSeed = randomSeed / 2147483648; // 2^(32-1)
  randomSeed = round(randomSeed * 100000);
  randomSeed = abs(randomSeed);

  curRandomSeed = randomSeed;
  
  // Redraw lines with new coordinates
  drawLines(drawnLines.length);
}











function drawLines(numLines) {
  // Add new lines
  if (drawnLines.length < numLines) {
    let startIdx = drawnLines.length;
    strokeWeight(1);
    stroke(255);
    for (let i = startIdx; i < numLines; i++) {
      let x1 = random(width);
      let y1 = random(height);
      let x2 = random(width);
      let y2 = random(height);
      drawnLines.push([x1, y1, x2, y2]);
    }
  } 
  // Remove extra lines
  else if (drawnLines.length > numLines) {
    drawnLines.splice(numLines);
  }
  
  // Draw lines with new or existing coordinates
  strokeWeight(1);
  stroke(255);
  for (let i = 0; i < drawnLines.length; i++) {
    let [x1, y1, x2, y2] = drawnLines[i];
    x1 = (x1 + curRandomSeed) % width;
    y1 = (y1 + curRandomSeed*72) % height;
    x2 = (x2 + curRandomSeed) % width;
    y2 = (y2 + curRandomSeed*14) % height;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
  }
  
  shouldRedraw=true;
}

function drawSquares(numSquares) {
  // Add new squares
  if (drawnSquares.length < numSquares) {
    let startIdx = drawnSquares.length;
    strokeWeight(1);
    stroke(255);
    for (let i = startIdx; i < numSquares; i++) {
      let x = random(width);
      let y = random(height);
      let size = random(10, 50);
      drawnSquares.push({x: x, y: y, size: size});
    }
  } 
  // Remove extra squares
  else if (drawnSquares.length > numSquares) {
    drawnSquares.splice(numSquares);
  }
  
  // Draw squares with new or existing coordinates
  strokeWeight(1);
  stroke(255);
  for (let i = 0; i < drawnSquares.length; i++) {
    let {x, y, size} = drawnSquares[i];
    x = (x + curRandomSeed) % width;
    y = (y + curRandomSeed*72) % height;
    noFill();
    rect(x, y, size, size);
  }
  
  shouldRedraw=true;
}

function drawCircles(numCircles) {
  // Add new circles
  if (drawnCircles.length < numCircles) {
    let startIdx = drawnCircles.length;
    strokeWeight(1);
    stroke(255);
    for (let i = startIdx; i < numCircles; i++) {
      let x = random(width);
      let y = random(height);
      let radius = random(5, 50);
      drawnCircles.push([x, y, radius]);
    }
  } 
  // Remove extra circles
  else if (drawnCircles.length > numCircles) {
    drawnCircles.splice(numCircles);
  }
  
  // Draw circles with new or existing coordinates
  strokeWeight(1);
  stroke(255);
  fill(255, 0);
  for (let i = 0; i < drawnCircles.length; i++) {
    let [x, y, radius] = drawnCircles[i];
    x = (x + curRandomSeed) % width;
    y = (y + curRandomSeed*72) % height;
    radius = (radius + curRandomSeed*14) % 50 + 5;
    circle(x, y, radius);
  }
  
  shouldRedraw = true;
}










function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    resultsArr = [];
    for (let i = 0; i < results.length; i++) {
      let label = results[i].label || 'N/A';
      let confidence = results[i].confidence || 0;
      let percent = nf(confidence * 100, 0, 2) + '%';
      resultsArr[i] = {label: label, confidence: percent};
    }
    updateResults();
  }
  loader.setAttribute('style', 'opacity:0');
  setTimeout(function() {
    document.body.style.overflowY = 'auto';
    loader.setAttribute('style', 'display:none');
  }, 1000);
}




function updateResults() {
  let resultDiv = document.querySelector('.noise_section-results');
  // Remove all existing child elements
  while (resultDiv.firstChild) {
    resultDiv.removeChild(resultDiv.firstChild);
  }
  // if(checkedInput.value==1){
  //   row.cells[2].textContent = '0.00 %';
  // }else{
  //   row.cells[2].textContent = percentPosition.toFixed(2) + ' %';
  // }
  // Add new child elements for each result
  for (let i = 0; i < resultsArr.length; i++) {
    let result = resultsArr[i];
    let resultElement = document.createElement('p');
    resultElement.textContent = result.confidence + ' probability : ' + result.label ;
    resultDiv.appendChild(resultElement);
  }
}