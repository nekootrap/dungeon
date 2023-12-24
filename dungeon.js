const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

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
player.keys = 0
//задний фон
const background = new Sprite({
    position: {
        x: -320,
        y: -320
    },
    image: image
})
//нажата ли кнопка
const keyss = {
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

const movingobjects = [background, ...boundaries, ...trapdoor, ...keys, ...doors_arr]

function rectangularCollision({rectangle1, rectangle2}){
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
    trapdoor.forEach((trdoor) => {
        trdoor.draw()
    })
    keys.forEach((keyy) => {
        keyy.draw()
    })
    doors_arr.forEach((dooor) => {
        dooor.draw()
    })
    player.draw()
    let moving = true
    player.moving = false

    for (let z = 0; z < doors_arr.length; z++) {
        let door = doors_arr[z]
        if (rectangularCollision({
            rectangle1 : player,
            rectangle2: {
                ...door,
                position: {
                    x: door.position.x,
                    y: door.position.y
                }
            }
        })) {
            if (player.keys > 0) {
                
                let neighbour
                for (let i = 0; i < doors_arr.length; i++) {
                    let door2 = doors_arr[i]
                    if (door2 != door) {
                        if (door.image === doorImages[2] || door.image === doorImages[3]) {
                            if (door2.position.x === door.position.x) {
                                neighbour = door2
                                break
                            }
                        }else if (door.image === doorImages[0] || door.image === doorImages[1]) {
                            if (door2.position.y === door.position.y) {
                                neighbour = door2
                                break
                            }
                        }
                    }
                }
                
                if (neighbour) {
                    doors_arr.splice(z, 1)
                    doors_arr.splice(doors_arr.indexOf(neighbour), 1)
                    doorCollisions.splice(z, 1)
                    doorCollisions.splice(doors_arr.indexOf(neighbour), 1)
                    player.keys -= 1
                    console.log(player.keys)
                }
            }
            if (player.keys <= 0){
                // !!!!!!СМЕРТЕЛЬНЫЙ ФАЙЛ!!!!!!
                // moving = false
                // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (door.image === doorImages[2] || door.image === doorImages[3]) {
                    movingobjects.forEach((movingobjects) => {
                        movingobjects.position.x += 4
                    })
                } else {
                    movingobjects.forEach((movingobjects) => {
                        movingobjects.position.y += 4
                    })}
            }
        } 
    }
    
    keys.forEach((key, keyindex) => {
        if (rectangularCollision({
            rectangle1: player,
            rectangle2: {
                ...key, 
                position: {
                    x: key.position.x,
                    y: key.position.y
                }
            }
        })
        ) {
            console.log('Keys: ' + player.keys)
            keyscollision[keyindex] = true
            keys.splice(keyindex, 1)
            player.keys += 1
            keyscollision.splice(keyindex, 1)
        }

        
    })

    let trapdoorcollision1 = false
    let trapdoorcollision2 = false

    for (let i = 0; i < trapdoor.length; i++){
        const trdoor1 = trapdoor[0]
        if (rectangularCollision({
            rectangle1: player,
            rectangle2: {
                ...trdoor1, 
                position: {
                    x: trdoor1.position.x,
                    y: trdoor1.position.y
                }
            }
        })
    ) {
            trapdoorcollision1 = true
            break
    }
    const trdoor2 = trapdoor[1]
        if (rectangularCollision({
            rectangle1: player,
            rectangle2: {
                ...trdoor2, 
                position: {
                    x: trdoor2.position.x,
                    y: trdoor2.position.y
                }
            }
        })
    ) {
            trapdoorcollision2 = true
            break
    }
    }
    
    if (trapdoorcollision1){
        movingobjects.forEach((movingobjects) => {
            movingobjects.position.x -= 400
            movingobjects.position.y -= 50
    })
}
    if (trapdoorcollision2){
        movingobjects.forEach((movingobjects) => {
            movingobjects.position.x += 400
            movingobjects.position.y -= 50
    })
}

    
        
    if (keyss.w.pressed && lastkey ==='w') {
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
    else if (keyss.s.pressed && lastkey ==='s'){
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
    else if (keyss.d.pressed && lastkey ==='d'){
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
    else if (keyss.a.pressed && lastkey ==='a'){
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
    ctx.fillStyle = 'white';
    ctx.font = "bold 38px serif";
    ctx.fillText('keys: ' + player.keys, 20, 50);
}
//управление
lastkey = ''
window.addEventListener('keydown', (e) =>{
    switch (e.key){
        case 'w':
            keyss.w.pressed = true
            lastkey = 'w'
            break
        case 'a':
            keyss.a.pressed = true
            lastkey = 'a'
            break
        case 's':
            keyss.s.pressed = true
            lastkey = 's'
            break
        case 'd':
            keyss.d.pressed = true
            lastkey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
      case 'w':
        keyss.w.pressed = false
        break
      case 'a':
        keyss.a.pressed = false
        break
      case 's':
        keyss.s.pressed = false
        break
      case 'd':
        keyss.d.pressed = false
        break
    }
  })

  animate()