//CUSTOM FUNCTIONS
//Magnitude = float 0-10, x = x coord
function drawMag(magnitude, x, place){
  rectMode(CORNERS)
  textAlign(CENTER) 
  colorMode(HSL, 500)
  noStroke()
  
  let top = height-magnitude*scaleY
  
  //Main Rect
  fill(100*(1+magnitude),50*(1+magnitude),250, 500)
  rect(x,height,x+scaleX,top)
  
  fill(500)
  text(place,x+scaleX/2,top-30)
  text(magnitude,x+scaleX/2,top+15)
  
  //Step 1
  fill(100*(1+magnitude),50*(1+magnitude),250, 300)
  rect(x+scaleX*1,height,x+scaleX*2,top+scaleY/4)
  rect(x-scaleX*1,height,x-scaleX*0,top+scaleY/4)
  
  //Step 2
  fill(100*(1+magnitude),50*(1+magnitude),250, 200)
  rect(x+scaleX*2,height,x+scaleX*3,top+scaleY/2)
  rect(x-scaleX*2,height,x-scaleX*1,top+scaleY/2)
  
  //Step 3
  fill(100*(1+magnitude),50*(1+magnitude),250, 150)
  rect(x+scaleX*3,height,x+scaleX*4,top+scaleY)
  rect(x-scaleX*3,height,x-scaleX*2,top+scaleY)
  
  //Step 4
  fill(100*(1+magnitude),50*(1+magnitude),250, 100)
  rect(x+scaleX*4,height,x+scaleX*5,top+scaleY*2)
  rect(x-scaleX*4,height,x-scaleX*3,top+scaleY*2)
  
  //Step 5
  fill(100*(1+magnitude),50*(1+magnitude),250, 50)
  rect(x+scaleX*5,height,x+scaleX*6,top+scaleY*4)
  rect(x-scaleX*5,height,x-scaleX*4,top+scaleY*4)
  
  //Step 6
  fill(100*(1+magnitude),50*(1+magnitude),250, 25)
  rect(x+scaleX*6,height,x+scaleX*7,top+scaleY*6)
  rect(x-scaleX*6,height,x-scaleX*5,top+scaleY*6)
}

//PRELOAD JSON DATA
function preload(){
  // load json data and store in variable test
  test = loadJSON('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson')
}

//VARIABLE SET UP
function setup() {
  createCanvas(800, 450);
  frameRate(10);
  
  //scale of data vis
  scaleX = 60;
  scaleY = 100;

  // make sure data is loaded, if not, cancel drawing
  if( test === undefined ) return

  // convert dictionary to flat array of values
  quakes = Object.values( test.features )
  locations = [];
  
  //create array of starting locations
  offset = -(scaleX * 6)
  for(let i = 0; i < quakes.length; i++){
    locations[i] = offset;
    offset -= scaleX * 2
  }
}

//DRAW THE DATA
function draw() {
  background(0)
  
  // loop through magnitudes and visualize
  for(let i = 0; i < quakes.length; i++){
    drawMag(quakes[i].properties.mag, locations[i], quakes[i].properties.place);
    locations[i]+=(scaleX/quakes[i].properties.mag)/2
    if (locations[i] >= width + scaleX * 12){locations[i] = -(scaleX * 6)}
  }
  

}
