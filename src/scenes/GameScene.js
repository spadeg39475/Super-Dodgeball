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
        this.load.spritesheet('enemy', './materials/img/character/hira/hira2.png', {frameWidth:64, frameHeight: 64});

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
        
       

        // const spawnPoint = court.findObject('object', obj => obj.name === 'player1');
        // this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'enemy')

        


        this.kunio = this.physics.add.sprite(350, 300, 'kunio');
        this.kunio.setSize(18,33);
        this.kunio.setOffset(29,15);
        this.kunio.setScale(1.8);
        this.kunio.setDamping(true);
        this.kunio.body.setDrag(0.90,0.90);

        this.enemy = this.physics.add.sprite(600, 300, 'enemy');
        this.enemy.setSize(18,33);
        this.enemy.setOffset(23,22);
        this.enemy.setScale(1.8);
        this.enemy.setDamping(true);
        this.enemy.body.setDrag(0.90,0.90);
        

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
            repeatDelay: 1000,
            duration: 1000,
            repeat: 0
        })
        this.anims.create({
            key: 'hit-down2',
            frames: this.anims.generateFrameNumbers('kunio', { start: 152, end: 152 }),
            duration: 1000,
            repeat: 0
        })
        // ball
        this.anims.create({
            key: 'normal-ball',
            frames: this.anims.generateFrameNumbers('ball', { start: 0, end: 0 }),
            frameRate: 20,
            repeat: -1
        })
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
            key: 'catch',
            frames: this.anims.generateFrameNumbers('kunio', { start: 76, end: 76 }),
            frameRate: 10,
            repeat: 0
        })

        // enemy anims
        this.anims.create({
            key: 'enemy-turn',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 0 }),
            frameRate: 5,
            repeat: 0
        })
        this.anims.create({
            key: 'enemy-walk',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'enemy-run',
            frames: this.anims.generateFrameNumbers('enemy', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        })       
        this.anims.create({
            key: 'enemy-hitted',
            frames: this.anims.generateFrameNumbers('enemy', { start: 28, end: 30 }),
            duration: 200,
            repeat: 0
        })
        this.anims.create({
            key: 'enemy-pick',
            frames: this.anims.generateFrameNumbers('enemy', { start: 14, end: 14 }),
            duration: 250,
            repeat: 0
        })
        this.anims.create({
            key: 'enemy-jump',
            frames: this.anims.generateFrameNumbers('enemy', { start: 8, end: 9 }),
            repeat: 0
        })



        // this.kunio.anims.play('hit-down2')
        this.enemy.flipX = true



        this.throw =(direct) => {
            this.both.clear();
            this.ball.setFrictionX(0)
            this.ball.setDamping(false);
            this.ball.setAcceleration(0,0);
            this.ball.setBounce(0, 0);
            this.state.current = this.kunio;
            let speedX;
            if(direct==='right'){
                speedX =160;
            }else{speedX=-160}
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
                    this.ball.setVelocityX(speedX).setCollideWorldBounds(true);
                    if(this.kunio.x <390 && this.kunio.x>340 && this.state.isRun){
                        let ballAnime = 'magic-ball' + Math.ceil(Math.random() * 3)
                        this.ball.anims.play(ballAnime)
                    }else{this.ball.anims.play('normal-ball')}
                    this.state.isThrow = false;
                    this.state.haveBall = false;

                    // setTimeout(()=>{this.state.turn='enemy'}, 1000)
                },
            })
           
        }

        this.test = this.physics.add.overlap(this.kunio, this.ball, null,()=>{
            if(this.state.turn === 'enemy' && this.ball.x < this.kunio.x + 24){
                this.kunio.setVelocityX(-800);

                this.kunio.anims.play('hit-down', true);
                this.kunio.anims.chain('hit-down2');
                // this.ball.setVelocity(200, -200);
                // this.ball.setAcceleration(-600, 600);
                this.test.active = false;
                this.state.isActive = false;
                this.state.turn='us'
            }
        });
        

        this.state = {
            turn: 'us',
            isActive: true,
            haveBall: false,
            isRun: false,
            isThrow: false,
            onFloor: true,
            isJump: false,
            flipX: false,
            current: this.kunio,
            isMoving: false,
            x: 0,
            y: 0,
            dx: 0,
            dy: 0,
            gravity: 0.2
        }
     
        
        

        //鍵盤控制
        // this.gamePlaykeys = this.input.keyboard.addKeys('RIGHT, LEFT, UP , DOWN, Z, X');
        this.keys = {
            z: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
            x: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        }
      

        
       
        // this.input.keyboard.on('keydown-' + 'Z', this.throw );
        // this.input.keyboard.on('keydown-' + 'X', this.pick );
        
      
        



        
        this.kunio.on('animationcomplete',function(){this.kunio.anims.play('turn')},this);
        this.kunio.on('animationcomplete-hit-down2',function(){this.state.isActive=true},this);
        this.enemy.on('animationcomplete',function(){this.enemy.anims.play('enemy-turn')},this);
        
        console.log(this)


        this.checkRun = () => {
            if ((this.keys.right.duration > 0 && this.keys.right.duration < 100) || (this.keys.left.duration > 0 && this.keys.left.duration < 100)  ){
                this.state.isRun = true
            }
            else if (this.keys.right.isUp && this.keys.left.isUp){
                this.state.isRun = false
            }
        }
    }

    update(time, delta){
        // 遊戲狀態更新t
        // this.kunio.body.setVelocity(0);
        
        this.checkRun();

          //鍵盤控制
        let input = {
            left: this.keys.left.isDown,
            right:this.keys.right.isDown,
            up: this.keys.up.isDown,
            down: this.keys.down.isDown,
            z: this.keys.z.isDown,
            x: this.keys.x.isDown
        }
        // ---------------------------------------------------------------

        

        this.state.flipX ? this.kunio.setOffset(16,15)  : this.kunio.setOffset(29,15) ;
        
        if(this.state.isActive){
            if(input.right && this.state.isRun === true ){
            
            this.state.haveBall ? this.ball.x = this.kunio.x + 24 : this.ball.x

            this.state.flipX = false;
            this.state.current.setVelocityX(160);
            this.kunio.anims.play('run', true);
            this.kunio.flipX = this.state.flipX;
            }
            else if(input.right){

                this.state.haveBall ? this.ball.x = this.kunio.x + 24 : this.ball.x

                this.state.flipX = false;
                this.state.current.setVelocityX(100);
                this.kunio.anims.play('walk', true);
                this.kunio.flipX = this.state.flipX;
            }
            if (input.left && this.state.isRun === true){

                this.state.haveBall ? this.ball.x = this.kunio.x - 24 : this.ball.x


                this.state.flipX = true
                this.state.current.setVelocityX(-160);
                this.kunio.anims.play('run',true);
                this.kunio.flipX = this.state.flipX;
            }
            else if (input.left){

                this.state.haveBall ? this.ball.x = this.kunio.x - 24 : this.ball.x

                this.state.flipX = true;
                this.state.current.setVelocityX(-100);
                this.kunio.anims.play('walk',true);
                
                this.kunio.flipX = this.state.flipX;;
            }
            if (input.up && this.state.isRun === true && this.state.onFloor){

                
                this.state.current.setVelocityY(-100);
                this.kunio.anims.play('run',true);
                this.kunio.flipX = this.state.flipX;

                this.state.haveBall ? this.ball.y = this.kunio.y : this.ball.y
            }
            else if (input.up && this.state.onFloor){

                // this.state.haveBall ? this.ball.y = this.kunio.y : this.ball.y

                this.state.current.setVelocityY(-100);
                this.kunio.anims.play('walk',true);
                this.kunio.flipX = this.state.flipX;

                this.state.haveBall ? this.ball.y = this.kunio.y : this.ball.y
            }


            if (input.down && this.state.isRun === true && this.state.onFloor){

                

                this.state.current.setVelocityY(100);
                this.kunio.anims.play('run',true);
                this.kunio.flipX = this.state.flipX;

                this.state.haveBall ? this.ball.y = this.kunio.y : this.ball.y

            }
            else if (input.down && this.state.onFloor){

                this.state.current.setVelocityY(100);
                this.kunio.anims.play('walk', true);
                this.kunio.flipX = this.state.flipX;

                this.state.haveBall ? this.ball.y = this.kunio.y : this.ball.y
            }


            if (input.x && input.z && this.state.onFloor){
                this.state.onFloor = false;
                this.state.y = this.kunio.y;

                // console.log(this.state.active.getChildren())
                // this.state.active.setAccelerationY(500)
                if(this.state.current.children){
                    let arr = this.state.current.getChildren();
                    arr.forEach((el)=>{el.setAccelerationY(500)})
                }
                else{this.state.current.setAccelerationY(500);} 
                
                this.state.current.setVelocityY(-300);
                this.kunio.anims.play('jump');
                this.state.haveBall ? this.ball.y = this.kunio.y : this.ball.y
                this.kunio.flipX = this.state.flipX;
                this.state.isJump = true;
                        
            }
            else if(this.state.isJump && this.kunio.y > this.state.y ){
                
                this.state.current.setVelocityY(0);

                if(this.state.current.children){
                    let arr = this.state.current.getChildren();
                    arr.forEach(el=>{el.setAccelerationY(0)})
                }
                else{this.state.current.setAccelerationY(0);} 

                this.state.onFloor = true;
                this.state.isJump = false;
            }
            else if (this.state.haveBall && Phaser.Input.Keyboard.JustDown(this.keys.z) && this.state.onFloor){
                this.kunio.anims.play('throw')
                this.throw('right');
                this.state.isThrow = true;
            }
            else if (Phaser.Input.Keyboard.JustDown(this.keys.z)){
                this.catchBall()
            }
            else if(!this.state.isJump && Phaser.Input.Keyboard.JustDown(this.keys.x) && !this.state.haveBall ){
                
                this.kunio.anims.play('pick');
                if(this.kunio.body.touching.up){
                    this.pickBall()
                }
            }
        }

    


        if(this.state.isJump){
            this.kunio.anims.play('jump')
        }
        if(this.state.isThrow){
            this.kunio.anims.play('throw')
        }
        
        if(this.ball.body.velocity.x === 0){
            this.ball.setAccelerationX(0)
            this.ball.anims.play('normal-ball')
        }
        // if(this.ball.y > this.kunio.y + 20){
        //     this.ball.setAccelerationY(0)
        //     this.ball.body.stop()
        // }


        if(this.ball.body.velocity.x === 0 && this.ball.body.x > 600){
            
            this.tweens.add({
                targets: this.enemy,
                x: this.ball.x,
                y: this.ball.y -30,
                ease: 'linear',
                delay:200,
                duration: 1000,
                repeat: 0,
                onStart: ()=>{
                    this.enemy.flipX = false;
                    this.enemy.anims.play('enemy-walk', true)
                },
                onComplete: ()=>{
                    this.enemy.flipX = true;
                    this.enemy.anims.play('enemy-turn', true)
                    this.state.turn = 'enemy'
                    this.throw('left')
                    this.test.active= true;
                }
            })
        }
        
        
        
        
    }

    pickBall(){
        this.state.haveBall = true;
        this.state.current = this.both
        this.both.add(this.kunio)
        this.both.add(this.ball)
        this.tweens.add({
            targets: this.ball,
            x: this.kunio.x + 24,
            y: this.kunio.y ,
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
        this.ball.setFriction(1,100)
        
    }

    catchBall(){
        if(this.state.turn === 'enemy'){
            this.kunio.anims.play('catch')

            if(this.ball.x < this.kunio.x + 40 && this.ball.x > this.kunio.x + 30){
                this.state.haveBall = true;
                this.state.current = this.both
                this.both.add(this.kunio)
                this.both.add(this.ball)
                this.tweens.add({
                    targets: this.ball,
                    x: this.kunio.x +24,
                    y: this.kunio.y -5,
                    ease: 'linear',
                    delay:0,
                    duration: 0,
                    repeat: 0
                })
                this.ball.anims.play('normal-ball')
                this.kunio.setDamping(true);
                this.kunio.body.setDrag(0.90,0.90);
                this.kunio.setFrictionX(1);
                this.ball.setDamping(true);
                this.ball.body.setDrag(0.90,0.90);
                this.ball.setFrictionX(1);
                this.state.turn = 'us'
                this.test.active = true;
            }
            
        }
        
    }

    

}

export default GameScene;