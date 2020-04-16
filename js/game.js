
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1d212d',
    pixelArt: false,
    scene: [Menu,Scene2],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
        },
        matter: {
            gravity: { y: 0.5 }
        },
    },
}

const game = new Phaser.Game(config)
