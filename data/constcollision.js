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