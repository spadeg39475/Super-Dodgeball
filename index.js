const gameStart = {
    key: 'gameStart',

    preload: function(){
        // 載入資源
        this.load.spritesheet('ball', './materials/img/ball.png', {frameWidth: 40, frameHeight: 40});
        this.load.spritesheet('kunio', './materials/img/character/Kunio/Kunio.png', {frameWidth:64, frameHeight: 63});

        this.load.image('tiles', '../materials/img/court3.png')
        this.load.tilemapTiledJSON('court', './materials/img/court2.json');
        
    },

    
    create: function(){
        // 資源載入完成，加入遊戲物件及相關設定
        
        const court = this.make.tilemap({ key: "court" })
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload);
        const tileset = court.addTilesetImage('court3', 'tiles');
        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const background = court.createStaticLayer("background", tileset, 0, 0);
        const block = court.createStaticLayer("block", tileset, 0, 0);
        block.setCollisionByProperty({ collides: true });
        background.setCollisionByProperty({ collides: true });
       
    
        this.kunio = this.physics.add.sprite(300, 300, 'kunio');
        this.kunio.setSize(18,33);
        this.kunio.setOffset(29,15);
        this.kunio.setScale(1.8);
        this.physics.add.collider(this.kunio, block);
        this.physics.add.collider(this.kunio, background);

    
        
       

        const camera = this.cameras.main;
        camera.startFollow(this.kunio);
        camera.setBounds(0, 0, court.widthInPixels, court.heightInPixels);

        
       // anims
       this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('kunio', { start: 1, end: 2 }),
            frameRate: 10,
            repeat: 0
        })
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('kunio', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: 0
        })

        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('kunio', { start: 0, end: 0 }),
            frameRate: 5,
            repeat: 0
        })
       
        this.anims.create({
            key: 'throw',
            frames: this.anims.generateFrameNumbers('kunio', { start: 30, end: 31 }),
            frameRate: 20,
            repeat: 0
        })
        this.anims.create({
            key: 'pick',
            frames: this.anims.generateFrameNumbers('kunio', { start: 53, end: 53 }),
            frameRate: 20,
            repeat: 0
        })

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('kunio', { start: 100, end: 102 }),
            frameRate: 20,
            repeat: 0
        })

        this.throw = () =>{
            this.kunio.anims.play('throw');
        }
        this.pick = () =>{
            this.kunio.anims.play('pick');
        }
        this.run =() =>{
            this.kunio.setVelocityX(160);
            this.kunio.anims.play('run', true);
            this.kunio.flipX = false;
            console.log('run')
        }

        this.state = {
            isRun: 0
        }


        //鍵盤控制
        this.up = this.input.keyboard.addKey('UP');
        this.down = this.input.keyboard.addKey('DOWN');
        this.right = this.input.keyboard.addKey('RIGHT');
        this.left = this.input.keyboard.addKey('LEFT');
        this.z = this.input.keyboard.addKey('Z');
        this.x = this.input.keyboard.addKey('X');
        
        // this.input.keyboard.createCombo(['RIGHT', 'RIGHT'],{ 
        //     resetOnWrongKey: true,
        //     maxKeyDelay: 50,
        //     resetOnMatch: true,
        //     deleteOnMatch: false, 
        // })

        this.input.keyboard.on('keydown-' + 'Z', this.throw );
        // this.input.keyboard.on('keycombomatch', this.run);
        

        this.kunio.on('animationcomplete',function(){this.kunio.anims.play('turn')},this);
        console.log(this)
    },
    update: function(){
        // 遊戲狀態更新
        this.kunio.body.setVelocity(0);
        
          //鍵盤控制
        if(this.right.isDown){
            
            this.kunio.setVelocityX(100);
            this.kunio.anims.play('walk', true);
            this.kunio.flipX = false;
            
        }
        else if (this.left.isDown){
              
            this.kunio.setVelocityX(-100);
            this.kunio.anims.play('walk',true);
            this.kunio.flipX = true;
        }
        else if (this.up.isDown){
          
          this.kunio.setVelocityY(-100);
          this.kunio.anims.play('walk',true);
          this.kunio.flipX = false;
        }else if (this.down.isDown){
          this.kunio.setVelocityY(100);
          this.kunio.anims.play('walk', true);
          this.kunio.flipX = false;
        }
        else if( this.x.isDown && this.z.isDown){
           
            this.kunio.anims.play('jump');
            
    
        }
        else if( this.x.isDown){
           
            this.kunio.anims.play('pick');
            
        }
        // else
        // {
        //     this.kunio.setVelocityX(0);
        //     this.kunio.anims.play('turn');
        // }
        
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


