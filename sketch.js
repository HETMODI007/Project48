var bgImg, asteriodImg, misslieImg, rocketImg, earthImg;
var bg, player, asteriods, earth;
var asteriodsGroup;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var life = 3;
var gameState = "fight"
var gameState = lose

function preload(){
bgImg = loadImage("Background.jpg");
asteriodImg = loadImage("Asteriod.jpg");
rocketImg = loadImage("spaceshuttle.png");
earthImg = loadImage("Earth.png");
heart1Img = loadImage("heart_1.png")
heart2Img = loadImage("heart_2.png")
heart3Img = loadImage("heart_3.png")
}

function setup() {
createCanvas(windowWidth,windowHeight);
bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg);
bg.scale = 6.2 

//creating the player sprite
player = createSprite(150,300,20,20);
player.addImage(rocketImg);
player.scale = 0.7
player.debug = false
player.setCollider("rectangle",0,0,300,300)

earth = createSprite(1250,290,20,20);
earth.addImage(earthImg);
earth.scale = 0.6
earth.debug = false
earth.setCollider("rectangle",0,0,300,300)

//creating sprites to depict lives remaining
heart1 = createSprite(displayWidth-150,40,20,20)
heart1.visible = false
 heart1.addImage("heart1",heart1Img)
 heart1.scale = 0.4

 heart2 = createSprite(displayWidth-100,40,20,20)
 heart2.visible = false
 heart2.addImage("heart2",heart2Img)
 heart2.scale = 0.4

 heart3 = createSprite(displayWidth-150,40,20,20)
 heart3.addImage("heart3",heart3Img)
 heart3.scale = 0.4
//creating group for asteriods    
asteriodsGroup = new Group();
}

function draw() {
background(0); 

if(gameState === "fight"){
    //displaying the appropriate image according to lives reamining
    if(life===3){
    heart3.visible = true
    heart2.visible = false
    heart1.visible = false
    }
    
    if(life===2){
    heart3.visible = false
    heart2.visible = true
    heart1.visible = false
    }
    
    if(life===1){
      heart3.visible = false
      heart2.visible = false
      heart1.visible = true
      }
      //moving the player up and down and making the game mobile compatible using touches
      if(keyDown("UP_ARROW")||touches.length>0){
        player.y = player.y-30
        }
        if(keyDown("DOWN_ARROW")||touches.length>0){
        player.y = player.y+30
        }
        if(keyDown("LEFT_ARROW")||touches.length>0){
            player.x = player.x-30
          }
          
          if(keyDown("RIGHT_ARROW")||touches.length>0){
           player.x = player.x+30
          }
        if(life===0){
            gameState = "lost"
              }
    }


//destroy asteriods when player touches it
if(asteriodsGroup.isTouching(player)){
for(var i=0;i<asteriodsGroup.length;i++){        
if(asteriodsGroup[i].isTouching(player)){
asteriodsGroup[i].destroy()
       -1
       life=life-1
} 
}
}

//calling the function to spawn asteriods
enemy();

drawSprites();
}

textSize(20)
text("Lives = " + life,displayWidth-200,displayHeight/2-280)

if(gameState == "lost"){
  
    textSize(150)
    fill("red")
    text("You Lost ",400,400)
    asteriodsGroup.destroyEach();
    player.destroy();
  }
//creating function to spawn asteriods
function enemy(){
if(frameCount%50===0){
//giving random x and y positions for asteriods to appear
asteriods = createSprite(random(500,1100),random(100,500),40,40) 
asteriods.addImage(asteriodImg)
asteriods.scale = 0.30
asteriods.velocityX = -3
asteriods.debug= false
asteriods.setCollider("rectangle",0,0,400,400)    
asteriods.lifetime = 400
asteriodsGroup.add(asteriods)
}  
}
