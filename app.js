//The player(Adjust later)
var player = {
    x: 15,
    y: 450,
    x_v: 0,
    y_v: 0,
    jump: true,
    height: 20,
    width: 20,
    color: '#e6ac27'
};

//Variables for player control(Jump will be added into here)
var controls = {
    right: false,
    left: false,
    up: false,
}

//Friction and Gravity for better feeling movement(Needs work)
var gravity = 0.6;
var friction = 0.7;

//Number of platforms in level(Adjust later)
var num = 5;
var platforms = [];

//Variables for canvas
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
context.canvas.height = 800;
context.canvas.width = 650;

//Creation of Platforms, want to work on random generation
function createPlatform() {
    for(i = 0; i < num; i++) {
        platforms.push({
            x: 125 * i,
            y: 500 - ((Math.random() * 100) * i), 
            width: 100 - ((Math.random() * 20)),
            height: 15
        })
    }
}

//Functions to implement movement(Work in progress)
function keyDown(e) {
    if(e.keyCode == 37) {
        controls.left = true;
    } if (e.keyCode == 39) {
        controls.right = true;
    } if (e.keyCode == 38) {
        if(player.jump == false) {
            player.y_v = -10;
        }
    }
}

function keyUp(e) {
    if(e.keyCode == 37) {
        controls.left = false;
    } if(e.keyCode == 39) {
        controls.right = false;
    } if(e.keyCode == 38) {
        if(player.y_v < -2) {
            player.y_v = -3;
        }
    }
}

//Canvas render
function renderCanvas() {
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, 800, 650)
}

//Player Render
function renderPlayer() {
    context.fillStyle  = player.color;
    context.fillRect((player.x) - 20, (player.y) - 20, player.width, player.height)
}

// Render Platforms
// !!COLOR IS SAME AS PLAYER FOR SOME REASON!!
function renderPlatform() {
    context.fillstyle = '#FFFFFF';
    context.fillRect(platforms[0].x, platforms[0].y, platforms[0].width, platforms[0].height);
    context.fillRect(platforms[1].x, platforms[1].y, platforms[1].width, platforms[1].height);
    context.fillRect(platforms[2].x, platforms[2].y, platforms[2].width, platforms[2].height);
    context.fillRect(platforms[3].x, platforms[3].y, platforms[3].width, platforms[3].height);
    context.fillRect(platforms[4].x, platforms[4].y, platforms[4].width, platforms[4].height);
}

//Function that combines all Renders/Movement
function render() {
    if(controls.left) {
        player.x += -3;
    } if(controls.right) {
        player.x += 3;
//Applies friction when on ground
    } if(player.jump == false) {
        player.x_v *= friction;
//Applies gravity when not on ground
    } else {
        player.y_v += gravity;
    }
    player.jump = true;
    player.y += player.y_v;
    player.x += player.x_v;
//Code for collisions
    let i = -1;
    if(platforms[0].x < player.x && player.x < platforms[0].x + platforms[0].width &&
    platforms[0].y < player.y && player.y < platforms[0].y + platforms[0].height) {
        i = 0;
    }
    if(platforms[1].x < player.x && player.x < platforms[1].x + platforms[1].width &&
    platforms[1].y < player.y && player.y < platforms[1].y + platforms[1].height) {
        i = 1;
    }
    if(platforms[2].x < player.x && player.x < platforms[2].x + platforms[2].width &&
        platforms[2].y < player.y && player.y < platforms[2].y + platforms[2].height) {
            i = 2;
        }
    if(platforms[3].x < player.x && player.x < platforms[3].x + platforms[3].width &&
    platforms[3].y < player.y && player.y < platforms[3].y + platforms[3].height) {
        i = 3;
    }
    if(platforms[4].x < player.x && player.x < platforms[4].x + platforms[4].width &&
        platforms[4].y < player.y && player.y < platforms[4].y + platforms[4].height) {
            i = 4;
        }
    if (i > -1) {
        player.jump = false;
        player.y = platforms[i].y;

        renderCanvas();
        renderPlayer();
        renderPlatform();
    }
}
//Event Listeners
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp)

//TESTING
createPlatform();
setInterval(render, 22)