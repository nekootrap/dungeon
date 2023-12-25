//Общий класс
class Sprite {
    constructor({position, image = {width, height}, frames = { max: 1 }, sprites}){
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}
        this.image.onload = () =>{
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = false
        this.sprites = sprites
    }
    draw(){
        ctx.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height ,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
        if (!this.moving) return
        if (this.frames.max > 1 ){
            this.frames.elapsed++
        }
        if (this.frames.elapsed % 10 === 0){
            if (this.frames.val < this.frames.max - 1) this.frames.val++
        else this.frames.val = 0
        }
    }
}

class Boundary {
    constructor({position}){
        this.position = position
        this.width = 64
        this.height = 64
    }
    draw(){
        ctx.fillStyle ='rgba(255, 0, 0, 0)'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Objects {
    constructor({position, image, frames = { max: 1, val: 0 }, moving, speed = 300 }){
        this.frames = {...frames, val: 0, elapsed: 0}
        this.position = position
        this.image = image
        this.moving = moving
        this.speed = speed
        
        this.width = 64
        this.height = 64
        
    }
    draw(){
        ctx.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height ,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
        if (!this.moving) return
        if (this.frames.max > 1 ){
            this.frames.elapsed++
        }
        if (this.frames.elapsed % this.speed === 0){
            if (this.frames.val < this.frames.max - 1) this.frames.val++
        else this.frames.val = 0
        }
        
    }
}
