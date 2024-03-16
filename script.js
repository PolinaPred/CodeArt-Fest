let player;
let level = 0;
let keymode = 0;
let hope = 0;

let playField;

let coin;
let score = 0;
let coinX = 0;
let coinY = 0;
let coinSpots = [950, 820, 690, 560, 430, 300, 170, 50];
let playerShade = 0;
let coinNum = 0;

let zone1Color = 0;
let zone2Color = 0;
let zone3Color = 0;
let zone4Color = 0;
let zone5Color = 0;

let ground;
let button1;
let door1;
let door1Unlocked = false;
let endWall1;

let box;
let spinner;
let platform;

let blocks;
let floor;
let fallColor =255;

let trailColor;

function setup() {
  createCanvas(1000, 600);
  background(255);
  textAlign(CENTER);
  angleMode(DEGREES);
  ellipseMode(CENTER);
  rectMode(CENTER);

  player = new Sprite(width/2,height/2,50,50);
  player.color = "black";
  player.stroke = "white";
  player.strokeWeight = 3;
  player.collider = "d";
  player.layer = 2;
  player.bounciness = 0;

  coin = new Sprite(-50,-50,30);
  coinX = random(15,width-15);
  coinY = random(15,height-15);

  zone1 = new Sprite(900, -900, 200, height);
  zone2 = new Sprite(700, -900, 200, height);
  zone3 = new Sprite(500, -900, 200, height);
  zone4 = new Sprite(300, -900, 200, height);
  zone5 = new Sprite(100, -900, 200, height);

  zone1.collider = "s";
  zone2.collider = "s";
  zone3.collider = "s";
  zone4.collider = "s";
  zone5.collider = "s";
  zone1.layer = 1;
  zone2.layer = 1;
  zone3.layer = 1;
  zone4.layer = 1;
  zone5.layer = 1;
  zone1.strokeWeight = 0;
  zone2.strokeWeight = 0;
  zone3.strokeWeight = 0;
  zone4.strokeWeight = 0;
  zone5.strokeWeight = 0;
  player.overlaps(zone1);
  player.overlaps(zone2);
  player.overlaps(zone3);
  player.overlaps(zone4);
  player.overlaps(zone5);

  ground = new Sprite(width/2, 900,width*4,height/2);
  ground.color = "white";
  ground.stroke = "white";
  ground.collider = "s"; 
  button1 = new Sprite(-250,900,100,20);
  button1.color = "black";
  button1.collider = "s";
  door1 = new Sprite(1250,900,40,200);
  door1.color = "black";
  door1.collider = "s";
  endWall1 = new Sprite(-520, 900, 40, height);
  endWall1.color = "white";
  endWall1.stroke = "white";
  endWall1.collider = "s";
  endWall1.visible = false;

  box = new Sprite(width/2-25, 2000, 50,50);
  box.color = "white";
  box.stroke = 100;
  box.strokeWeight = 8;
  box.collider = "d";
  box.bounciness = 0.1;
  spinner = new Sprite(width/2+50,2000,40,380);
  spinner.color = "black";
  spinner.collider = "d";
  spinner.overlaps(ground);
  spinner.bounciness = 0;
  platform = new Sprite(width/2, 2000,width*4,1);
  platform.collider = "s";
  platform.color = "white";
  platform.visible = true;
  platform.bounciness = 0;
  spinner.drag = 5;
  platform.friction = 0;
  spinner.rotationDrag = 1;

  blocks = new Group();
  blocks.color = "white";
  blocks.stroke = 0;
  blocks.collider = "s";
  block = new blocks.Sprite(height *3/2+240, height *3/2,200,200);
  block.rotation -=330;
  block = new blocks.Sprite(height *3/2-220, height *3/2-180,150,150);
  block.rotation -=400;
  block = new blocks.Sprite(height *3/2-210, height *3/2+250,100,100);
  block.rotation -=40;
  blocks.friction = 0;
  blocks.bounciness = 1;
  floor = new Sprite(1000, height *4,width*4,100);
  floor.color = 0;
  floor.collision = "s";
  floor.bounciness = 0;

}

