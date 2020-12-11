
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
const Render=Matter.Render;
var bob1,bob2,bob3,bob4,bob5,roofObj,rope1,rope2,rope3,rope4,rope5;
var startBobPositionX,startBobPositionY;
var bgImg;
var world;

function preload(){
	bgImg=loadImage("background/bg.png");
}

function setup() {
	createCanvas(900, 700);

    engine = Engine.create();
	world = engine.world;

	bobDiameter=40;
	startBobPositionX=width/2;
	startBobPositionY=height/4+500;
	bob1= new Bob(startBobPositionX-bobDiameter*2,startBobPositionY,bobDiameter);
	bob2=new Bob(startBobPositionX-bobDiameter,startBobPositionY,bobDiameter);
	bob3=new Bob(startBobPositionX,startBobPositionY,bobDiameter);
	bob4=new Bob(startBobPositionX+bobDiameter,startBobPositionY,bobDiameter);
	bob5=new Bob(startBobPositionX+bobDiameter*2,startBobPositionY,bobDiameter);
	
	roofObj=new Roof(width/2,height/4,width/5,20);

	var render = Render.create({
		element: document.body,
		engine: engine,
		options: {
		  width: 1200,
		  height: 700,
		  wireframes: false
		}
	  });
	
	rope1=new Rope(bob1.body,roofObj.body,-bobDiameter*2,0);
	rope2=new Rope(bob2.body,roofObj.body,bobDiameter*1,0);
	rope3=new Rope(bob3.body,roofObj.body,bobDiameter,0);
	rope4=new Rope(bob4.body,roofObj.body,+bobDiameter*1,0);
	rope5=new Rope(bob5.body,roofObj.body,+bobDiameter*2,0);

	constraint1={
		bodyA:bob1.body,
		bodyB:roofObj.body,
		pointB:{x:-bobDiameter*2,y:0}
	}

	constraint2={
		bodyA:bob2.body,
		bodyB:roofObj.body,
		pointB:{x:-bobDiameter,y:0}
	}
	
	constraint3={
		bodyA:bob3.body,
		bodyB:roofObj.body,
		pointB:{x:0,y:0}
	}

	constraint4={
		bodyA:bob4.body,
		bodyB:roofObj.body,
		pointB:{x:bobDiameter,y:0}
	}

	constraint5={
		bodyA:bob5.body,
		bodyB:roofObj.body,
		pointB:{x:bobDiameter*2,y:0}
	}

	var pendulum1=Constraint.create(constraint1);
	var pendulum2=Constraint.create(constraint2);
	var pendulum3=Constraint.create(constraint3);
	var pendulum4=Constraint.create(constraint4);
	var pedulum5=Constraint.create(constraint5);
	
	Engine.run(engine);
}
function draw() {
  rectMode(CENTER);
  background(bgImg);
  
  bob1.display();
  bob2.display();
  bob3.display();
  bob4.display();
  bob5.display();
 

  roofObj.display();

  rope1.display();
  rope2.display();
  rope3.display();
  rope4.display();
  rope5.display();
}
function keyPressed(){
	if (keyCode === UP_ARROW){
		Matter.Body.applyForce(bob1.body,bob1.body.position,{x:-50,y:-45});
	}
}
function drawLine(constraint){
	bobBodyPosition=constraint.bodyA.position;
	roofBodyPosition=constraint.bodyB.position;

	roofBodyOffset=constraint.pointB;

	roofBodyX=roofBodyPosition.x+roofBodyOffset.x;
	roofBodyPositionY=roofBodyPosition.y+roofBodyOffest.y;

	line(bobBodyPosition.x,bobBodyPosition.y,roofBodyX,roofBodyY);
}