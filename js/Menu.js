class Menu extends Phaser.Scene {
    constructor (){
        super ({
            key:"Menu"
        })
    }

    preload (){
        this.preload.image("background gif?","location")
    }

    create (){
        let background = this.add.sprite(0,0,'key')
    }
}