function draw() {
  if(hope == 0){
    player.visible = false;
    background("black");
    fill("white");
    textSize(30);
    text("Hope begins in the dark.",width/2,height/2);
    if(mouse.presses()){
      player.visible = true;
      runZero();
      hope =1;
    }
  }
  if (level == 0 && hope==1){
    background("white");
    fill(100);
    textSize(20);
    text("Use arrow keys to move", width/2, 100);
    canvasBound(true);
    //expand field if pushed
    if (player.x > playField.x+(playField.width/2)-player.width/2){
      playField.width += 2;
      playField.x+=1;
      player.x=playField.x+(playField.width/2)-player.width/2;
    }
    if (player.x < playField.x-(playField.width/2)+player.width/2){
      playField.width += 2;
      playField.x-=1;
      player.x=playField.x-(playField.width/2)+player.width/2;
    }
    if (player.y > playField.y+(playField.height/2)-player.height/2){
      playField.height += 2;
      playField.y+=1;
      player.y=playField.y+(playField.height/2)-player.height/2;
    }
    if (player.y < playField.y-(playField.height/2)+player.height/2){
      playField.height += 2;
      playField.y-=1;
      player.y=playField.y-(playField.height/2)+player.height/2;
    }
    if(playField.width >= 1000 && playField.height >= 600){
      hope = 2;
      level = 1;
    }
  }
  if(hope == 2){
    player.visible = false;
    playField.visible = false;
    background("black");
    fill("white");
    textSize(30);
    text("Hoping is being able to see light \ndespite all of the darkness.",width/2,height/2);
    if(mouse.presses()){
      player.visible = true;
      hope =3;
      player.pos = {x: width/2, y: height/2};
    }
  }
  if(level == 1 && hope ==3){
    playField.visible = false;
    background("black");
    runOne();
    if(score<9){
      canvasBound(true);
      if(player.collides(coin)){
        coinX = random(15,width-15);
        coinY = random(15,height-15);
        coin.pos = {x:coinX, y: coinY};
        score += 1;
        playerShade += 15;
        player.color = playerShade;
      }
    }else if (score<15){
      canvasBound(true);
      if(player.collides(coin)){
        coinX = coinSpots[coinNum];
        coinY = height/2;
        coin.pos = {x:coinX, y: coinY};
        score += 1;
        playerShade += 15;
        player.color = playerShade;
        coinNum +=1;
      }
    }else if(score == 15){
      canvasBound(true);
      if(player.collides(coin)){
        coinX = coinSpots[coinNum];
        coinY = height/2;
        coin.pos = {x:coinX, y: coinY};
        score += 1;
        playerShade += 15;
        player.color = playerShade;
      }
    }else if(score == 16){
      canvasBound(true);
      if(player.collides(coin)){
        coinX = -50;
        coinY = -50;
        coin.pos = {x:coinX, y: coinY};
        playerShade += 15;
        player.color = playerShade;
        coin.visible = false;
        level = 2;
        hope = 4;
      }
    }
  }

  if(hope == 4){
    player.visible = false;
    background("black");
    fill("white");
    textSize(30);
    text("Only when we are brave enough \nto explore the darkness will we discover \nthe infinite power of our light.",width/2,height/2);
    if(mouse.presses()){
      player.visible = true;
      runTwo();
      hope =5;
    }
  }

  if(level == 2 && hope ==5){
    player.stroke = "black";
    background("black");
    canvasBound(true);
    if(zone1Color<255){
      if(player.overlapping(zone1)){
        zone1Color +=1;
      }else if (zone1Color>0){
        zone1Color -=1;
      }
    }
    if(zone2Color<255){
      if(player.overlapping(zone2)){
        zone2Color +=1;
      }else if (zone2Color>0){
        zone2Color -=1;
      }
    }
    if(zone3Color<255){
      if(player.overlapping(zone3)){
        zone3Color +=1;
      }else if (zone3Color>0){
        zone3Color -=1;
      }
    }
    if(zone4Color<255){
      if(player.overlapping(zone4)){
        zone4Color +=1;
      }else if (zone4Color>0){
        zone4Color -=1;
      }
    }
    if(zone5Color<255){
      if(player.overlapping(zone5)){
        zone5Color +=1;
      }else if (zone5Color>0){
        zone5Color -=1;
      }
    }
    if(zone1Color+zone2Color+zone3Color+zone4Color+zone5Color == 255*5){
      level = 3;
      hope = 6;
      zone1.y = -900;
      zone2.y = -900;
      zone3.y = -900;
      zone4.y = -900;
      zone5.y = -900;
    }
    zone1.color = zone1Color;
    zone2.color = zone2Color;
    zone3.color = zone3Color;
    zone4.color = zone4Color;
    zone5.color = zone5Color;
  }

  if(hope == 6){
    player.visible = false;
    background("black");
    fill("white");
    textSize(30);
    text("When you know what you hope for most, \nyou can make things happen, almost like magic.",width/2,height/2);
    if(mouse.presses()){
      player.visible = true;
      runThree();
      hope =7;
    }
  }

  if(level == 3 && hope ==7){
    background("white");
    camera.x = player.x;
    if(player.vel != 0){
      ground.stroke = 0;
    }
    if (player.collided(button1)){
      door1Unlocked = true;
    }
    if(door1Unlocked){
      door1.y = ground.y-ground.height/2 + door1.height/2;
    }
    if(player.x>door1.x+50){
      level = 4;
      hope = 8;
    }
  }

  if(hope == 8){
    ground.visible = false;
    spinner.visible = false;
    platform.visible = false;
    player.visible = false;
    door1.visible = false;
    background("black");
    fill("white");
    textSize(30);
    text("Hope can be a powerful force.",width/2,height/2);
    if(mouse.presses()){
      player.visible = true;
      runFour();
      hope =9;
    }
  }

  if(level == 4 && hope ==9){
    background("white");
    camera.x = player.x;
    spinner.x = width/2+50;
    spinner.y = ground.y;

    if (box.colliding(button1)){
      door1Unlocked = true;
    }
    if(door1Unlocked){
      door1.y = ground.y-ground.height/2 + door1.height/2;
    }

    if(player.x<door1.x-50){
      runFive();
      level = 5;
      hope = 10;
    }
  }

if(hope == 10){
    ground.visible = false;
    spinner.visible = false;
    platform.visible = false;
    player.visible = false;
    door1.visible = false;
    background("black");
    fill("white");
    textSize(30);
    text("The shadow is the greatest teacher \nfor how to come to the light.",width/2,height/2);
    if(mouse.presses()){
      player.visible = true;
      ground.visible = true;
      platform.visible = true;
      runFive();
      hope =11;
    }
  }

if (level ==5 && hope == 11){
  background(fallColor);
  camera.x = player.x;
  camera.y = player.y;
  ground.stroke = 0;
  platform.stroke = 0;
  blocks.stroke = 0;
  player.color = 0;
  player.stroke = "white";
  if(player.y<300){
    fallColor = 255;
  }else if (player.y<400){
    fallColor = 225;
  }else if (player.y<500){
    fallColor = 195;
  }else if (player.y<600){
    fallColor = 165;
  }else if (player.y<700){
    fallColor = 135;
  }else if (player.y<800){
    fallColor = 105;
  }else if (player.y<900){
    fallColor = 75;
  }else if (player.y<1000){
    fallColor = 45;
  }else if (player.y<1100){
    fallColor = 15;
  }else if (player.y<1200){
    fallColor = 0;
  }else if (player.y>1500){
    hope =12;
    level =6;
  }
}
if(hope ==12){
  ground.visible = false;
    spinner.visible = false;
    platform.visible = false;
    player.visible = false;
    door1.visible = false;
    blocks.visible = false;
    background("black");
    fill("white");
    textSize(30);
    text("Nothing can dim the light \nthat shines from within.",width/2,height/2);
    if(mouse.presses()){
      player.visible = true;
      runSix();
      hope =13;
      player.x = width/2;
      player.y = height/2;
    }
}

if(level ==6 && hope ==13){
  background("white");
  fill("white");
  stroke(0);
  strokeWeight(4);
  rect(width/2,height/2, 700,500);
  strokeWeight(0);
  fill(0);
  textSize(50);text("The End",width/2,200);
  fill(50);
  textSize(20);
  text("Onwards to new beginnings!",width/2,300);
}

  //Keyboard Controls
  if (keymode == 0){
    if(kb.pressing("down")){
      player.vel.y = 5;
      player.vel.x = 0;
    } else if(kb.pressing("up")){
      player.vel.y = -5;
      player.vel.x = 0;
    } else if(kb.pressing("right")){
      player.vel.x=5;
      player.vel.y = 0;
    }else if(kb.pressing("left")){
      player.vel.x=-5;
      player.vel.y = 0;
    }else{
      player.vel.x = 0;
      player.vel.y=0;
    }
  }else if (keymode == 1){
    if(kb.pressing("right")){
      player.vel.x=5;
    }else if(kb.pressing("left")){
      player.vel.x=-5;
    }else{
      player.vel.x = 0;
    }
    if(kb.presses("up")){
      if(player.colliding(ground)){
        player.vel.y = -5;
      }
    }
  }
}

