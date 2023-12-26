const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const image = new Image()
image.src = './img/map.png'

const menuImage = new Image()
menuImage.src = './img/mapover.png'

const restartImage = new Image()
restartImage.src = './img/reset1.png'

const peaksImage = new Image()
peaksImage.src = './img/peaks.png'

const torchImage = new Image()
torchImage.src = './img/torch.png'

const playerRightImage = new Image()
playerRightImage.src = './img/pright.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/pleft.png'

const animkeyImage = new Image()
animkeyImage.src = './img/animkey.png'

const HeardImage = new Image()
HeardImage.src = './img/heard.png'

const coinImage = new Image()
coinImage.src = './img/coin.png'

var audio = new Audio()
audio.src = "./sound/metamorphosis.mp3"

  

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

const Peaks = new Objects({
    position: {
        x: 200,
        y: 200
    },
    image: peaksImage,
    frames: {
        max: 16
    }
})

const Coin = new Objects({
    position: {
        x: 640,
        y: 2112
    },
    image: coinImage,
    frames: {
        max: 4
    },
    speed: 10
})

const coins = [Coin]

const Keys = new Objects({
    position: {
        x: 200,
        y: 200
    },
    image: animkeyImage,
    frames: {
        max: 4
    }
})

const Torch = new Objects({
    position: {
        x: 200,
        y: 200
    },
    image: torchImage,
    frames: {
        max: 4
    }
})

const Heard = new Objects({
    position: {
        x: 930,
        y: 30
    },
    image: HeardImage,
    frames: {
        max: 5,
        val: 0
    }
})

const restart = new Objects({
    position: {
        x: 390,
        y: 350
    },
    image: restartImage,
})


player.keys = 0
player.score = 0
player.hp = 0
//задний фон
const background = new Sprite({
    position: {
        x: -320,
        y: -320
    },
    image: image
})
const gameover = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: menuImage
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

const movingobjects = [background, ...boundaries, ...trapdoor, ...keys, ...doors_arr, ...peaks, ...torch, Coin]

function rectangularCollision({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.width - 4 >= rectangle2.position.x &&
        rectangle1.position.x + 4 <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + 4 <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height - 4 >= rectangle2.position.y
    )
}
var ontime 

