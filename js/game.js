// import Phaser from './phaser.js'
// import Scene1 from Scene1

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1d212d',
    pixelArt: false,
    scene: [Scene1],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 }
        }
    },
    debuger: true
}

const game = new Phaser.Game(config)