function runZero(){
  player.rotationLock = true;
  playField = new Sprite(width/2,height/2,200,200);
  playField.color = "black";
  playField.collider = "n";
  playField.layer = 1;
}

function runOne(){
  player.rotationLock = true;
  coin.pos = {x:coinX, y: coinY};
  coin.color = "black";
  coin.stroke = "white";
  coin.strokeWeight = 8;
  coin.collider = "s";
}

function runTwo(){
  player.pos = {x: 900, y:height/2};
  player.rotationLock = true;
  player.color = "white";
  zone1.color = 0;
  zone2.color = 0;
  zone3.color = 0;
  zone4.color = 0;
  zone5.color = 0;
  zone1.y = height/2;
  zone2.y = height/2;
  zone3.y = height/2;
  zone4.y = height/2;
  zone5.y = height/2;
}

function runThree(){
  zone1.y = -900;
  zone2.y = -900;
  zone3.y = -900;
  zone4.y = -900;
  zone5.y = -900;
  player.color = "black";
  player.stroke = "white";
  player.x = width/2+25;
  player.y = height/2;
  player.collider = "d";
  ground.y = height/4*3+player.height/2;
  keymode = 1;
  world.gravity.y = 10;

  button1.y = ground.y-(ground.height/2)+5;
  door1.y = ground.y-ground.height/2-door1.height/2;
  endWall1.y = ground.y-ground.height/2;
}

