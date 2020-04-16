class Menu extends Phaser.Scene {
    constructor (){
        super ("Menu")
    }

    preload (){
        this.load.image("background","../assets/images/menubackground.PNG")
        this.load.image("title","../assets/images/titlefont.png")
        this.load.image("click","../assets/images/ClicktoStart.png")
        this.load.audio("titleMusic", "../assets/audio/Secret of Evermore - Greek Temple.mp3")
        this.load.audio("startgameclip", "../assets/audio/startgameclip.mp3")

    
        let loadingBar = this.add.graphics({
            fillstyle: {color:0xffffff}
        })
        
        this.load.on("progress",(percent) => {
            loadingBar.fillRect(0, this.game.renderer.height/2, this.game.renderer.width*percent, 50)
        })
    
        this.load.on("complete", ()=>{})
    }

    create (){
        this.add.image(config.width/2,config.height/4,"title").setDepth(1).setScale(.75)
        this.add.image(0,0,"background").setOrigin(0)
        
        this.titletheme=this.sound.add("titleMusic", {volume:.10})
        this.titletheme.play({loop:true},)
        
        
        let playButton = this.add.image(config.width/2,config.height/1.5,"click").setDepth(2).setScale(.35).setInteractive()

        playButton.on('pointerover', function (pointer){
            this.setTint(0xF1F1F1,{opacity:5})
        })
        playButton.on('pointerout', function (pointer) {
            this.clearTint();
        });
        playButton.on('pointerup', function (pointer) {
            // this.clearTint()
            this.scene.start("playGame")
            this.sound.play("startgameclip", {volume:.5})
        }, this);
    }
}