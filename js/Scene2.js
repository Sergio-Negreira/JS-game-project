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
        this.load.tilemapTiledJSON("map", "../assets/tilemaps/singlemap.json.json");
      }
    

      create() {
        this.isPlayerDead = false;
        
        const map = this.make.tilemap({ key: "map" });
        const tiles = map.addTilesetImage("0x72-industrial-tileset-32px-extruded", "tiles");
        //vars for different layers in Tiled map
        this.backgroundLayer = map.createDynamicLayer("Background", tiles);
        this.groundLayer = map.createDynamicLayer("Ground", tiles);
        map.createDynamicLayer("Foreground", tiles);
    
        // "Spawn Point" object in the Tiled map
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
        this.player = new Player(this, spawnPoint.x, spawnPoint.y);
        
        // Collide the player against the ground layer - here we are grabbing the sprite property from
        // the player (since the Player class is not a Phaser.Sprite).
        this.groundLayer.setCollisionByProperty({ collides: true });
        this.physics.world.addCollider(this.player.sprite, this.groundLayer);
    
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
          .text(16, 16, "Don't touch the spikes!", {
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
          // Flag that the player is dead so that we can stop update from running in the future
          this.isPlayerDead = true;
    
          const cam = this.cameras.main;
          cam.shake(100, 0.05);
          cam.fade(250, 0, 0, 0);
    
          // Freeze the player to leave them on screen while fading but remove the marker immediately
          this.player.freeze();
          // this.marker.destroy();
    
          cam.once("camerafadeoutcomplete", () => {
            this.player.destroy();
            this.scene.restart();
          });
        }
      }
    }
    