//анимация
function animate(){
    if (player.hp <= 4 && coins.length != 0){
        window.requestAnimationFrame(animate)
    }
    if (player.hp > 4 ){
        ctx.clearRect(0, 0, 1024, 576)
        gameOver()
        return
    }
    if (coins.length === 0){
        ctx.clearRect(0, 0, 1024, 576)
        gameWin()
        return
    }
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: Coin
    })){if (doors_arr.length === 0){coins.splice(0, coins.length)}
    }
    background.draw()
    audio.play()
    
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

    Coin.moving = true
    Coin.draw()

    var tiime = startTimer()
    ontime = tiime


    for (let i = 0; i < torch.length; i++){
        let torch1 = torch[i]
        Torch.position.x = torch1.position.x
        Torch.position.y = torch1.position.y
        Torch.draw()
    }
    for (let i = 0; i < peaks.length; i++){
        let peaks1 = peaks[i]
        Peaks.position.x = peaks1.position.x
        Peaks.position.y = peaks1.position.y
        Peaks.draw()
    }
    player.draw()
    Peaks.moving = true
    Torch.moving = true
    let moving = true
    let movingpeaks = true
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
                }
            }
        } 
    }


    player.draw()
    Keys.moving = true
    keys.forEach((key, keyindex) => {
        let keys1 = keys[keyindex]
        Keys.position.x = keys1.position.x
        Keys.position.y = keys1.position.y
        Keys.draw()
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
            player.score += 1
            Keys.speed -= 20
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
    let movingdoor = true
      
    if (keyss.w.pressed && lastkey ==='w' ) {
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

        for (let i = 0; i < peaks.length; i++){
            let peaks1 = peaks[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...peaks1, 
                    position: {
                        x: peaks1.position.x,
                        y: peaks1.position.y + 4
                    }
                }
            })){
                movingpeaks = false 
                player.hp += 1
                Heard.frames.val = player.hp
                break    
            }
        }
        for (let z = 0; z < doors_arr.length; z++) {
            let door = doors_arr[z]
            if (rectangularCollision({
                rectangle1 : player,
                rectangle2: {
                    ...door,
                    position: {
                        x: door.position.x,
                        y: door.position.y + 4
                    }
                }
            })){
                if (player.keys <= 0){
                    movingdoor = false
                    break
            }
        }}

        if (moving && movingpeaks && movingdoor){
            movingobjects.forEach((movingobjects) => {
                movingobjects.position.y += 4
        })}
        if (!movingpeaks){
            movingobjects.forEach((movingobjects) => {
                movingobjects.position.y -= 50
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

        for (let i = 0; i < peaks.length; i++){
            let peaks1 = peaks[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...peaks1, 
                    position: {
                        x: peaks1.position.x,
                        y: peaks1.position.y - 4
                    }
                }
            })){
                movingpeaks = false  
                player.hp += 1
                Heard.frames.val = player.hp
                break    
            }
        }
        for (let z = 0; z < doors_arr.length; z++) {
            let door = doors_arr[z]
            if (rectangularCollision({
                rectangle1 : player,
                rectangle2: {
                    ...door,
                    position: {
                        x: door.position.x,
                        y: door.position.y - 4
                    }
                }
            })){
                if (player.keys <= 0){
                    movingdoor = false
                    break
            }
        }}

        if (moving && movingpeaks && movingdoor){
            movingobjects.forEach((movingobjects) => {
                movingobjects.position.y -= 4
        })}
        if (!movingpeaks){
            movingobjects.forEach((movingobjects) => {
                movingobjects.position.y += 50
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
        for (let i = 0; i < peaks.length; i++){
            let peaks1 = peaks[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...peaks1, 
                    position: {
                        x: peaks1.position.x - 4,
                        y: peaks1.position.y
                    }
                }
            })){
                movingpeaks = false   
                player.hp += 1
                Heard.frames.val = player.hp
                break    
            }
        }
        for (let z = 0; z < doors_arr.length; z++) {
            let door = doors_arr[z]
            if (rectangularCollision({
                rectangle1 : player,
                rectangle2: {
                    ...door,
                    position: {
                        x: door.position.x - 4,
                        y: door.position.y
                    }
                }
            })){
                if (player.keys <= 0){
                    movingdoor = false
                    break
            }
        }}

        if (moving && movingpeaks && movingdoor){
            movingobjects.forEach((movingobjects) => {
                movingobjects.position.x -= 4
        })}
        if (!movingpeaks){
            movingobjects.forEach((movingobjects) => {
                movingobjects.position.x += 50
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
        for (let z = 0; z < doors_arr.length; z++) {
            let door = doors_arr[z]
            if (rectangularCollision({
                rectangle1 : player,
                rectangle2: {
                    ...door,
                    position: {
                        x: door.position.x + 4,
                        y: door.position.y
                    }
                }
            })){
                if (player.keys <= 0){
                    movingdoor = false
                    break
            }
        }}

        for (let i = 0; i < peaks.length; i++){
            let peaks1 = peaks[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...peaks1, 
                    position: {
                        x: peaks1.position.x + 4,
                        y: peaks1.position.y
                    }
                }
            })){
                movingpeaks = false  
                player.hp += 1
                Heard.frames.val = player.hp 
                break    
            }
        }

        if (moving && movingpeaks && movingdoor){
            movingobjects.forEach((movingobjects) => {
                movingobjects.position.x += 4
        })}
        if (!movingpeaks){
            movingobjects.forEach((movingobjects) => {
                movingobjects.position.x -= 50
        })}
    }
    interkey.draw()
    if (player.keys === 1 ) interkeyininventory.draw()
    Heard.draw()
}
//управление
lastkey = ''
window.addEventListener('keydown', (e) =>{
    switch (e.key){
        case 'w':
            keyss.w.pressed = true
            lastkey = 'w'
            break
        case 'ц':
            keyss.w.pressed = true
            lastkey = 'w'
            break
        case 'a':
            keyss.a.pressed = true
            lastkey = 'a'
            break
        case 'ф':
            keyss.a.pressed = true
            lastkey = 'a'
            break
        case 's':
            keyss.s.pressed = true
            lastkey = 's'
            break
        case 'ы':
            keyss.s.pressed = true
            lastkey = 's'
            break
        case 'd':
            keyss.d.pressed = true
            lastkey = 'd'
            break
        case 'в':
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
      case 'ц':
        keyss.w.pressed = false
        break
      case 'a':
        keyss.a.pressed = false
        break
       case 'ф':
        keyss.a.pressed = false
        break
      case 's':
        keyss.s.pressed = false
        break
        case 'ы':
            keyss.s.pressed = false
            break
      case 'd':
        keyss.d.pressed = false
        break
        case 'в':
            keyss.d.pressed = false
            break
    }
  })
  function Restart(){
    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        };
    }

    function isInside(pos, rect) {
        return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
    }
    canvas.addEventListener('click', function(evt) {
        var mousePos = getMousePos(canvas, evt);
    
        if (isInside(mousePos, rect)) {
        window.document.location.reload();
        } 
    }, false);

    var rect = {
        x: restart.position.x,
        y: restart.position.y,
        width: 264,
        height: 104,
    };
    function Playbutton() {
        ctx.beginPath();
        ctx.closePath();
    }
    Playbutton(rect);
  
}

function gameWin(){
    gameover.draw()
    restart.draw()
    Restart()
    ctx.fillStyle = 'white';
    ctx.font = "bold 40px Papyrus";
    ctx.fillText(ontime, 460, 300);
    ctx.fillStyle = 'white';
    ctx.font = "bold 87px Papyrus";
    ctx.fillText('GAME WIN', 220, 576 / 4 + 50);
}

function gameOver(){
    gameover.draw()
    restart.draw()
    Restart()
    ctx.fillStyle = '#CDBECD ';
    ctx.font = "bold 87px Papyrus";
    ctx.fillText('GAME OVER', 190, 576 / 4 + 50);
}

var sec, now, timer, mins = 0
var timerr
now = Date.now()
function startTimer() {
    sec = Math.floor((Date.now() - now)/1000)
    if(sec == 60 ){
        now = Date.now()
        mins++
        if (mins < 10){
            mins = '0' + mins
        }
    }
    if(sec < 10){
        sec = '0' + sec
    }
    if (mins === 0){
        mins = '0' + mins
    }
    timerr = mins + ':' + sec
    ctx.fillStyle = 'white'
    ctx.font = "bold 20px Papyrus"
    ctx.fillText(timerr, 10, 550)
    return timerr
}



animate()