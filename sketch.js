/*

The Game Project 5 - Bring it all together

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var trees_x;
var collectables;
var clouds;
var mountains;
var canyons;

function setup()
{
    createCanvas(1024, 576);
    floorPos_y = height * 3/4;
    gameChar_x = width/2;
    gameChar_y = floorPos_y;

    // Variable to control the background scrolling.
    scrollPos = 0;

    // Variable to store the real position of the gameChar in the game
    // world. Needed for collision detection.
    gameChar_world_x = gameChar_x - scrollPos;


    // Boolean variables to control the movement of the game character.
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;

    // Initialise arrays of scenery objects.
    trees_x = 
    [
        250,
        300,
        800,
        1200,
        -500
    ];

    collectables = 
    [
        {x_pos: 50, y_pos: floorPos_y, size: 10, isFound: false},
        {x_pos: 800, y_pos: floorPos_y, size: 20, isFound: false},
        {x_pos: 1800, y_pos: floorPos_y, size: 30, isFound: false}
    ];

    clouds = 
    [
        {x_pos: 100, y_pos: 200, size: 22},
        {x_pos: 600, y_pos: 100, size: 30},
        {x_pos: 800, y_pos: 200, size: 14},
        {x_pos: 1000, y_pos: 100, size: 14},
        {x_pos: 1200, y_pos: 200, size: 22},
        {x_pos: 1800, y_pos: 150, size: 30}
    ];

    mountains =
    [
        {x_pos: 700, size: 500},
        {x_pos: 500, size: 200},
        {x_pos: 1500, size: 200},
        {x_pos: 1800, size: 500}
    ];
    
    canyons = 
    [
        {x_pos: 100, width: 120}, 
        {x_pos: 600, width: 150},
        {x_pos: 1600, width: 100},
        {x_pos: 2000, width: 100}
    ];

}

function draw()
{
    background(253, 250, 212); // fill the sky sand

    noStroke();
    fill(194, 178, 128);
    rect(0, floorPos_y, width, height/4); // draw some sand ground
    push();
    translate(scrollPos, 0);
    // Draw clouds.
    drawClouds();

    // Draw mountains.
    drawMountains();

    // Draw trees.
    drawTrees();

    // Draw canyons.
    for(var i = 0; i < canyons.length; i++)
    {
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
    }

    // Draw collectable items.
    for(var i = 0; i < collectables.length; i++)
    {
        if(collectables[i].isFound == false)
            {
                drawCollectable(collectables[i]);
                checkCollectable(collectables[i]);
            }
        
    }
    pop();
    // Draw game character.

    drawGameChar();

    // Logic to make the game character move or the background scroll.
    if(isLeft && !isPlummeting)
    {
        if(gameChar_x > width * 0.2)
        {
            gameChar_x -= 5;
        }
        else
        {
            scrollPos += 5;
        }
    }

    if(isRight && !isPlummeting)
    {
        if(gameChar_x < width * 0.8)
        {
            gameChar_x  += 5;
        }
        else
        {
            scrollPos -= 5; // negative for moving against the background
        }
    }

    // Logic to make the game character rise and fall.
    if(gameChar_y < floorPos_y)
    {
        gameChar_y += 2;
        isFalling = true;
    }
    else
    {
        isFalling = false;
    }
    
    // detect if the character is above the ground
    if (isPlummeting) 
    {
        gameChar_y += 5;
    }
    
    
    
    
    
    

    // Update real position of gameChar for collision detection.
    gameChar_world_x = gameChar_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed()
{
    if(keyCode == 37)
    {
        isLeft = true;
    }
    else if(keyCode == 39)
    {
        isRight = true;
    }
    else if(keyCode == 32)
    {
        if(!isFalling && !isPlummeting)
        {
            gameChar_y -= 100;
        }
    }

}

function keyReleased()
{

    if(keyCode == 37)
    {
        isLeft = false;
    }
    else if(keyCode == 39)
    {
        isRight = false;
    }
}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
    //the game character
    if(isLeft && isFalling)
    {
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
    else if(isLeft)
    {
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
    else if(isRight)
    {
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
    else if(isFalling || isPlummeting)
    {
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
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds()
{
    for(var i = 0; i < clouds.length; i += 1)
    {
        fill(255);
        ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].size * 2, clouds[i].size);
        ellipse(clouds[i].x_pos + clouds[i].size * 0.5, 
                clouds[i].y_pos + clouds[i].size * 0.5,
                clouds[i].size * 2,
                clouds[i].size);
        ellipse(clouds[i].x_pos + clouds[i].size * 0.5 * 2, 
                clouds[i].y_pos + clouds[i].size * 0.5,
                clouds[i].size * 2,
                clouds[i].size);
        ellipse(clouds[i].x_pos + clouds[i].size * 0.5 * 2, 
                clouds[i].y_pos - clouds[i].size * 0.5,
                clouds[i].size * 2,
                clouds[i].size);
        ellipse(clouds[i].x_pos + clouds[i].size * 0.5 * 1.5, 
                clouds[i].y_pos - clouds[i].size * 0.3,
                clouds[i].size *2 ,
                clouds[i].size);
        ellipse(clouds[i].x_pos + clouds[i].size * 0.5 * 3, 
                clouds[i].y_pos,
                clouds[i].size *2 ,
                clouds[i].size);
    }
}

// Function to draw mountains objects.
function drawMountains()
{
     for(var i = 0; i < mountains.length; i += 1)
    {
        fill(255, 227, 160);
        triangle(mountains[i].x_pos,
                 floorPos_y,
                 mountains[i].x_pos + mountains[i].size,
                 floorPos_y,
                 mountains[i].x_pos + mountains[i].size * 0.5,
                 floorPos_y - mountains[i].size * 0.5 );

        fill(249, 233, 142);
        triangle(mountains[i].x_pos,
                 floorPos_y,
                 mountains[i].x_pos + mountains[i].size * 0.6,
                 floorPos_y,
                 mountains[i].x_pos + mountains[i].size * 0.5,
                 floorPos_y - mountains[i].size * 0.5 );
    }
}

// Function to draw trees objects.
function drawTrees()
{
    for(var i = 0; i < trees_x.length; i += 1)
    {
        fill(160, 82, 45);
        triangle(trees_x[i],
             floorPos_y,
             trees_x[i] + 25,
             floorPos_y,
             trees_x[i] + 25 * 0.5,
             floorPos_y - 25 * 7);
        fill(128, 128, 0);
        arc(trees_x[i] + 25 * 0.5 + cos(PI/3) * 25 * 5/2, 
            floorPos_y - 25 * 7 - sin(PI/3) * 25 * 5/2, 
            25 * 5, 25 * 5, 
            PI/3, PI *2/3, CHORD);
        arc(trees_x[i] + 25 * 0.5 - cos(PI/3) * 25 * 5/2, 
            floorPos_y - 25 * 7 - sin(PI/3) * 25 * 5/2, 
            25 * 5, 25 * 5, 
            PI/3, PI *2/3, CHORD);
    }
}


// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
    fill(253, 250, 212);
        beginShape();
            vertex(t_canyon.x_pos, floorPos_y);
            vertex(t_canyon.x_pos + 15, floorPos_y + 40);
            vertex(t_canyon.x_pos, height);
            vertex(t_canyon.x_pos + t_canyon.width, height);
            vertex(t_canyon.x_pos + t_canyon.width - 5, height - 50);
            vertex(t_canyon.x_pos + t_canyon.width - 20, height - 53);
            vertex(t_canyon.x_pos + t_canyon.width, floorPos_y);
        endShape();
    fill(224, 255, 255);
    quad
    (
        t_canyon.x_pos + 4, height - 30,
        t_canyon.x_pos, height,
        t_canyon.x_pos + t_canyon.width, height,
        t_canyon.x_pos + t_canyon.width - 3, height - 30
    );


}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
    if(gameChar_world_x > t_canyon.x_pos + 20 && gameChar_world_x < t_canyon.x_pos + t_canyon.width && gameChar_y >= floorPos_y){
        isPlummeting = true;
    }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
    fill(255, 215, 0);
    stroke(255, 255, 0);
    var angle = TWO_PI / 5;
    var halfAngle = angle/2.0;
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle)
    {
        var sx = t_collectable.x_pos + cos(a) * t_collectable.size;
        var sy = t_collectable.y_pos - 20 + sin(a) * t_collectable.size;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
    if(dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 50)
        {
            t_collectable.isFound = true;
        }
}
