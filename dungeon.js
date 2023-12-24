const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
//создание массива с границами
const collisionmap = []
for (let i = 0; i < collision.length; i+=104 ){
    collisionmap.push(collision.slice(i, 104 + i))
}

class Boundary {
    constructor({position}){
        this.position = position
        this.width = 64
        this.height = 64
    }
    draw(){
        ctx.fillStyle ='red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
//просматривание 2d массива
collisionmap.forEach((row, i) => {
    row.forEach((symbo, j) =>{
        if (symbo === 101)
            boundaries.push(
                new Boundary({
                    position:{
                        x: j * 64 + (-320),
                        y: i * 64 + (-320)
                    }
                })
            )
    })
})

const image = new Image()
image.src = './img/map.png'

const playerImage = new Image()
playerImage.src = './img/pleft.png'

//Общий класс
class Sprite {
    constructor({position, velocity, image, frames = { max: 1 }}){
        this.position = position
        this.image = image
        this.frames = frames
        this.image.onload = () =>{
            this.width = this.image.width / this.frames.max
            this.height = this.image.height 
        }
    }
    draw(){
        ctx.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height ,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
    }

}

const player = new Sprite({
    position: {
        x: 1024 / 2 - 64,
        y: 576 / 2
    },
    image: playerImage,
    frames: {
        max: 4
    }
})
//задний фон
const background = new Sprite({
    position: {
        x: -320,
        y: -320
    },
    image: image
})
//нажата ли кнопка
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}

const movingobjects = [background, ...boundaries]

function rectangularCollision({rectangle1, rectangle2,}){
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

//анимация 
function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach((boundary) => {
        boundary.draw()
    })
    player.draw()
    let moving = true

    if (keys.w.pressed && lastkey ==='w') {
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 4
                    }
                }
            })
            ) {console.log('false')}
                moving = false
            break
            }

        if (moving){
            {console.log('true')}
            movingobjects.forEach((movingobjects) => {
                movingobjects.position.y += 4
        })}
    }
    else if (keys.s.pressed && lastkey ==='s'){
        movingobjects.forEach((movingobjects) => {
            movingobjects.position.y -= 4
        })
    }
    else if (keys.d.pressed && lastkey ==='d'){
        movingobjects.forEach((movingobjects) => {
            movingobjects.position.x -= 4
        })
    }
    else if (keys.a.pressed && lastkey ==='a'){
        movingobjects.forEach((movingobjects) => {
            movingobjects.position.x += 4
        })
    }
}
//управление
lastkey = ''
window.addEventListener('keydown', (e) =>{
    switch (e.key){
        case 'w':
            keys.w.pressed = true
            lastkey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastkey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastkey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastkey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
      case 'w':
        keys.w.pressed = false
        break
      case 'a':
        keys.a.pressed = false
        break
      case 's':
        keys.s.pressed = false
        break
      case 'd':
        keys.d.pressed = false
        break
    }
  })

  animate()
//     if (event.key === 'a') {
//         PLAYER.x -= PLAYER.xDirection;
//         keys.a.pressed = true
//     }
//     if (event.key === 'd') {
//         PLAYER.x += PLAYER.xDirection;
//         keys.d.pressed = true
//         }
//     if (event.key === 'w') {
//         PLAYER.y -= PLAYER.yDirection;
//         keys.w.pressed = true
//     }
//     if (event.key === 's') {
//         PLAYER.y += PLAYER.yDirection;
//         keys.s.pressed = true
//     }
// }
// function onCanvasKeyUp(event) {
//     if (event.key === 'a') {
//         keys.a.pressed = false
//     }
//     if (event.key === 'd') {
//         keys.d.pressed = false
//         }
//     if (event.key === 'w') {
//         keys.w.pressed = false
//     }
//     if (event.key === 's') {
//         keys.s.pressed = false
//     }
// }

// initEventsListenersPlayer()

// function Play(){
//     // ctx.clearRect(0, 0, 1024, 576);
//     animate();
//     requestAnimationFrame(Play)
//     // drawAnimation();

// }
// Play()
// initAnimation();