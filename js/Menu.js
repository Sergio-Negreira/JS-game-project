class Menu extends Phaser.Scene {
    constructor (){
        super ("Menu")
    }

    preload (){
        this.load.image("background","./assets/images/menubackground.PNG")
        this.load.image("title","./assets/images/titlefont.png")
        this.load.image("click","./assets/images/ClicktoStart.png")
        this.load.audio("titleMusic", "./assets/audio/Lucy In Disguise - Echoes In Time.mp3")
        this.load.audio("startgameclip", "./assets/audio/startgameclip.mp3")

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        loadingText.setOrigin(0.5, 0.5);
        this.load.on('progress', function (value) {
            console.log(value);
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            });
    }

    create (){
        this.add.image(config.width/2,config.height/4,"title").setDepth(1).setScale(.75)
        this.add.image(0,0,"background").setOrigin(0)
        
        this.titletheme=this.sound.add("titleMusic", {volume:.25})
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
            this.sound.play("startgameclip", {volume:2})
        }, this);
    }
}

