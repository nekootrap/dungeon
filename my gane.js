const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

ctx.fillStyle = 'blue'
ctx.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = './img/map.png'

