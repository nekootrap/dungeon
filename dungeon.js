const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
//создание массива с границами
const collisionmap = []
for (let i = 0; i < collision.length; i+=104 ){
    collisionmap.push(collision.slice(i, 104 + i))
}

const trapdoormap = []
for (let i = 0; i < trapdoors.length; i+=104 ){
    trapdoormap.push(trapdoors.slice(i, 104 + i))
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

const trapdoor = []
trapdoormap.forEach((row, i) => {
    row.forEach((symbo, j) =>{
        if (symbo === 39)
            trapdoor.push(
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

const playerRightImage = new Image()
playerRightImage.src = './img/pright.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/pleft.png'


const player = new Sprite({
    position: {
        x: 1024 / 2 - 64,
        y: 576 / 2
    },
    image: playerRightImage,
    frames: {
        max: 4
    },
    sprites: {
        right: playerRightImage,
        left: playerLeftImage
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

const movingobjects = [background, ...boundaries, ...trapdoor]

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
    trapdoor.forEach((trdoor1) => {
        trdoor1.draw()
    })
    player.draw()
    let moving = true
    player.moving = false
    let trapdoorcollision1 = false
    let trapdoorcollision2 = false
    const trdoor1 = trapdoor[0]
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
            trdoor1, 
            position: {
                x: trdoor1.position.x,
                y: trdoor1.position.y
            }
        }
    })
    ) {
        console.log('ddd')
        trapdoorcollision1 = true
    }
    if (trapdoorcollision1){
        movingobjects.forEach((movingobjects) => {
            movingobjects.position.x -= 200
    })
}

    const trdoor2 = trapdoor[1]
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
            trdoor2, 
            position: {
                x: trdoor2.position.x,
                y: trdoor2.position.y
            }
        }
    })
    ) {
        trapdoorcollision2 = true
    }
    if (trapdoorcollision2){
            movingobjects.forEach((movingobjects) => {
                movingobjects.position.x += 200
        })
    }
        
    if (keys.w.pressed && lastkey ==='w') {
        player.moving = true
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
            ) {
                moving = false
                break
            }
        }

        if (moving){
            movingobjects.forEach((movingobjects) => {
                movingobjects.position.y += 4
        })}
    }
    else if (keys.s.pressed && lastkey ==='s'){
        player.moving = true
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 4
                    }
                }
            })
            ) 
            {moving = false
            break}
        }

        if (moving){
            movingobjects.forEach((movingobjects) => {
                movingobjects.position.y -= 4
        })}
    }
    else if (keys.d.pressed && lastkey ==='d'){
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x - 4,
                        y: boundary.position.y 
                    }
                }
            })
            ) 
            {moving = false
            break}
        }

        if (moving){
            movingobjects.forEach((movingobjects) => {
                movingobjects.position.x -= 4
        })}
    }
    else if (keys.a.pressed && lastkey ==='a'){
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x + 4,
                        y: boundary.position.y 
                    }
                }
            })
            ) 
            {moving = false
            break}
        }

        if (moving){
            movingobjects.forEach((movingobjects) => {
                movingobjects.position.x += 4
        })}
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