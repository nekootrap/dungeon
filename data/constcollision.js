//создание массива с границами
const collisionmap = []
for (let i = 0; i < collision.length; i+=104 ){
    collisionmap.push(collision.slice(i, 104 + i))
}

const trapdoormap = []
for (let i = 0; i < trapdoors.length; i+=104 ){
    trapdoormap.push(trapdoors.slice(i, 104 + i))
}

const keysmap = []
for (let i = 0; i < keysm.length; i+=104 ){
    keysmap.push(keysm.slice(i, 104 + i))
}

const doormap = []
for(let i = 0; i < doors.length; i+=104){
    doormap.push(doors.slice(i, 104 + i))
}

//просматривание 2d массива
const boundaries = []
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

const keyImage = new Image()
keyImage.src = './img/keys.png'

const interKeyImg = new Image()
interKeyImg.src = './img/interkey.png'

const interkey = new Objects({
    position:{
        x: 20,
        y: 20
    },
    image: interKeyImg,
})

const interkeyininventory = new Objects({
    position:{
        x: 20,
        y: 20
    },
    image: keyImage,
})

const keys = []
keysmap.forEach((row, i) => {
    row.forEach((symbo, j) =>{
        if (symbo === 100)
            keys.push(
                new Objects({
                    position:{
                        x: j * 64 + (-320),
                        y: i * 64 + (-320)
                    },
                    image: keyImage,
                })
            )
    })
})

const keyscollision = []
keys.forEach((key) => {
        keyscollision.push(false)
})

const doorImages = [new Image(), new Image(), new Image(), new Image()]
const doornums = [37, 38, 47, 57]
doorImages.forEach((image, imageIndex) => {
    image.src = './img/door' + doornums[imageIndex] + '.png'
})
const doors_arr = []
doormap.forEach((row, i) => {
    row.forEach((symbo, j) =>{
        if (doornums.includes(symbo))
            doors_arr.push(
                new Objects({
                    position:{
                        x: j * 64 + (-320),
                        y: i * 64 + (-320)
                    },
                    image: doorImages[doornums.indexOf(symbo)],
                })
            )
    })
})

const doorCollisions = []
doors_arr.forEach((door)=>{
    doorCollisions.push(false)
})