//Create variables here
var dog, happyDog, database, foodStock, foodS;
var dogImg, happyDogImg;
var feed, addFood;
var fedTime, lastFed;
var foodObj;
function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();

  dog = createSprite(250,300,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.1;

  foodObj = createSprite(250,300,10,10);

  feed=createButton("Feed The Button");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  foodObj.display();

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+lastFed%12 + " PM", 350,30);
  } else if(lastFed==0){
    text("Last Feed  : 12 AM",350,30);
  } else{
    text("Last Feed : "+ lastFed + " AM", 350,30);
  }

  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  });

  drawSprites();
  //add styles here
  textSize(15);
  fill("brown");
  stroke("green");
  text("Note: Press UP_ARROW Key To Feed Drago Milk", 100,50);
}

function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  } else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}