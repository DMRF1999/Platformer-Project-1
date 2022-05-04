class Player {
    constructor(x,y,x_v,y_v,jump,height,width,color) {
        this.x = x;
        this.y = y;
        this.x_v = x_v;
        this.y_v = y_v;
        this.jump = jump;
        this.height = height;
        this.width = width;
        this.color = color;
    }
}
let p1 = new Player(15,500,0,0,true,20,20,'rgb(0, 0, 0)')

//Variables for player control(Jump will be added into here)
let controls = {
    right: false,
    left: false,
    up: false,
}

//Death Variable
let deaths = 0;

//Friction and Gravity for better feeling movement(Needs work)
let gravity = 0.4;
let friction = 0.7;

//Number of platforms in level(Adjust later)
let num = 6;
let platforms = [];

//Lava Variable
let lava = 1;
let lava1 = [];

//Wall Variables
let wall = 1;
let wall1 = [];

//Variables for canvas
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
context.canvas.height = 650;
context.canvas.width = 800;

//Function to switch screens
function toggleScreen(id, toggle) {
    let element = document.getElementById(id);
    let display = (toggle) ? 'block' : 'none';
    element.style.display = display;
}

//Creation of Platforms, want to work on random generation
function createPlatform() {
    for(i = 0; i < num; i++) {
        platforms.push({
            x: 125 * i,
            y: 500 - ((Math.random() * 45) * i), 
            width: 100 - ((Math.random() * 20)),
            height: 15
        })
    }
    if(i == num) {
        platforms.push({
            x: 125 * i,
            y: 500,
            width: 100 - ((Math.random() * 20)),
            height: 15
        })
    }
}

//Creation of Lava
function createLava() {
    for(i = 0; i < lava; i++) {
        lava1.push({
            x: 0,
            y: 600,
            width: 800,
            height: 50
        })
    }
}

//Back Wall
function createBackWall() {
    for(i = 0; i< wall; i++) {
        wall1.push({
            x: 795,
            y: 0,
            width: 25,
            height: 800,
        })
    }
}

//Functions to implement movement
function keyDown(e) {
    if(e.keyCode == 37) {
        controls.left = true;
    } if (e.keyCode == 39) {
        controls.right = true;
    } if (e.keyCode == 38) {
        if(p1.jump == false) {
            p1.y_v = -10;
            p1.color = '#' + Math.floor(Math.random() * 16777216).toString(16);
            if(p1.color.length != 7) {
                p1.color = p1.color.splice(0, 1) + "0" + p1.color.splice(1, 6)
            }
        }
    }
}

function keyUp(e) {
    if(e.keyCode == 37) {
        controls.left = false;
    } if(e.keyCode == 39) {
        controls.right = false;
    } if(e.keyCode == 38) {
        if(p1.y_v < -2) {
            p1.y_v = -3;
        }
    }
}

//Canvas render
function renderCanvas() {
    context.fillStyle = 'white';
    context.fillRect(0, 0, 800, 650)
}

//Lava render
function renderLava() {
    context.fillStyle = 'red'
    context.fillRect(lava1[0].x, lava1[0].y, lava1[0].width, lava1[0].height);
}

//Wall render
function renderBackWall() {
    context.fillStyle = 'black'
    context.fillRect(wall1[0].x, wall1[0].y, wall1[0].width, wall1[0].height)
}

//Player Render
function renderPlayer() {
    context.fillStyle  = p1.color;
    context.fillRect((p1.x) - 20, (p1.y) - 20, p1.width, p1.height)
}

// Render Platforms
function renderPlatform() {
    context.fillStyle = 'black';
    context.fillRect(platforms[0].x, platforms[0].y, platforms[0].width, platforms[0].height);
    context.fillRect(platforms[1].x, platforms[1].y, platforms[1].width, platforms[1].height);
    context.fillRect(platforms[2].x, platforms[2].y, platforms[2].width, platforms[2].height);
    context.fillRect(platforms[3].x, platforms[3].y, platforms[3].width, platforms[3].height);
    context.fillRect(platforms[4].x, platforms[4].y, platforms[4].width, platforms[4].height);
    context.fillRect(platforms[5].x, platforms[5].y, platforms[5].width, platforms[5].height);
    context.fillRect(platforms[6].x, platforms[6].y, platforms[6].width, platforms[6].height);
}

