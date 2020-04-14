// import Phaser from './phaser.js'
// import Scene1 from Scene1

const config = {
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    pixelArt: false,
    scene: Scene1,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 }
        }
    }
}

const game = new Phaser.Game(config)
