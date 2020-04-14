class Scene2 extends Phaser.Scene {
    constructor(){
        super("Level 2")
    }

    create (){
        this.add.text(20,20, "Playing game!", {background:'black'})
    }




}