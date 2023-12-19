const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

ctx.fillStyle = 'blue'
ctx.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = './img/map.png'

var PLAYER = {
    x: canvas.width / 4 - 64 / 2,
    y: canvas.height / 2 - 64 / 2,
    xDirection: 5,
    yDirection: 5,
    width: 64,
    height: 64
}

var ANIMATION = {
    img: new Image(),
    imgIsLoad: false,
    count: 0,
    explosion: false,
    size: 64
}

function initAnimation() {
    ANIMATION.img.src = "./img/pleft.png";
    ANIMATION.img.onload = () => {
        ANIMATION.imgIsLoad = true;
    }
  
} 

function drawAnimation() {
    if (ANIMATION.imgIsLoad && ANIMATION.explosion) {
        ctx.drawImage(
            ANIMATION.img,
            ANIMATION.count * ANIMATION.size,
            0,
            PLAYER.width,
            PLAYER.height,
            PLAYER.x - 32,
            PLAYER.y - 32,
            64,
            64
        )
    };
    if (ANIMATION.count === 9) {
        ANIMATION.count = 0;
        ANIMATION.explosion = false;
    };
}

 
function drawPlayer(){
    ctx.drawImage(image, 0, 0)
    if (ANIMATION.imgIsLoad) {
        ctx.drawImage(
            ANIMATION.img,
            ANIMATION.count * ANIMATION.size,
            0,
            PLAYER.width,
            PLAYER.height,
            PLAYER.x - 32,
            PLAYER.y - 32,
            64,
            64
        )
    }
}

function initEventsListenersPlayer() {
    window.addEventListener('keydown', onCanvasKeyDown);
}



function onCanvasKeyDown(event) {
    if (event.key === 'ArrowLeft') {
        PLAYER.x -= PLAYER.xDirection;
        ANIMATION.explosion = true;
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
    if (PLAYER.x + PLAYER.width > canvas.width) {
        PLAYER.x = canvas.width - PLAYER.width;
    }
    if (PLAYER.y < 0) {
        PLAYER.y = 0;
    }
    if (PLAYER.y + PLAYER.height > canvas.height) {
        PLAYER.y = canvas.height - PLAYER.height;
    }
}

initEventsListenersPlayer()

function Play(){
    drawPlayer();
    requestAnimationFrame(Play)
    drawAnimation();

}
Play()
initAnimation();