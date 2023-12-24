function onCanvasKeyDown(event) {
    if (event.key === 'a') {
        background.position.x += 8
        PLAYER.x -= PLAYER.xDirection;
    }
    if (event.key === 'd') {
        background.position.x -= 5
        PLAYER.x += PLAYER.xDirection;
        }
    if (event.key === 'w') {
        PLAYER.y -= PLAYER.yDirection;
        background.position.y -= 8
    }
    if (event.key === 's') {
        PLAYER.y += PLAYER.yDirection;
        background.position.y += 8
    }
}