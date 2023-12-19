var GAME = {
    width: 1024,
    height: 576,
    background: 'Linen',
}

var PLAYER = {
    x: 100,
    y: 620,
    width: 16,
    height: 16,
    xDirection: 5,
    yDirection: 5,
}


var canvas = document.getElementById('canvas');
canvas.width = GAME.width;
canvas.height = GAME.height;
var ctx = canvas.getContext('2d');


function drawBackground(){
    ctx.fillStyle = GAME.background;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
}

ctx.drawImage('./img/map.png')

function drawPlayer(){
    ctx.fillStyle = 'black';
    ctx.fillRect(PLAYER.x, PLAYER.y, PLAYER.width, PLAYER.height);
}

function onCanvasKeyDown(event) {
    if (event.key === 'ArrowLeft') {
        PLAYER.x -= PLAYER.xDirection;
    }
    if (event.key === 'ArrowRight') {
        PLAYER.x += PLAYER.xDirection;
    }
    if (event.key === 'ArrowUp') {
        PLAYER.y -= PLAYER.yDirection;
    }
    if (event.key === 'ArrowDown') {
        PLAYER.y += PLAYER.yDirection;
    }
    if (PLAYER.x < 0) {
        PLAYER.x = 0;
    }
    if (PLAYER.x + PLAYER.width > GAME.width) {
        PLAYER.x = GAME.width - PLAYER.width;
    }
    if (PLAYER.y < 0) {
        PLAYER.y = 0;
    }
    if (PLAYER.y + PLAYER.height > GAME.height) {
        PLAYER.y = GAME.height - PLAYER.height;
    }
}

function drawFrame(){
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawPlayer();
    initEventsListeners();
}


function initEventsListeners() {
    window.addEventListener('keydown', onCanvasKeyDown);
}

function play(){
    drawFrame();
    requestAnimationFrame(play);
}

play();