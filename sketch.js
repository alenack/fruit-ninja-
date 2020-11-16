var sword, swordImg;

var backGround, backGroundImg;

var fruit, fruit1, fruit2, fruit3, fruit4, fruit1Img, fruit2Img, fruit3Img, fruit4Img;

var monster, monsterImg;

var gameover, gameoverImg;

var restart, restartImg;

var gameoversound, knifesound;

var fruitGroup;
var monsterGroup;

var PLAY= 1;
var END = 0;
var gameState = 1;
var score = 0;

function preload(){
  swordImg = loadImage("sword.png");
  backGroundImg = loadImage("backGround.jpg");
  fruit1Img = loadImage("fruit1.png");
  fruit2Img = loadImage("fruit2.png");
  fruit3Img = loadImage("fruit3.png");
  fruit4Img = loadImage("fruit4.png");
  monsterImg = loadImage("alien1.png");
  gameoverImg = loadImage("gameover.png");
  gameoversound = loadSound("gameover.mp3");
  knifesound = loadSound("knifeSwooshSound.mp3");
  
}

function setup() {
  createCanvas(500, 450);

  backGround = createSprite(250,210,20,20);
  backGround.scale = 0.4;
  backGround.addImage("background",backGroundImg);
  
  sword = createSprite(50,200,20,20);
  sword.addImage("adding sword",swordImg)
  sword.scale = 0.6;
  
  fruitsGroup = createGroup();
  monsterGroup = createGroup();
  
}

function draw() {
   background(20);
  
 if(gameState === PLAY){
  fruits();
   Enemy();
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    
  if(fruitsGroup.isTouching(sword)){
    fruitsGroup.destroyEach();
     knifesound.play();
    score = score+2;
  
  }
   
   if(monsterGroup.isTouching(sword)){
      gameover = createSprite(300,300,600,600);
      gameover.addImage("gameover",gameoverImg);
     monsterGroup.destroyEach();
     
     gameoversound.play();
     
    gameState = END;
    }
   
  }
  
  else if(gameState === END){
    
    fruitsGroup.velocityX = 0;
    monsterGroup.velocityX = 0;
    
    fruitsGroup.setLifetimeEach(-1);
    monsterGroup.setLifetimeEach(-1);  
  }
  
  drawSprites();
  textSize(20);
   fill("cyan");
  text("Score : " + score,100,50);
}


  function fruits(){
  if(World.frameCount%60 === 0){
    position = Math.round(random(1,2));
    fruit = createSprite(400,200,20,20);
    fruit.scale= 0.2;
    r= Math.round(random(1,4))
    if(r == 1){
      fruit.addImage(fruit1Img);
    } else if (r == 2){
      fruit.addImage(fruit2Img);
    } else if(r == 3){
      fruit.addImage(fruit3Img);
    } else if(r == 4){
      fruit.addImage(fruit4Img);
    }
    
    fruits.lifetime=100;
    fruitsGroup.add(fruit);

    
    fruit.y=Math.round(random(50,400));
    if(position==1){
      fruit.x=400;
      fruit.velocityX=-(7+(score/4));
      }
    else{
      if(position==2){
        fruit.x=0;
        fruit.velocityX=(7+(score/4));
      }
        }
}
  }

function Enemy(){
  if(World.frameCount%200 === 0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImg);
    monster.y=Math.round(random(100,300));
    monster.velocityX = -(6+(score/10));
    monster.lifeTime = 100;
    
    monsterGroup.add(monster);
  }
}
