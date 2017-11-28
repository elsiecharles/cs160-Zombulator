// Zombulator by Elsie Charles
//CS160 
// A zombie outbreak simulation

var backgroundColor;

const MIN_SIZE = 5;
const MAX_SIZE = 50;
const POPULATION_SIZE = 200;

var population = [];

var zombieCount = 0;
var humanCount = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(252, 249, 189);
  initializePopulation();
}

function draw() {
  background(backgroundColor);
  noStroke();
  if (humanCount > 0) {       
    drawPopulation();
    movePopulation();
    drawPopulationCounts();
    handleCollisions();
  } else {
    text("All humans dead", width / 2, height - 100);
  }
}

function handleCollisions() {
  var fightIndex = []
  for(var i = 0; i < population.length; ++i) {
    var attacker = population[i];
    fightIndex[0] = i
    for (var j = i + 1; j < population.length; ++j) {
      var target = population[j];
      fightIndex[1] = j
      if (attacker.isTouching(target)) {
        print("fight");
        fight(attacker, target, fightIndex);
      }
    }
  }
}

function fight(attacker, target, fightIndex) {
  if (attacker.size >= target.size) {
    if (attacker.humanoidType == "human") {
      print ("Human Won");
      //population.splice(fightIndex[1], 1);
      zombieCount--;
    } else {
      print ("Zombie Won");
      zombie = initializeZombie();
      target = zombie;
      humanCount--;
      zombieCount++;
    }
  } else {  
    if (target.humanoidType == "human") {
      print ("Zombie Won");
      zombie = initializeZombie();
      target = zombie;
      humanCount--;
      zombieCount++;
  
    } else {
      print ("Human Won");
      //population.splice(fightIndex[1], 1);
      zombieCount--;  
    }
  }
}

function initializePopulation() {
  for (var i = 0; i < POPULATION_SIZE; ++i) {
    var humanoid_type = random(0, 100);
    if (humanoid_type <= 50) {
      population[i] = initializeZombie();
      ++zombieCount;
    } else {
      population[i] = initializeHuman();
      ++humanCount;
    }
  }
}

function drawPopulationCounts() {
  stroke(0);
  textSize(60);
  textAlign(CENTER);
  text("Zombies: " + zombieCount, width / 2, 100);
  text("Humans: " + humanCount, width / 2, height - 100);
}

function drawPopulation() {
  for (var i = 0; i < POPULATION_SIZE; ++i) {
    if (population[i] != undefined) {
      population[i].draw();
    }
  }
}

function movePopulation() {
  for (var i = 0; i < POPULATION_SIZE; ++i) {
    if (population[i] != undefined) {
      population[i].move();
    }
  }
}

function initializeZombie() {
  return {
    humanoidType: "zombie", 
    x: random (0, windowWidth),
    y: random(0, 200),
    speed: random(1, 4),
    size: random(MIN_SIZE, MAX_SIZE),
    color: color(random(1, 50), random(50, 100), random(25, 75), 150),
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
    },
    isTouching: function(target){
      if (this.humanoidType == target.humanoidType) return false;
      var distance = dist(this.x, this.y, target.x, target.y);
      return distance <= (this.size/2 + target.size/2);  
    }
  };
}

function initializeHuman() {
  return {
    humanoidType: "human",
    x: random(0, windowWidth),
    y: random(windowHeight - 200, windowHeight),
    speed: random(1, 4),
    size: random(MIN_SIZE, MAX_SIZE),
    color: color(random(200, 255), random(100, 175), random(25, 75), 150),
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
      },
    draw: function() {
        fill(this.color);
        ellipse(this.x, this.y, this.size, this.size);
    },
    isTouching: function(target){
      if (this.humanoidType == target.humanoidType) return false;
      var distance = dist(this.x, this.y, target.x, target.y);
      return distance <= (this.size/2 + target.size/2);  
    }
  };
}
