const gamePlay = {
    key: 'gamePlay',

    preload: function(){
        // 載入資源
        this.load.spritesheet('ball', './materials/img/ball.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('kunio', './materials/img/character/Kunio/Kunio.png', {frameWidth:64, frameHeight: 64});

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
        this.kunio.setDamping(true);
        this.kunio.body.setDrag(0.94,0.94);
        this.physics.add.collider(this.kunio, block);
        this.physics.add.collider(this.kunio, background);


        this.ball = this.physics.add.sprite(400,300,'ball');
        this.ball.setSize(13,13)
        this.ball.setOffset(18.5,18.5)
        this.ball.setScale(2.2);
        this.ball.setBounce(0.2);
        this.ball.setFriction(100);
        
        this.physics.add.collider(this.ball, block);
        this.physics.add.collider(this.ball, background);
        
        

        const camera = this.cameras.main;
        camera.startFollow(this.ball);
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
            duration: 300,
            repeat: 0
        })
        this.anims.create({
            key: 'pick',
            frames: this.anims.generateFrameNumbers('kunio', { start: 53, end: 53 }),
            duration: 250,
            repeat: 0
        })

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('kunio', { start: 6, end: 9 }),
            // frameRate: 10,
            duration:1000,
            repeat: 0
        })
        
        this.anims.create({
            key: 'hitted',
            frames: this.anims.generateFrameNumbers('kunio', { start: 32, end: 37 }),
            // frameRate: 10,
            duration: 1000,
            repeat: 0
        })
        this.anims.create({
            key: 'hitted-back',
            frames: this.anims.generateFrameNumbers('kunio', { start: 147, end: 148 }),
            // frameRate: 10,
            duration: 1000,
            repeat: 0
        })
        this.anims.create({
            key: 'hit-down',
            frames: this.anims.generateFrameNumbers('kunio', { start: 148, end: 152 }),
            // frameRate: 10,
            duration: 500,
            repeat: 0
        })
        // ball
        this.anims.create({
            key: 'magic-ball1',
            frames: this.anims.generateFrameNumbers('ball', { start: 0, end: 1 }),
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: 'magic-ball2',
            frames: this.anims.generateFrameNumbers('ball', { start: 2, end: 5 }),
            frameRate: 20,
            repeat: -1,
        })
        // this.anims.create({
        //     key: 'magic-ball3',
        //     frames: this.anims.generateFrameNumbers('ball', { start: 4, end: 5 }),
        //     frameRate: 20,
        //     repeat: -1
        // })
        this.anims.create({
            key: 'magic-ball3',
            frames: this.anims.generateFrameNumbers('ball', { start: 6, end: 9 }),
            frameRate: 16,
            repeat: -1
        })
        
        this.kunio.anims.play('hitted-back')
       


        this.throw = () =>{
            this.tweens.add({
                targets: this.kunio,
                ease: 'linear',
                delay:0,
                duration: 1000,
                // yoyo: true,
                repeat: 0,
                onStart:  ()=> {  this.kunio.anims.play('throw')  },
                onComplete:  ()=>{
                    // this.kunio.on('animationcomplete',this.test,this);
                    this.ball.setVelocityX(160);
                    let ballAnime = 'magic-ball' + Math.ceil(Math.random() * 3)
                    this.ball.anims.play(ballAnime) 
                },
                onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
                onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
            })
        }
        this.pick = () =>{
            this.tweens.add({
                targets: this.kunio,
                ease: 'Sinusoidal.InOut',
                duration: 500,
                yoyo: true,
                repeat: 0,
                onStart:  ()=> {
                    this.kunio.anims.play('pick');
                     
                 },
                onComplete: ()=> {
                    
                },
                onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
                onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
            })
            
        }
        // this.run =() =>{
        //     this.kunio.setVelocityX(160);
        //     this.kunio.anims.play('run', true);
        //     this.kunio.flipX = false;
        //     console.log('run')
        // }
        this.jump = () =>{
            
            this.tweens.add({
                targets: this.kunio,
                y:this.kunio.y-50,
                ease: 'Sinusoidal.InOut',
                duration: 500,
                yoyo: true,
                repeat: 0,
                onStart:  ()=> {
                    this.state.onFloor = false;
                     
                 },
                onComplete: ()=> {
                    this.state.onFloor=true;
                },
                onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
                onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
            })
        }


        this.state = {
            isRun: false,
            onFloor: true,
            flipX: false,
            active: this.kunio,
        }
        this.jumpInfo = {
            x: this.kunio.x,
            y: this.kunio.x,
            dx: 0,
            dy: 0,
            onFloor: false,
            jumpPower: -5,
            moveSpeed: 2
        }
        
        

        //鍵盤控制
        // this.gamePlaykeys.UP = this.input.keyboard.addKey('UP');
        // this.gamePlaykeys.DOWN = this.input.keyboard.addKey('DOWN');
        // this.gamePlaykeys.RIGHT = this.input.keyboard.addKey('RIGHT');
        // this.gamePlaykeys.LEFT = this.input.keyboard.addKey('LEFT');
        // this.gamePlaykeys.Z = this.input.keyboard.addKey('Z');
        // this.gamePlaykeys.X = this.input.keyboard.addKey('X');

        this.gamePlaykeys = this.input.keyboard.addKeys('RIGHT, LEFT, UP , DOWN, Z, X');



        
       
        // this.input.keyboard.on('keydown-' + 'Z', this.throw );
        // this.input.keyboard.on('keydown-' + 'X', this.pick );
        
        
        // game.physics.arcade.collide(this.kunio,this.ball,null,()=>{
        //     this.kunio.anims.play('hitted');
        // })
        
        this.kunio.on('animationcomplete',function(){this.kunio.anims.play('turn')},this);
        console.log(this)


        this.checkRun = () => {
            if ((this.gamePlaykeys.RIGHT.duration > 0 && this.gamePlaykeys.RIGHT.duration < 100) || (this.gamePlaykeys.LEFT.duration > 0 && this.gamePlaykeys.LEFT.duration < 100)  ){
                this.state.isRun = true
            }
            else if (this.gamePlaykeys.RIGHT.isUp && this.gamePlaykeys.LEFT.isUp){
                this.state.isRun = false
            }
        }
       
    },

    update: function(time, delta){
        // 遊戲狀態更新
        // this.kunio.body.setVelocity(0);
        
        this.checkRun();
        

          //鍵盤控制
        if(this.gamePlaykeys.RIGHT.isDown && this.state.isRun === true ){
            this.state.flipX = false;
            this.kunio.setVelocityX(160);
            this.kunio.anims.play('run', true);
            this.kunio.flipX = this.state.flipX;
        }
        else if(this.gamePlaykeys.RIGHT.isDown){
            this.state.flipX = false;
            this.kunio.setVelocityX(100);
            this.kunio.anims.play('walk', true);
            this.kunio.flipX = this.state.flipX;
        }
        if (this.gamePlaykeys.LEFT.isDown && this.state.isRun === true){
            this.state.flipX = true
            this.kunio.setVelocityX(-160);
            this.kunio.anims.play('run',true);
            this.kunio.flipX = this.state.flipX;
        }
        else if (this.gamePlaykeys.LEFT.isDown){
            this.state.flipX = true;
            this.kunio.setVelocityX(-100);
            this.kunio.anims.play('walk',true);
            this.kunio.flipX = this.state.flipX;;
        }
        if (this.gamePlaykeys.UP.isDown && this.state.isRun === true){
            this.kunio.setVelocityY(-100);
            this.kunio.anims.play('run',true);
            this.kunio.flipX = this.state.flipX;
        }
        else if (this.gamePlaykeys.UP.isDown){
          
          this.kunio.setVelocityY(-100);
          this.kunio.anims.play('walk',true);
          this.kunio.flipX = this.state.flipX;
        }
        if (this.gamePlaykeys.DOWN.isDown && this.state.isRun === true){
            this.kunio.setVelocityY(100);
          this.kunio.anims.play('run',true);
          this.kunio.flipX = this.state.flipX;
        }
        else if (this.gamePlaykeys.DOWN.isDown){
          this.kunio.setVelocityY(100);
          this.kunio.anims.play('walk', true);
          this.kunio.flipX = this.state.flipX;
        }
        if( this.gamePlaykeys.X.isDown && this.gamePlaykeys.Z.isDown && this.state.onFloor){
            // this.kunio.anims.play('jump');
            // this.jump();
            // this.kunio.flipX = this.state.flipX;
        

            // this.jumpInfo.dy = this.jumpInfo.jumpPower
            
        }
        else if (Phaser.Input.Keyboard.JustDown(this.gamePlaykeys.Z)){
            this.throw();
        }
        else if( Phaser.Input.Keyboard.JustDown(this.gamePlaykeys.X)){
            
            this.kunio.anims.play('pick');
        }

       
 
       
    },
    
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
        }
    },
    scene: [
        gamePlay,
    ]
}

const game = new Phaser.Game(config);