function runFour(){
  ground.visible = true;
  spinner.visible = true;
  platform.visible = true;
  door1.visible = true;
  player.stroke = 0;
  player.collider = "d";
  player.rotationLock = false;
  door1Unlocked = false;
  platform.y = height/2+200;
  player.pos = {x:width/2-400, y: height/2-25};
  ground.height = 1;
  ground.y = height/2+1;
  box.y = height/2+175;
  button1.x = width/2-150;
  endWall1.x = 1020;
  button1.y = height/2+200;
  door1.x = -150;
  door1.y = ground.y-door1.height/2;
  endWall1.y = height/2;
  spinner.overlaps(ground);
}
function runFive(){

  player.layer = 2;
  ground.layer = 2;
  platform.layer = 2;
  floor.layer = 2;

  endWall1.x = -20;
  endWall1.y = 0;
  ground.width = width+400;
  ground.height = height *3;
  ground.y = ground.height/2+height/2;
  ground.x = 0;
  player.x = width/2-25;
  player.y = height/2-25;

  platform.width = width;
  platform.height = height *3;
  platform.x = width+width/2+100;
  platform.y = ground.height/2+height/2-100;

  blocks.overlap(ground);
  blocks.overlap(platform);

  button1.visible = false;
  door1.visible = false;
  box.visible = false;
  spinner.visible = false;
  spinner.y = -500;
  spinner.collider = "s";
  box.y = -500;
  box.collider = "s";
  button1.y = -500;
  button1.collider = "s";
  door1.y = -500;
  door1.collider = "s";
  floor.y =5000;

  world.gravity.y = 20;
}

function runSix(){
  camera.x = player.x;
  camera.y = player.y;

  player.rotation =0;
  player.rotationLock = true;
  background("white");
  keymode = 0;
  player.y = height/2;
  player.x = width/2;
  player.stroke = 0;
  player.color = 255;

  ground.width = 10;
  ground.height = 10;
  ground.x = -500;
  ground.collider = "n";
  platform.width = 10;
  platform.height = 10;
  platform.x = -500;
  platform.collider = "n";
  blocks.x = -500;
  blocks.collider = "n";
  player.color = 0;
  world.gravity.y = 0;

}

function canvasBound(status){
  if (status == true){
    if(player.x>975){
        player.x = 975;
    }
    if(player.x<25){
        player.x=25;
    }
    if(player.y>575){
      player.y = 575;
    }
    if(player.y<25){
      player.y=25;
    }
  }
}