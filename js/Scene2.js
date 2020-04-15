class Scene2 extends Phaser.Scene {

    preload() {
        this.load.spritesheet("player","../assets/spritesheets/0x72-industrial-player-32px-extruded.png",
          {
            frameWidth: 32,
            frameHeight: 32,
            margin: 1,
            spacing: 2
          }
        );
        this.load.image("spike", "../assets/images/0x72-industrial-spike.png");
        this.load.image("tiles", "../assets/tilesets/0x72-industrial-tileset-32px-extruded.png");
        this.load.tilemapTiledJSON("map", "../assets/tilemaps/singlemap.json");
      }
      platFall(sprite,tile, fallingPlats){
        setTimeout(()=>{
          window.tile=tile
          setInterval(()=>{
            fallingPlats.y++
          }, 35)
          console.log(sprite,tile, fallingPlats)
        }, 500)
      }
      create() {
        this.isPlayerDead = false;
        
        const map = this.make.tilemap({ key: "map" });
        const tiles = map.addTilesetImage("0x72-industrial-tileset-32px-extruded", "tiles");
        //vars for different layers in Tiled map
        this.backgroundLayer = map.createDynamicLayer("Background", tiles);
        this.groundLayer = map.createDynamicLayer("Ground", tiles);
        this.fallingPlats = map.createDynamicLayer("fallingPlats", tiles)

        map.createDynamicLayer("Foreground", tiles).setDepth(2);
    
        // "Spawn Point" object in the Tiled map
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
        this.player = new Player(this, spawnPoint.x, spawnPoint.y);
        
        // Collide the player against the ground layer - here we are grabbing the sprite property from
        // the player (since the Player class is not a Phaser.Sprite).
        this.groundLayer.setCollisionByProperty({ collides: true })
        this.fallingPlats.setCollisionByProperty({ collides: true });
        this.physics.world.addCollider(this.player.sprite, this.groundLayer);
        this.physics.world.addCollider(this.player.sprite, this.fallingPlats,(x,y)=>this.platFall(x,y,this.fallingPlats))



        // console.log(this)

        // this.fallingPlats = this.physics.add.group({
          //   key: 'plat',
          //   setAllowGravity:true, 
          // })
          // this.physics.world.overlap(this.player.sprite,this.fallingPlats,(e)=> console.log(e))
        
  
        // spike hitbox
        this.spikeGroup = this.physics.add.staticGroup();
        this.groundLayer.forEachTile(tile => {
          if (tile.index === 77) {
            const spike = this.spikeGroup.create(tile.getCenterX(), tile.getCenterY(), "spike");
    
            // catches rotated spikes
            spike.rotation = tile.rotation;
            if (spike.angle === 0) spike.body.setSize(32, 6).setOffset(0, 26);
            else if (spike.angle === -90) spike.body.setSize(6, 32).setOffset(26, 0);
            else if (spike.angle === 90) spike.body.setSize(6, 32).setOffset(0, 0);
    
            this.groundLayer.removeTileAt(tile.x, tile.y);
          }
        });
        // camera follow
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.backgroundLayer.setScrollFactor(.5)
    
        // instructions text
        this.add
          .text(1500, 32, "Don't touch the spikes!", {
            font: "18px monospace",
            fill: "#000000",
            padding: { x: 20, y: 10 },
            backgroundColor: "#ffffff"
          })
          .setScrollFactor(1);
      
        this.add
          .text(16, 16, "Arrow/WASD to move & jump \n Try to reach the end!", {
            font: "18px monospace",
            fill: "#000000",
            padding: { x: 20, y: 10 },
            backgroundColor: "#ffffff"
          })
          .setScrollFactor(1);
       }
      
    
      update() {
        if (this.isPlayerDead) return;
    
        this.player.update();
    
    
        if (
          this.player.sprite.y > this.groundLayer.height ||
          this.physics.world.overlap(this.player.sprite, this.spikeGroup)
        ) {
          
          this.isPlayerDead = true;
    
          const cam = this.cameras.main;
          cam.shake(100, 0.05);
          cam.fade(250, 0, 0, 0);
    
          
          this.player.freeze();
          
    
          cam.once("camerafadeoutcomplete", () => {
            this.player.destroy();
            this.scene.restart();
          });
        }
      }
    }
    