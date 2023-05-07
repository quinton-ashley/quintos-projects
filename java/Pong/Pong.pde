// screen resolution is 256x192

PImage imgBall = spriteArt(
"..wwww..\n" +
".wwyyww.\n" +
"wwywwyww\n" +
"wyyyyyyw\n" +
"wyyyyyyw\n" +
"wwywwyww\n" +
".wwyyww.\n" +
"..wwww..");

PImage imgPaddle = spriteArt(".wwwwww.\nwwwwwwww\n" + "www..www\nww.ww.ww\n".repeat(21) + "wwwwwwww\n.wwwwww.");

PImage imgWall = spriteArt(("c".repeat(320) + "\n").repeat(8));

PImage imgNet = spriteArt("w.\n.w\n".repeat(80));

PImage imgCenterLine = spriteArt("w".repeat(5) + ".".repeat(31) + "w".repeat(144) + ".".repeat(31) + "w".repeat(5) + "\n");

Sprite ball;
Sprite paddleL;
Sprite paddleR;
Sprite wallTop;
Sprite wallBottom;

void setup() {
  allSprites.pixelPerfect = true;
  
  ball = new Sprite();
  ball.img = imgBall;
  ball.x = width / 2;
  ball.y = height / 2;
  ball.rotationLock = true;
  ball.bounciness = 1;
  ball.friction = 0;
  ball.velocity.x = -1;
  ball.velocity.y = 1;
  
  // place paddles 5px from the sides, center vertically
  paddleL = new Sprite();
  paddleL.img = imgPaddle;
  paddleL.x = 10;
  paddleL.collider = 'k';
  
  paddleR = new Sprite();
  paddleR.img = imgPaddle;
  paddleR.x = width - 10;
  paddleR.collider = 'k';
  
  // place walls on the top and bottom of the screen
  wallTop = new Sprite();
  wallTop.img = imgWall;
  wallTop.x = width / 2;
  wallTop.y = 4;
  wallTop.collider = 's';
  
  wallBottom = new Sprite();
  wallBottom.img = imgWall;
  wallBottom.x = width / 2;
  wallBottom.y = height - 4;
  wallBottom.collider = 's';
}

void draw() {
  background("r");
  fill("c");
  stroke("w");
  rect(20, 16, 216, 20); // top
  rect(20, 36, 36, 140); // left
  rect(200, 36, 36, 140); // right
  rect(20, 156, 216, 20); // bottom
  image(imgNet, width / 2 - 2, 16);
  image(imgCenterLine, 20, height / 2);

  if (kb.pressing('w')) {
		paddleL.vel.y = -4;
	} else if (kb.pressing('s')) {
		paddleL.vel.y = 4;
	} else {
		paddleL.vel.y = 0;
	}

	if (kb.pressing('i')) {
		paddleR.vel.y = -4;
	} else if (kb.pressing('k')) {
		paddleR.vel.y = 4;
	} else {
		paddleR.vel.y = 0;
	}

  // if the ball leaves the screen
  if (ball.x < -10 || ball.x > width + 10) {
    ball.x = width / 2;
    ball.y = height / 2;
  }
}
