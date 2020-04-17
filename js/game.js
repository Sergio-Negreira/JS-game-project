
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
    canvas: document.querySelector('canvas')
}

const game = new Phaser.Game(config)

var canvas = document.getElementById("canvas")
var img1 = loadImage('./assets/images/arcade box.png',main)
var imagesLoaded = 0;

img1.setAttribute('crossOrigin', 'anonymous');
function main() {
    imagesLoaded += 1;

    if(imagesLoaded == 2) {
        // composite now
        ctx.drawImage(img1, 0, 0);
        //ctx.globalAlpha = 0.5;
        ctx.drawImage(img2, 0, 0);
				ctx.font = "30px Comic Sans MS";
				ctx.fillStyle = "white";
				ctx.textAlign = "center";
				ctx.fillText("Hello World", 256,256);
				//canvas.height-10
    }
}
function loadImage(src, onload) {
    var img = new Image();
    img.onload = onload;
    img.src = src;
    return img;
}