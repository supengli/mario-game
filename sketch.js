/*

The Game Project

Week 3

Game interaction

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var isJumped;

var mountain;
var mountain_2;
var tree;
var cloud;
var canyon;
var collectable;


function setup()
{
	createCanvas(1024, 576  );
	floorPos_y = height * 3/4;
	gameChar_x = width/15;
	gameChar_y = floorPos_y;
    
    mountain = {x_pos: 700, y_pos: floorPos_y, size: 500};
    mountain_2 = {x_pos: 500, y_pos: floorPos_y, size: 200};
    tree = {x_pos: 500, y_pos: floorPos_y, size: 25};
    cloud = {x_pos: 200, y_pos: 100, size: 30};
    canyon = {x_pos: 100, y_pos: floorPos_y, width: 120};
    collectable = {x_pos: 500, y_pos: floorPos_y, size: 10, isFound: false};

    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    isJumped = false;
}

function draw()
{

	///////////DRAWING CODE//////////

	background(253, 250, 212); //fill the sky sand


	noStroke();
	fill(194, 178, 128);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some sand ground
    
    // right mountain
    fill(255, 227, 160);
    triangle(mountain.x_pos,
             mountain.y_pos,
             mountain.x_pos + mountain.size,
             mountain.y_pos,
             mountain.x_pos + mountain.size * 0.5,
             mountain.y_pos - mountain.size * 0.5 );
    
    fill(249, 233, 142);
    triangle(mountain.x_pos,
             mountain.y_pos,
             mountain.x_pos + mountain.size * 0.6,
             mountain.y_pos,
             mountain.x_pos + mountain.size * 0.5,
             mountain.y_pos - mountain.size * 0.5 );
    
    // left montain
    fill(255, 227, 160);
    triangle(mountain_2.x_pos,
             mountain_2.y_pos,
             mountain_2.x_pos + mountain_2.size,
             mountain_2.y_pos,
             mountain_2.x_pos + mountain_2.size * 0.5,
             mountain_2.y_pos - mountain_2.size * 0.5 );
    
    fill(249, 233, 142);
    triangle(mountain_2.x_pos,
             mountain_2.y_pos,
             mountain_2.x_pos + mountain_2.size * 0.6,
             mountain_2.y_pos,
             mountain_2.x_pos + mountain_2.size * 0.5,
             mountain_2.y_pos - mountain_2.size * 0.5 );
    
    // draw a tree
    fill(160, 82, 45);
    triangle(tree.x_pos,
             tree.y_pos,
             tree.x_pos + tree.size,
             tree.y_pos,
             tree.x_pos + tree.size * 0.5,
             tree.y_pos - tree.size * 7);
    fill(128, 128, 0);
    arc(tree.x_pos + tree.size * 0.5 + cos(PI/3) * tree.size * 5/2, 
        tree.y_pos - tree.size * 7 - sin(PI/3) * tree.size * 5/2, 
        tree.size * 5, tree.size * 5, 
        PI/3, PI *2/3, CHORD);
    arc(tree.x_pos + tree.size * 0.5 - cos(PI/3) * tree.size * 5/2, 
        tree.y_pos - tree.size * 7 - sin(PI/3) * tree.size * 5/2, 
        tree.size * 5, tree.size * 5, 
        PI/3, PI *2/3, CHORD);
    
    // cloud
    fill(255);
    ellipse(cloud.x_pos, cloud.y_pos, cloud.size * 2, cloud.size);
    ellipse(cloud.x_pos + cloud.size * 0.5, 
            cloud.y_pos + cloud.size * 0.5,
            cloud.size * 2,
            cloud.size);
    ellipse(cloud.x_pos + cloud.size * 0.5 * 2, 
            cloud.y_pos + cloud.size * 0.5,
            cloud.size * 2,
            cloud.size);
    ellipse(cloud.x_pos + cloud.size * 0.5 * 2, 
            cloud.y_pos - cloud.size * 0.5,
            cloud.size * 2,
            cloud.size);
    ellipse(cloud.x_pos + cloud.size * 0.5 * 1.5, 
            cloud.y_pos - cloud.size * 0.3,
            cloud.size *2 ,
            cloud.size);
    ellipse(cloud.x_pos + cloud.size * 0.5 * 3, 
            cloud.y_pos,
            cloud.size *2 ,
            cloud.size);

	//draw the canyon
    fill(253, 250, 212);
    beginShape();
        vertex(canyon.x_pos, canyon.y_pos);
        vertex(canyon.x_pos + 15, canyon.y_pos + 40);
        vertex(canyon.x_pos, height);
        vertex(canyon.x_pos + canyon.width, height);
        vertex(canyon.x_pos + canyon.width - 5, height - 50);
        vertex(canyon.x_pos + canyon.width - 20, height - 53);
        vertex(canyon.x_pos + canyon.width, canyon.y_pos);
    endShape();
    fill(224, 255, 255);
    quad(canyon.x_pos + 4, height - 30,
         canyon.x_pos, height,
         canyon.x_pos + canyon.width, height,
         canyon.x_pos + canyon.width - 3, height - 30
        )

    // draw the collectable
    if(!collectable.isFound) {
        fill(255, 215, 0);
        stroke(255, 255, 0);
        var angle = TWO_PI / 5;
        var halfAngle = angle/2.0;
        beginShape();
        for (var a = 0; a < TWO_PI; a += angle) {
            var sx = collectable.x_pos + cos(a) * collectable.size;
            var sy = collectable.y_pos - 20 + sin(a) * collectable.size;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }
	//the game character
	if(isLeft && isFalling) {
        // add your jumping-left code
        //feet
        fill(255, 0, 0);
        stroke(100);
        ellipse(gameChar_x + 15, gameChar_y - 8, 10, 15);
        ellipse(gameChar_x + 1, gameChar_y - 5, 10, 15);

        //face
        fill(255, 192, 203);
        noStroke();
        ellipse(gameChar_x, gameChar_y - 20, 35, 35);
        ellipse(gameChar_x + 10, gameChar_y - 30, 20, 20);
        noFill();
        stroke(100);
        arc(gameChar_x, gameChar_y - 20, 35, 35, -PI/6, TWO_PI - PI/3, OPEN);
        arc(gameChar_x + 10, gameChar_y - 30, 20, 20, PI + PI/3, TWO_PI + PI/6, OPEN);

        //left eye
        fill(0);
        noStroke();
        ellipse(gameChar_x - 12, gameChar_y - 25, 4, 10);
        fill(255);
        ellipse(gameChar_x - 13, gameChar_y - 27, 2, 5);
        fill(0, 0, 255);
        ellipse(gameChar_x - 13, gameChar_y - 22, 1, 2);

        //right eye
        fill(0);
        noStroke();
        ellipse(gameChar_x - 6, gameChar_y - 25, 4, 10);
        fill(255);
        ellipse(gameChar_x - 7, gameChar_y - 27, 2, 5);
        fill(0, 0, 255);
        ellipse(gameChar_x - 7, gameChar_y - 22, 1, 2);
        fill(255, 105, 180);

        //hope
        fill(255, 105, 180);
        ellipse(gameChar_x - 3, gameChar_y - 18, 6, 4);

        //mouth
        fill(220, 20, 60)
        stroke(100);
        strokeWeight(0.5);
        ellipse(gameChar_x - 10,  gameChar_y - 10, 4, 4);
        strokeWeight(1);
	}
	else if(isRight && isFalling)
	{
        //feet
        fill(255, 0, 0);
        stroke(100);
        ellipse(gameChar_x - 15, gameChar_y - 8, 10, 15);
        ellipse(gameChar_x - 1, gameChar_y - 5, 10, 15);
        
        //face
        fill(255, 192, 203);
        noStroke();
        ellipse(gameChar_x, gameChar_y - 20, 35, 35);
        ellipse(gameChar_x - 10, gameChar_y - 30, 20, 20);
        noFill();
        stroke(100);
        arc(gameChar_x, gameChar_y - 20, 35, 35, -PI/6, PI + PI/6, OPEN);
        arc(gameChar_x, gameChar_y - 20, 35, 35, -PI + PI/3, TWO_PI, OPEN);
        arc(gameChar_x - 10, gameChar_y - 30, 20, 20, PI - PI/6, TWO_PI - PI/3, OPEN);

        //left eye
        fill(0);
        noStroke();
        ellipse(gameChar_x + 12, gameChar_y - 25, 4, 10);
        fill(255);
        ellipse(gameChar_x + 13, gameChar_y - 27, 2, 5);
        fill(0, 0, 255);
        ellipse(gameChar_x + 13, gameChar_y - 22, 1, 2);

        //right eye
        fill(0);
        noStroke();
        ellipse(gameChar_x + 6, gameChar_y - 25, 4, 10);
        fill(255);
        ellipse(gameChar_x + 7, gameChar_y - 27, 2, 5);
        fill(0, 0, 255);
        ellipse(gameChar_x + 7, gameChar_y - 22, 1, 2);
        fill(255, 105, 180);

        //hope
        fill(255, 105, 180);
        ellipse(gameChar_x + 3, gameChar_y - 18, 6, 4);

        //mouth
        fill(220, 20, 60)
        stroke(100);
        strokeWeight(0.5);
        ellipse(gameChar_x + 10,  gameChar_y - 10, 4, 4);
        strokeWeight(1);

	}
	else if(isLeft) {
        //feet
        fill(255, 0, 0);
        stroke(100);
        ellipse(gameChar_x + 15, gameChar_y - 8, 10, 15);
        ellipse(gameChar_x - 10, gameChar_y - 5, 15, 10);
        
        //face
        fill(255, 192, 203);
        noStroke();
        stroke(100);
        ellipse(gameChar_x, gameChar_y - 20, 35, 35);
        
        //hand
        arc(gameChar_x + 5, gameChar_y - 20, 15, 15, 0, TWO_PI/3, OPEN);
        
        //left eye
        fill(0);
        noStroke();
        ellipse(gameChar_x - 12, gameChar_y - 25, 4, 10);
        fill(255);
        ellipse(gameChar_x - 13, gameChar_y - 27, 2, 5);
        fill(0, 0, 255);
        ellipse(gameChar_x - 13, gameChar_y - 22, 1, 2);

        //right eye
        fill(0);
        noStroke();
        ellipse(gameChar_x - 6, gameChar_y - 25, 4, 10);
        fill(255);
        ellipse(gameChar_x - 7, gameChar_y - 27, 2, 5);
        fill(0, 0, 255);
        ellipse(gameChar_x - 7, gameChar_y - 22, 1, 2);
        fill(255, 105, 180);

        //hope
        fill(255, 105, 180);
        ellipse(gameChar_x - 3, gameChar_y - 18, 6, 4);

        //mouth
        fill(220, 20, 60)
        stroke(100);
        strokeWeight(0.5);
        ellipse(gameChar_x - 10,  gameChar_y - 10, 4, 4);
        strokeWeight(1);

	}
	else if(isRight) {
        //feet
        fill(255, 0, 0);
        stroke(100);
        ellipse(gameChar_x - 15, gameChar_y - 8, 10, 15);
        ellipse(gameChar_x + 10, gameChar_y - 5, 15, 10);
        
        //face
        fill(255, 192, 203);
        noStroke();
        stroke(100);
        ellipse(gameChar_x, gameChar_y - 20, 35, 35);
        
        //hand
        arc(gameChar_x - 5, gameChar_y - 20, 15, 15, PI/3, PI, OPEN);
        
        //left eye
        fill(0);
        noStroke();
        ellipse(gameChar_x + 12, gameChar_y - 25, 4, 10);
        fill(255);
        ellipse(gameChar_x + 13, gameChar_y - 27, 2, 5);
        fill(0, 0, 255);
        ellipse(gameChar_x + 13, gameChar_y - 22, 1, 2);

        //right eye
        fill(0);
        noStroke();
        ellipse(gameChar_x + 6, gameChar_y - 25, 4, 10);
        fill(255);
        ellipse(gameChar_x + 7, gameChar_y - 27, 2, 5);
        fill(0, 0, 255);
        ellipse(gameChar_x + 7, gameChar_y - 22, 1, 2);
        fill(255, 105, 180);

        //hope
        fill(255, 105, 180);
        ellipse(gameChar_x + 3, gameChar_y - 18, 6, 4);

        //mouth
        fill(220, 20, 60)
        stroke(100);
        strokeWeight(0.5);
        ellipse(gameChar_x + 10,  gameChar_y - 10, 4, 4);
        strokeWeight(1);
	}
	else if(isFalling || isPlummeting) {
        //feet
        fill(255, 0, 0);
        stroke(100);
        ellipse(gameChar_x - 8, gameChar_y - 5, 10, 15);
        ellipse(gameChar_x + 8, gameChar_y - 5, 10, 15);
        
        //face
        fill(255, 192, 203);
        noStroke();
        ellipse(gameChar_x, gameChar_y - 20, 35, 35);
        ellipse(gameChar_x + 10, gameChar_y - 30, 20, 20);
        ellipse(gameChar_x - 10, gameChar_y - 30, 20, 20);
        noFill();
        stroke(100);
        arc(gameChar_x, gameChar_y - 20, 35, 35, -PI/6, PI + PI/6, OPEN);
        arc(gameChar_x, gameChar_y - 20, 35, 35, -PI + PI/3, TWO_PI - PI/3, OPEN);
        arc(gameChar_x + 10, gameChar_y - 30, 20, 20, PI + PI/3, TWO_PI + PI/6, OPEN);
        arc(gameChar_x - 10, gameChar_y - 30, 20, 20, PI - PI/6, TWO_PI - PI/3, OPEN);

        //left eye
        fill(0);
        noStroke();
        ellipse(gameChar_x - 4, gameChar_y - 25, 4, 10);
        fill(255);
        ellipse(gameChar_x - 4, gameChar_y - 27, 3, 5);
        fill(0, 0, 255);
        ellipse(gameChar_x - 4, gameChar_y - 22, 2, 2);
        fill(255, 105, 180);
        ellipse(gameChar_x - 8, gameChar_y - 18, 6, 4);

        //right eye
        fill(0);
        noStroke();
        ellipse(gameChar_x + 4, gameChar_y - 25, 4, 10);
        fill(255);
        ellipse(gameChar_x + 4, gameChar_y - 27, 3, 5);
        fill(0, 0, 255);
        ellipse(gameChar_x + 4, gameChar_y - 22, 2, 2);
        fill(255, 105, 180);
        ellipse(gameChar_x + 8, gameChar_y - 18, 6, 4);
    
        //mouth
        fill(220, 20, 60)
        stroke(100);
        strokeWeight(0.5);
        ellipse(gameChar_x,  gameChar_y - 10, 6, 4);
        strokeWeight(1);
	}
	else
	{
		// feet
        fill(255, 0, 0);
        stroke(100);
        ellipse(gameChar_x - 10, gameChar_y - 5, 15, 10);
        ellipse(gameChar_x + 10, gameChar_y - 5, 15, 10);
        
        //face
        fill(255, 192, 203);
        noStroke();
        ellipse(gameChar_x, gameChar_y - 20, 35, 35);
        
        //hand
        ellipse(gameChar_x + 11, gameChar_y - 20, 20, 20);
        ellipse(gameChar_x - 11, gameChar_y - 20, 20, 20);
        noFill();
        stroke(100);
        arc(gameChar_x, gameChar_y - 20, 35, 35, PI/10, PI - PI/10, OPEN);
        arc(gameChar_x, gameChar_y - 20, 35, 35, PI + PI/10, TWO_PI - PI/10, OPEN);
        arc(gameChar_x + 11, gameChar_y - 20, 20, 20, - PI/3.5, PI/3.5, OPEN);
        arc(gameChar_x - 11, gameChar_y - 20, 20, 20, PI - PI/3.5, PI + PI/3.5, OPEN);

        //left eye
        fill(0);
        noStroke();
        ellipse(gameChar_x - 4, gameChar_y - 25, 4, 10);
        fill(255);
        ellipse(gameChar_x - 4, gameChar_y - 27, 3, 5);
        fill(0, 0, 255);
        ellipse(gameChar_x - 4, gameChar_y - 22, 2, 2);
        fill(255, 105, 180);
        ellipse(gameChar_x - 8, gameChar_y - 18, 6, 4);

        //right eye
        fill(0);
        noStroke();
        ellipse(gameChar_x + 4, gameChar_y - 25, 4, 10);
        fill(255);
        ellipse(gameChar_x + 4, gameChar_y - 27, 3, 5);
        fill(0, 0, 255);
        ellipse(gameChar_x + 4, gameChar_y - 22, 2, 2);
        fill(255, 105, 180);
        ellipse(gameChar_x + 8, gameChar_y - 18, 6, 4);

        //mouth
        fill(220, 20, 60)
        stroke(100);
        strokeWeight(0.5);
        ellipse(gameChar_x,  gameChar_y - 10, 6, 4);
        strokeWeight(1);

	}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    // detect if the character is plummeting
    if(gameChar_x > canyon.x_pos && gameChar_x < canyon.x_pos + canyon.width && gameChar_y >= floorPos_y){
        isPlummeting = true;
    }
    // collusion detection
    if(dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos) < 20){
        collectable.isFound = true;
    }
    // detect if the character is above the ground
    if (!isPlummeting) {
        if(isLeft) {
            gameChar_x -= 2;
        }

        if(isRight) {
            gameChar_x += 2;
        }
        if(gameChar_y == floorPos_y){
            isFalling = false;
            if(isJumped){
            gameChar_y -= 100;
            }
        }
        else if(gameChar_y < floorPos_y){
            isFalling = true;
            gameChar_y += 1;
        }
    }
    else {
        gameChar_y += 5;
    }
    
}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    
    // implement left and right for keyPressed
    if(keyCode == 37) {
        //console.log("left arrow");
        isLeft = true;
    }
    else if(keyCode == 39) {
        //console.log("right arrow");
        isRight = true;
    }
    else if(keyCode == 32){
        //console.log("space");
        isJumped = true;
    }
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    
    // implement left and right for keyReleased
    if(keyCode == 37) {
        //console.log("left arrow");
        isLeft = false;
    }
    else if(keyCode == 39) {
        //console.log("right arrow");
        isRight = false;
    }
    else if(keyCode == 32){ 
        // console.log("space");
        isJumped = false;
    }
    
}
