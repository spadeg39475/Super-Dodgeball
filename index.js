const gameStart = {
    key: 'gameStart',
    preload: function(){
        // 載入資源
        // this.load.image('court', './materials/img/court.png',{frameWidth: 432, frameHeight: 182});
        this.load.spritesheet('ball', './materials/img/ball.png', {frameWidth: 40, frameHeight: 40});
        this.load.spritesheet('kunio', './materials/img/character/Kunio/Kunio.png', {frameWidth:64, frameHeight: 60});

        this.load.image('tiles', '../materials/img/court2.png')
        this.load.tilemapTiledJSON('court', './materials/img/court.json');
        
    },
    create: function(){
        // 資源載入完成，加入遊戲物件及相關設定

        const court = this.make.tilemap({ key: "court" })
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload);
        const tileset = court.addTilesetImage('court2', 'tiles');
        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const background = court.createStaticLayer("background", tileset, 0, 0);
        const block = court.createStaticLayer("block", tileset, 0, 0);
        block.setCollisionByProperty({ collides: true });
        

    
  

        // this.court = this.physics.add.sprite(320, 240, 'court');
        // this.court.depth = -10;
        // this.court.body.immovable = true;
        // this.court.body.moves = false;
        // this.court.setSize(500,10);
        // this.court.setScale(1.5);
        

        // this.ball = this.add.sprite(320, 240, 'ball');
        // this.ball.setScale(2);

        this.kunio = this.physics.add.sprite(300, 200, 'kunio');
        
        this.kunio.setSize(18,33);
        this.kunio.setOffset(29,15)
        this.kunio.setScale(1.8);
        // // this.kunio.body.immovable = true;
        // this.kunio.body.moves = true;
        this.physics.add.collider(this.kunio, block);


        
       
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('kunio', { start: 1, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('kunio', { start: 0, end: 0 }),
            frameRate: 5,
            repeat: -1
        })
       
        
        // this.kunio.setBounce(0.2);
        // this.kunio.setSize(60,110 ,0);
        // this.physics.add.collider(this.kunio, this.court);
        // this.kunio.anims.play('run', true);
    },
    update: function(){
        // 遊戲狀態更新
        this.kunio.body.setVelocity(0);
          //鍵盤控制
          let cursors = this.input.keyboard.createCursorKeys();
          if (cursors.right.isDown)
          {   
              
              this.kunio.setVelocityX(160);
              this.kunio.anims.play('run', true);
              this.kunio.flipX = false;

          }else if (cursors.left.isDown){
              
              this.kunio.setVelocityX(-160);
              this.kunio.anims.play('run', true);
              this.kunio.flipX = true;
          }else if (cursors.up.isDown){
            
            this.kunio.setVelocityY(-160);
            this.kunio.anims.play('run', true);
            this.kunio.flipX = false;
          }else if (cursors.down.isDown){
            this.kunio.setVelocityY(160);
            this.kunio.anims.play('run', true);
            this.kunio.flipX = false;
          }
          else
          {
              this.kunio.setVelocityX(0);
              this.kunio.anims.play('turn');
          }
    }
}


const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    parent: 'app',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug:true
        },
    },
    scene: [
        gameStart,
    ]
}

const game = new Phaser.Game(config);


