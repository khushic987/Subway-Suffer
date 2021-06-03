var PLAY=1;
var END=0;
var gamestate=PLAY;
var coingroup, traingroup;
var path,pathImage;
var jake,jakeImage;
var coin,coinImage;
var train,trainImage;
var leftBoundary,rightBoundary;
var score=0;
var restart,restartImage;
var gameover,gameoverImage;
var back,backImage;

function preload(){
  pathImage=loadImage("path.png");
  jakeImage = loadAnimation("Jake1.png","Jake2.png","jake3.png","jake4.PNG","jake5.png");
  coinImage=loadImage("coin.png");
  trainImage=loadImage("thomas.png");
  restartImage=loadImage("reload.png");
  gameoverImage=loadImage("gameover.png")
  backImage=loadImage("Cyan.png");
}

function setup() {
  createCanvas(400, 400);
  
  path=createSprite(200,200);
  path.addImage("path", pathImage);
  path.scale=1.2;
  
  jake=createSprite(300,300,59,200);
  jake.addAnimation("jake", jakeImage);
  jake.scale=0.5;
  
  leftBoundary=createSprite(0,0,100,800);
  leftBoundary.visible = false;

  rightBoundary=createSprite(410,0,100,800);
  rightBoundary.visible = false;
  
  back=createSprite(200,200,25,10) ;
  back.addImage("bg", backImage);
  back.scale=0.4;
  
  restart=createSprite(200,250,25,10) ;
  restart.addImage("restart", restartImage);
  restart.scale=0.2;
    
  gameover=createSprite(200,150,25,10) ;
  gameover.addImage(gameoverImage);
  gameover.scale=0.4;
  
  coingroup=new Group ();
  traingroup=new Group ();

}

function draw() {
    background(220);
  edges = createEdgeSprites();
  
  jake.x = World.mouseX;
   
  jake.collide(edges[3]);
  jake.collide(leftBoundary);
  jake.collide(rightBoundary);
  
 if (gamestate===PLAY){
  back.visible=false;
  gameover.visible=false;
  restart.visible=false;
  path.velocityY = 6
  
  if(path.y>600){
    path.y=30;
}
    
    spawncoins();
   
  if(traingroup.isTouching(jake)){
    jake.visible=false; 
    gamestate=END;

    }
  

 if(jake.isTouching(coingroup)) {
   score=score+1
   coingroup.destroyEach();
 }
  
 if(mousePressedOver(restart)) {
      reset();
    } 
  
if(gamestate===END){
   coingroup.setVelocityYEach();
   coingroup.destroyEach();
  
   traingroup.setVelocityYEach();
   traingroup.destroyEach();
  
    back.visible=true;
  
    gameover.visible=true;
    restart.visible=true;
}
   
   drawSprites();
   textSize(19);
   fill("white");
   text("score:"+score,280,50);
 }  
}

function reset(){
  gamestate=PLAY;
  coingroup.destroyEach();
  traingroup.destroyEach();
  jake.visible=true;
score=0;
}

function spawncoins(){
   if (frameCount % 200 === 0) {
    var coin = createSprite(100,50);
    coin.x = Math.round(random([100,200,300]));
    coin.addImage(coinImage);
    coin.velocityY = 3;
    coin.scale=0.4;
    coingroup.add(coin);

   train=createSprite(100,50)
   train.x = Math.round(random([100,200,300]));
   train.debug=false;
   train.setCollider("circle",0,0,30)
   train.addImage(trainImage)
   train.velocityY = 3;
   train.scale=0.2;
   traingroup.add(train);  
   console.log(train.x);
 }
}



