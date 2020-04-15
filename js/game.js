// import Phaser from './phaser.js'
// import Scene1 from Scene1

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1d212d',
    pixelArt: false,
    scene: [Scene2],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
        },
        matter: {
            debug: true,
            gravity: { y: 0.5 }
        },
    },
}

const game = new Phaser.Game(config)
