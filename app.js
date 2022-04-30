//The player, will adjust later
var player = {
    x: 25,
    y: 450,
    height: 40,
    width: 40
};

//Variables for player control
var controls = {
    right: false,
    left: false,
}

//Number of platforms in level
var num = 5;
var platforms = [];

//Variables for canvas
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
context.canvas.height = 1000;
context.canvas.width = 1000;

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
    }
}

function keyUp(e) {
    if(e.keyCode == 37) {
        controls.left = false;
    } if(e.keyCode == 39) {
        controls.right = false;
    }
}

//Canvas render
function renderCanvas() {
    context.fillStyle = '#725953';
    context.fillRect(0, 0, 1000, 1000)
}

//Player Render(Want to figure out how to use outside model.)
function renderPlayer() {
    context.fillStyle  = '#1305A1';
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
    }
    renderCanvas();
    renderPlayer();
    renderPlatform();
}

//Event Listeners
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp)

//TESTING
createPlatform();
setInterval(render, 10)