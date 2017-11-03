//Zombulator by Elsie Charles
//CS160 


var backgroundColor;

const MIN_SIZE = 5;
const MAX_SIZE = 50;
const POPULATION_SIZE = 500;


var population = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(245, 255, 245);
  initializePopulation ();
}


function draw() {
  background(backgroundColor);
  noStroke();
  drawPopulation ();
  movePopulation ();
}

function initializePopulation(){
  for (var i = 0; i < POPULATION_SIZE; ++i){
    var humanoid_type = random(0, 100);
    if (humanoid_type <= 50){
      population[i] = initializeZombie();
    } else {
      population [i] = initializeHuman ();
    }
  }
}

function drawPopulation () {
  for(var i = 0; i <POPULATION_SIZE; ++i) {
    population[i].draw ();
  }
}

function movePopulation () {
  for (var i = 0; i < POPULATION_SIZE; ++i) {
    population[i].move ();
  }
}
// Zombies. Raaahh!

function initializeZombie() {
  return {
    x: random(0, windowWidth),
    y: random(0, 200),
    speed: random(0.25, 3),
    size: random(MIN_SIZE, MAX_SIZE),
    color: color(random(100, 255), random(50, 150), random(50, 150), 150),
    move: function() {
      var direction = random(0, 100);
      if (direction < 20) {
        this.x += this.speed;
      } else if (direction < 40) {
        this.x -= this.speed;
      } else if (direction < 60) {
        this.y -= this.speed;
      } else {
        this.y += this.speed;
      }
    },
    draw: function() {
      fill(this.color);
      ellipse(this.x, this.y, this.size, this.size);
    }
  };
}

// Humans. Mmmm brains!


function initializeHuman(index) {
  return {
    x: random(0, windowWidth),
    y: random(windowHeight - 200, windowHeight),
    speed: random(0.25, 3),
    size: random(MIN_SIZE, MAX_SIZE),
    color: color(random(50, 150), random(50, 150), random(150, 255), 150),
    draw: function() {
      fill(this.color);
      ellipse(this.x, this.y, this.size, this.size);
    },
    move: function() {
      var direction = random(0, 100);
      if (direction < 20) {
        this.x += this.speed;
      } else if (direction < 40) {
        this.x -= this.speed;
      } else if (direction < 60) {
        this.y += this.speed;
      } else {
        this.y -= this.speed;
      }
    }
  }
}
