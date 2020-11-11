var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey,monkey_running;
var banana,bananaImage,obstacle,obstacleImage,ground;
var obstacleGroup,bananaGroup;
var score=0;
var survivalTime=0;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  
  ground=createSprite(400,350,1200,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;

  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  monkey.setCollider("circle",0,0,280);
  monkey.debug = false;
  
  score = 0;
  
}


function draw() {
  background("lightblue");
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime,100,50);
  
  if (gameState === PLAY){
    food();
    obstacles();
    ground.velocityX = -(4+score/8);
    monkey.velocityY = monkey.velocityY + 1;
    monkey.collide(ground);
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if (keyDown("space") && monkey.y >= 100){
    monkey.velocityY = -12;
    }
  }
  
  if (gameState === END){
    ground.velocityX=0;
    monkey.velocityY=0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  
  if (bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score=score+2;
  }
  
  if (obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
  
  if (keyDown("r") && gameState === END){
    reset();
  }
  
  drawSprites();
}

function reset(){
  score = 0;
  survivalTime = 0;
  gameState = PLAY;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  monkey.changeAnimation("moving",monkey_running);
}

function food() {
  if (frameCount%80===0){
    banana=createSprite(400,200,20,20);
    banana.addImage(bananaImage);
    banana.velocityX=-(5+score/8);
    banana.lifetime=120;
    banana.scale=0.1;
    banana.y=Math.round(random(120,200));
    bananaGroup.add(banana);
  }
}
  
function obstacles() {
  if (frameCount%300===0){
    obstacle=createSprite(600,330,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.lifetime=150;
    obstacle.velocityX=(ground.velocityX + score/10);
    obstacle.scale=0.1;
    obstacleGroup.add(obstacle);
    obstacle.setCollider("circle",0,0,150);
    obstacle.debug=false;
  }
}





