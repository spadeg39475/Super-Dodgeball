class GameScene extends Phaser.Scene{

    constructor(test){
        super({
            key: 'GameScene'
        });
    }

    preload(){
        // 載入資源
        this.load.spritesheet('ball', './materials/img/ball.png', {frameWidth: 50, frameHeight: 50});
        
        this.load.spritesheet('kunio', './materials/img/character/Kunio/Kunio.png', {frameWidth:64, frameHeight: 64});

        this.load.image('tiles', '../materials/img/court3.png')
        this.load.tilemapTiledJSON('court', './materials/img/court2.json');
    }
    
    create(){
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
        this.physics.world.bounds.setTo(0,200, 800,300);
        this.physics.world.setBoundsCollision();
        
        

        


        this.kunio = this.physics.add.sprite(300, 300, 'kunio');
        this.kunio.setSize(18,33);
        this.kunio.setOffset(29,15);
        this.kunio.setScale(1.8);
        this.kunio.setDamping(true);
        this.kunio.body.setDrag(0.90,0.90);
        

        this.ball = this.physics.add.sprite(340,300,'ball');
        this.ball.setCircle(6.5)
        this.ball.setOffset(18.5,18.5)
        this.ball.setScale(2.2);
        this.ball.setBounce(0.2);
        this.ball.setFriction(100);


        
        this.physics.add.collider(this.kunio, block);
        this.physics.add.collider(this.kunio, background);
        this.physics.add.collider(this.ball, block);
        this.physics.add.collider(this.ball, background);
        this.physics.add.overlap(this.kunio, this.ball);

        this.both = this.physics.add.group();
        

        const camera = this.cameras.main;
        
        camera.startFollow(this.ball, 0, 0.1, 0, 0, 0);
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
            duration: 200,
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
            frames: this.anims.generateFrameNumbers('kunio', { start: 8, end: 9 }),
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
        this.anims.create({
            key: 'turn-withBall',
            frames: this.anims.generateFrameNumbers('kunio', { start: 76, end: 77 }),
            frameRate: 5,
            repeat: -1
        })

        
        // this.kunio.anims.play('throw')

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

        this.throw =() => {
            this.both.clear();
            this.ball.setFrictionX(0)
            this.ball.setDamping(false);
            this.ball.setAcceleration(0,0);
            this.ball.setBounce(0.5, 0);
            this.state.active = this.kunio;
           
            this.tweens.add({
                targets: this.kunio,
                ease: 'linear',
                delay:0,
                duration: 1000,
                yoyo: true,
                repeat: 0,
                onStart:  ()=> {this.kunio.anims.play('throw')},
                completeDelay: 100,
                onComplete:  ()=>{
                    this.ball.setVelocityX(160).setCollideWorldBounds(true);
                    let ballAnime = 'magic-ball' + Math.ceil(Math.random() * 3)
                    this.ball.anims.play(ballAnime)
                    this.state.isThrow = false;
                    this.state.haveBall = false;

                    setTimeout(()=>{this.state.turn='enemy'}, 2000)
                },
            })
           
        }
        this.test = this.physics.add.overlap(this.kunio, this.ball, null,()=>{
            if(this.state.turn === 'enemy'){
                this.kunio.setVelocityX(-500);
                this.kunio.anims.play('hitted');
                this.state.turn = 'us';
            }
        });

        this.state = {
            turn: 'us',
            haveBall: false,
            isRun: false,
            isThrow: false,
            onFloor: true,
            isJump: false,
            flipX: false,
            active: this.kunio,
            x: 0,
            y: 0,
            dx: 0,
            dy: 0,
            gravity: 0.2
        }
     
        
        

        //鍵盤控制
        this.gamePlaykeys = this.input.keyboard.addKeys('RIGHT, LEFT, UP , DOWN, Z, X');
        // this.keys = {
        //     z: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
        //     x: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
        //     up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
        //     left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
        //     right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
        //     down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        // }
        console.log(this.kunio)

        
       
        // this.input.keyboard.on('keydown-' + 'Z', this.throw );
        // this.input.keyboard.on('keydown-' + 'X', this.pick );
        
      
        
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
    }

    update(time, delta){
        // 遊戲狀態更新t
        // this.kunio.body.setVelocity(0);
        
        this.checkRun();

          //鍵盤控制
        // let input = {
        //     left: this.keys.left.isDown,
        //     right:this.keys.right.isDown,
        //     up: this.keys.up.isDown,
        //     down: this.keys.down.isDown,
        //     z: this.keys.z.isDown,
        //     x: this.keys.x.isDown
        // }
        // ---------------------------------------------------------------

        // if(this.state.haveBall){
        //     if(this.gamePlaykeys.RIGHT.isDown){
        //         this.both.setVelocityX(100)
        //     }
        // }

        this.state.flipX ? this.kunio.setOffset(16,15)  : this.kunio.setOffset(29,15) ;
        

        if(this.gamePlaykeys.RIGHT.isDown && this.state.isRun === true ){
            
            this.state.haveBall ? this.ball.x = this.kunio.x + 24 : this.ball.x

            this.state.flipX = false;
            this.state.active.setVelocityX(160);
            this.kunio.anims.play('run', true);
            this.kunio.flipX = this.state.flipX;
        }
        else if(this.gamePlaykeys.RIGHT.isDown){

            this.state.haveBall ? this.ball.x = this.kunio.x + 24 : this.ball.x

            this.state.flipX = false;
            this.state.active.setVelocityX(100);
            this.kunio.anims.play('walk', true);
            this.kunio.flipX = this.state.flipX;
        }
        if (this.gamePlaykeys.LEFT.isDown && this.state.isRun === true){

            this.state.haveBall ? this.ball.x = this.kunio.x - 24 : this.ball.x

            this.state.flipX = true
            this.state.active.setVelocityX(-160);
            this.kunio.anims.play('run',true);
            this.kunio.flipX = this.state.flipX;
        }
        else if (this.gamePlaykeys.LEFT.isDown){

            this.state.haveBall ? this.ball.x = this.kunio.x - 24 : this.ball.x

            this.state.flipX = true;
            this.state.active.setVelocityX(-100);
            this.kunio.anims.play('walk',true);
            
            this.kunio.flipX = this.state.flipX;;
        }
        if (this.gamePlaykeys.UP.isDown && this.state.isRun === true && this.state.onFloor){

            this.state.active.setVelocityY(-100);
            this.kunio.anims.play('run',true);
            this.kunio.flipX = this.state.flipX;
        }
        else if (this.gamePlaykeys.UP.isDown && this.state.onFloor){

            this.state.active.setVelocityY(-100);
            this.kunio.anims.play('walk',true);
            this.kunio.flipX = this.state.flipX;
        }


        if (this.gamePlaykeys.DOWN.isDown && this.state.isRun === true && this.state.onFloor){
            this.state.active.setVelocityY(100);
            this.kunio.anims.play('run',true);
            this.kunio.flipX = this.state.flipX;
        }
        else if (this.gamePlaykeys.DOWN.isDown && this.state.onFloor){
          this.state.active.setVelocityY(100);
          this.kunio.anims.play('walk', true);
          this.kunio.flipX = this.state.flipX;
        }


        if (this.gamePlaykeys.X.isDown && this.gamePlaykeys.Z.isDown && this.state.onFloor){
            
            this.state.y = this.kunio.y;

            // console.log(this.state.active.getChildren())
            // this.state.active.setAccelerationY(500)
            if(this.state.active.children){
                let arr = this.state.active.getChildren();
                arr.forEach(el=>{el.setAccelerationY(500)})
            }
            else{this.state.active.setAccelerationY(500);} 
            
            this.state.active.setVelocityY(-300);
            this.kunio.anims.play('jump');
            this.state.onFloor = false;
            this.state.isJump = true;
            this.kunio.flipX = this.state.flipX;
                     
        }
        else if(this.state.isJump && this.kunio.y > this.state.y ){
            
            this.state.active.setVelocityY(0);

            if(this.state.active.children){
                let arr = this.state.active.getChildren();
                arr.forEach(el=>{el.setAccelerationY(0)})
            }
            else{this.state.active.setAccelerationY(0);} 

            this.state.onFloor = true;
            this.state.isJump = false;
        }
        else if (this.state.haveBall && Phaser.Input.Keyboard.JustDown(this.gamePlaykeys.Z)){
            this.kunio.anims.play('throw')
            this.throw();
            this.state.isThrow = true;
        }
        else if(!this.state.isJump && Phaser.Input.Keyboard.JustDown(this.gamePlaykeys.X)){
            
            this.kunio.anims.play('pick');
            if(this.kunio.body.touching.up){
                this.pickBall()
            }
            console.log(this.physics.world)
        }



        if(this.state.isJump){
            this.kunio.anims.play('jump')
        }
        if(this.state.isThrow){
            this.kunio.anims.play('throw')
        }
        // this.state.dy +=this.state.gravity;
        // this.kunio.x += this.state.dx;
        // this.kunio.y += this.state.dy;
        // this.state.dy +=this.state.gravity;
        // this.kunio.x += this.state.dx;
        // this.kunio.y += this.state.dy;  
        
    }

    pickBall(){
        this.state.haveBall = true;
        this.state.active = this.both
        this.both.add(this.kunio)
        this.both.add(this.ball)
        this.tweens.add({
            targets: this.ball,
            x: this.kunio.x + 24,
            y: this.kunio.y,
            ease: 'linear',
            delay:200,
            duration: 0,
            repeat: 0
        })
        
        this.kunio.setDamping(true);
        this.kunio.body.setDrag(0.90,0.90);
        this.kunio.setFrictionX(1);
        this.ball.setDamping(true);
        this.ball.body.setDrag(0.90,0.90);
        this.ball.setFrictionX(1);
    }

    

}

export default GameScene;