//Respawn Player
function resetPosition() {
    p1.x = 15;
    p1.y = 500;
    p1.x_v = 0;
    p1.y_v = 0;
    p1.jump = true;
    p1.height = 20;
    p1.width = 20;
    p1.color = 'rgb(0, 0, 0)';
    deaths += 1;
}

//Running the game
function startGame() {
    this.toggleScreen('canvas', true);
    this.toggleScreen('start-screen', false);
    this.toggleScreen('victory-screen', false);
    this.toggleScreen('gameover-screen', false);
    document.getElementById('death-count').innerHTML = 'Deaths:' + deaths;

    //Player is on ground, apply friction
    if(p1.jump == false) {
        p1.x_v *= friction;
    
    //else apply gravity
    } else {
        p1.y_v += gravity;
    }
    p1.jump = true;
   
    //Movement Left
    if(controls.left) {
        p1.x_v = -2.5;
    }
    
    //Movement Right
    if(controls.right) {
        p1.x_v = 2.5
    }
    
    //Updating the players position
    p1.y += p1.y_v;
    p1.x += p1.x_v
   
    //COLLISION CODE
    let i = -1;
    if(platforms[0].x < p1.x && p1.x < platforms[0].x + platforms[0].width && platforms[0].y < p1.y && p1.y < platforms[0].y + platforms[0].height) {
        i = 0;
    }
    if(platforms[1].x < p1.x && p1.x < platforms[1].x + platforms[1].width && platforms[1].y < p1.y && p1.y < platforms[1].y + platforms[1].height) {
        i = 1;
    }
    if(platforms[2].x < p1.x && p1.x < platforms[2].x + platforms[2].width && platforms[2].y < p1.y && p1.y < platforms[2].y + platforms[2].height) {
        i = 2;
    }
    if(platforms[3].x < p1.x && p1.x < platforms[3].x + platforms[3].width && platforms[3].y < p1.y && p1.y < platforms[3].y + platforms[3].height) {
        i = 3;
    }
    if(platforms[4].x < p1.x && p1.x < platforms[4].x + platforms[4].width && platforms[4].y < p1.y && p1.y < platforms[4].y + platforms[4].height) {
        i = 4;
    }
    if(platforms[5].x < p1.x && p1.x < platforms[5].x + platforms[5].width && platforms[5].y < p1.y && p1.y < platforms[5].y + platforms[5].height) {
        i = 5;
    }
    if(platforms[6].x < p1.x && p1.x < platforms[6].x + platforms[6].width && platforms[6].y < p1.y && p1.y < platforms[6].y + platforms[6].height) {
        i = 6;
        winGame();
    }
    if(i > -1) {
        p1.jump = false;
        p1.y = platforms[i].y
    }
    if(lava1[0].x < p1.x && p1.x < lava1[0].x + lava1[0].width && lava1[0].y < p1.y && p1.y < lava1[0].y + lava1[0].height) {
        resetPosition();
    }
    if(deaths >= 5) {
        stopGame();
    }
    
    //Everything being rendered
    renderCanvas();
    renderLava();
    renderBackWall();
    renderPlayer();
    renderPlatform();
    
}

//Game over scenario
function stopGame() {
    clearInterval(interval)
    this.toggleScreen('start-screen', false)
    this.toggleScreen('victory-screen', false)
    this.toggleScreen('canvas', false);
    this.toggleScreen('gameover-screen', true);
}

//Victory scenario
function winGame() {
    clearInterval(interval);
    this.toggleScreen('start-screen', false)
    this.toggleScreen('canvas', false);
    this.toggleScreen('gameover-screen', false)
    this.toggleScreen('victory-screen', true)
}

function startScreen() {
    this.toggleScreen('start-screen', true)
    this.toggleScreen('canvas', false)
    this.toggleScreen('gameover-screen', false)
    this.toggleScreen('victory-screen', false)
}

//Event Listeners
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

var interval = setInterval(startGame, 17)

startScreen();
createPlatform();
createBackWall();
createLava();