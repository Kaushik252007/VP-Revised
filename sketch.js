var dog, happydog, database, foodS, foodStock;

function preload()
{
  sadImage = loadImage("images/dogImg.png");
  happyImage = loadImage ("images/dogImg1.png");
}

function setup() {
	createCanvas(1000,400);
  
  dog = createSprite(800,200,150,150);
  dog.addImage(sadImage)
  dog.scale = 0.2;

  database = firebase.database();
  
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
}


function draw() {  
background(46, 139, 87);
  drawSprites();
  textSize(20);
  fill("black");
  stroke("black");
  text("Press UP ARROW Key to Feed the Dog", 200, 200);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyImage);
}
  

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x = x - 1;
  }
  database.ref('/').update({
    food:x
  })
}

