class GameScene extends Phaser.Scene{

    constructor(test){
        super({
            key: 'GameScene'
        });
    }

    preload(){
        // 載入資源
        this.load.spritesheet('ball', './materials/img/ball.png', {frameWidth: 50, frameHeight: 50});
        
        this.load.spritesheet('player1', './materials/img/character/Kunio/kunio.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('player2', './materials/img/character/Nanase/Nanase.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('player3', './materials/img/character/Saotome/Saotome2.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('player4', './materials/img/character/Sugata/Sugata.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('player5', './materials/img/character/Sawaguchi/Sawaguchi2.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('player6', './materials/img/character/Gouda/Gouda2.png', {frameWidth:64, frameHeight: 64});
        
        this.load.spritesheet('enemy1', './materials/img/character/hira/hira2.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('enemy2', './materials/img/character/Kinoshita/Kinoshita.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('enemy3', './materials/img/character/Onizuka/Onizuka.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('enemy4', './materials/img/character/Kobayashi/Kobayashi.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('enemy5', './materials/img/character/Wataru/Wataru2.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('enemy6', './materials/img/character/Yamada/Yamada.png', {frameWidth:64, frameHeight: 64});
        


        
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
        
       
        this.playerPos = []
        this.enemyPos = []
        for(let i=1; i<7; i++){
           this.playerPos.push(court.findObject('object', obj => obj.name === `player${i}`))
        }

        for(let i=1; i<7; i++){
            this.enemyPos.push(court.findObject('object', obj => obj.name === `enemy${i}`))
            
        }
       
        // this.player = this.physics.add.sprite(point1.x, point1.y, 'player1')

        this.teamA = this.physics.add.group();
        this.teamB = this.physics.add.group();


        this.player1 = this.physics.add.sprite(this.playerPos[0].x, this.playerPos[0].y, 'player1');
        this.teamA.add(this.player1);
        this.player1.setSize(18,33);
        this.player1.setOffset(29,15);
        this.player1.setScale(1.8);
        this.player1.setDamping(true);
        this.player1.body.setDrag(0.9,0.9);

        this.player2 = this.physics.add.sprite(this.playerPos[1].x, this.playerPos[1].y, 'player2');
        this.playerInit(this.player2, this.teamA, false) // name group flipX

        this.player3 = this.physics.add.sprite(this.playerPos[2].x, this.playerPos[2].y, 'player3');
        this.playerInit(this.player3, this.teamA, false)
        
        this.player4 = this.physics.add.sprite(this.playerPos[3].x, this.playerPos[3].y, 'player4');
        this.playerInit(this.player4, this.teamA, true)

        this.player5 = this.physics.add.sprite(this.playerPos[4].x, this.playerPos[4].y, 'player5');
        this.playerInit(this.player5, this.teamA, true)

        this.player6 = this.physics.add.sprite(this.playerPos[5].x, this.playerPos[5].y, 'player6');
        this.playerInit(this.player6, this.teamA, true)
        

        

        this.enemy1 = this.physics.add.sprite(this.enemyPos[0].x, this.enemyPos[0].y, 'enemy1');
        this.playerInit(this.enemy1, this.teamB, true)


        this.enemy2 = this.physics.add.sprite(this.enemyPos[1].x, this.enemyPos[1].y, 'enemy2');
        this.playerInit(this.enemy2, this.teamB, true)

        this.enemy3 = this.physics.add.sprite(this.enemyPos[2].x, this.enemyPos[2].y, 'enemy3');
        this.playerInit(this.enemy3, this.teamB, true)

        this.enemy4 = this.physics.add.sprite(this.enemyPos[3].x, this.enemyPos[3].y, 'enemy4');
        this.playerInit(this.enemy4, this.teamB, false)

        this.enemy5 = this.physics.add.sprite(this.enemyPos[4].x, this.enemyPos[4].y, 'enemy5');
        this.playerInit(this.enemy5, this.teamB, false)

        this.enemy6 = this.physics.add.sprite(this.enemyPos[5].x, this.enemyPos[5].y, 'enemy6');
        this.playerInit(this.enemy6, this.teamB, false)
        

        this.ball = this.physics.add.sprite(400,300,'ball');
        this.ball.setCircle(6.5)
        this.ball.setOffset(18.5,18.5)
        this.ball.setScale(2.2);
        this.ball.setBounce(0.2);
        this.ball.setFriction(100);


        
        this.physics.add.collider(this.player1, block);
        this.physics.add.collider(this.player1, background);
        this.physics.add.collider(this.ball, block);
        this.physics.add.collider(this.ball, background);
        this.physics.add.overlap(this.player1, this.ball);

        
        
        this.both = this.physics.add.group();

        const camera = this.cameras.main;
        
        camera.startFollow(this.ball, 0, 0.1, 0, 0, 0);
        camera.setBounds(0, 0, court.widthInPixels, court.heightInPixels);

        
       // anims
       this.anims.create({
            key: 'player1-walk',
            frames: this.anims.generateFrameNumbers('player1', { start: 1, end: 2 }),
            frameRate: 10,
            repeat: 0
        })
        this.anims.create({
            key: 'player1-run',
            frames: this.anims.generateFrameNumbers('player1', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: 0
        })

        this.anims.create({
            key: 'player1-turn',
            frames: this.anims.generateFrameNumbers('player1', { start: 0, end: 0 }),
            frameRate: 5,
            repeat: 0
        })
       
        this.anims.create({
            key: 'player1-throw',
            frames: this.anims.generateFrameNumbers('player1', { start: 30, end: 31 }),
            duration: 200,
            repeat: 0
        })
        this.anims.create({
            key: 'player1-pick',
            frames: this.anims.generateFrameNumbers('player1', { start: 53, end: 53 }),
            duration: 250,
            repeat: 0
        })

        this.anims.create({
            key: 'player1-jump',
            frames: this.anims.generateFrameNumbers('player1', { start: 8, end: 9 }),
            repeat: 0
        })
        
        this.anims.create({
            key: 'player1-hitted',
            frames: this.anims.generateFrameNumbers('player1', { start: 32, end: 37 }),
            // frameRate: 10,
            duration: 1000,
            repeat: 0
        })
        this.anims.create({
            key: 'player1-hitted-back',
            frames: this.anims.generateFrameNumbers('player1', { start: 147, end: 148 }),
            // frameRate: 10,
            duration: 1000,
            repeat: 0
        })
        this.anims.create({
            key: 'player1-hit-down',
            frames: this.anims.generateFrameNumbers('player1', { start: 148, end: 152 }),
            repeatDelay: 1000,
            duration: 1000,
            repeat: 0
        })
        this.anims.create({
            key: 'player1-hit-down2',
            frames: this.anims.generateFrameNumbers('player1', { start: 152, end: 152 }),
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
            key: 'player1-catch',
            frames: this.anims.generateFrameNumbers('player1', { start: 76, end: 76 }),
            frameRate: 10,
            repeat: 0
        })

        // enemy1 anims
        this.anims.create({
            key: 'enemy1-turn',
            frames: this.anims.generateFrameNumbers('enemy1', { start: 0, end: 0 }),
            frameRate: 5,
            repeat: 0
        })
        this.anims.create({
            key: 'enemy1-walk',
            frames: this.anims.generateFrameNumbers('enemy1', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'enemy1-run',
            frames: this.anims.generateFrameNumbers('enemy1', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        })       
        this.anims.create({
            key: 'enemy1-hitted',
            frames: this.anims.generateFrameNumbers('enemy1', { start: 28, end: 30 }),
            duration: 200,
            repeat: 0
        })
        this.anims.create({
            key: 'enemy1-pick',
            frames: this.anims.generateFrameNumbers('enemy1', { start: 14, end: 14 }),
            duration: 250,
            repeat: 0
        })
        this.anims.create({
            key: 'enemy1-jump',
            frames: this.anims.generateFrameNumbers('enemy1', { start: 8, end: 9 }),
            repeat: 0
        })

        //player2
        this.anims.create({
            key: 'player2-walk',
            frames: this.anims.generateFrameNumbers('player2', { start: 0, end: 30 }),
            repeat: 0,
            frameRate:5
        })



        // this.player2.anims.play('player2-walk')



        this.throw =(direct) => {
            
                this.both.clear();
                this.ball.setFrictionX(0)
                this.ball.setDamping(false);
                this.ball.setAcceleration(0,0);
                this.ball.setBounce(0, 0);
                this.state.current = this.player1;
                let speedX;
                if(direct==='right'){
                    speedX =160;
                }else{speedX=-160}
                this.tweens.add({
                    targets: this.player1,
                    ease: 'linear',
                    delay:0,
                    duration: 1000,
                    yoyo: true,
                    repeat: 0,
                    onStart:  ()=> {this.player1.anims.play('player1-throw')},
                    completeDelay: 100,
                    onComplete:  ()=>{
                        this.ball.setVelocityX(speedX).setCollideWorldBounds(true);
                        if(this.player1.x <390 && this.player1.x>340 && this.ball.body.velocity.x > 159.5){
                            let ballAnime = 'magic-ball' + Math.ceil(Math.random() * 3)
                            this.ball.anims.play(ballAnime)
                        }else{this.ball.anims.play('normal-ball')}
                        this.state.isThrow = false;
                        this.state.haveBall = false;
                    },
                })
        }

        this.test = this.physics.add.overlap(this.player1, this.ball, null,()=>{
            if(this.state.turn === 'enemy' && this.ball.x < this.player1.x + 24){
                this.player1.setVelocityX(-800);

                this.player1.anims.play('player1-hit-down', true);
                this.player1.anims.chain('player1-hit-down2');
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
            canThrow:true,
            onFloor: true,
            isJump: false,
            flipX: false,
            current: this.player1,
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
        
      
        



        
        this.player1.on('animationcomplete',function(){this.player1.anims.play('player1-turn')},this);
        this.player1.on('animationcomplete-player1-hit-down2',function(){this.state.isActive=true},this);
        this.enemy1.on('animationcomplete',function(){this.enemy1.anims.play('enemy1-turn')},this);
        
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
        // this.player1.body.setVelocity(0);
        
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

        

        this.state.flipX ? this.player1.setOffset(16,15)  : this.player1.setOffset(29,15) ;
        
        if(this.state.isActive){
            if(input.right && this.state.isRun === true ){
            
            this.state.haveBall ? this.ball.x = this.player1.x + 24 : this.ball.x

            this.state.flipX = false;
            this.state.current.setVelocityX(160);
            this.player1.anims.play('player1-run', true);
            this.player1.flipX = this.state.flipX;
            }
            else if(input.right){
                this.state.haveBall ? this.ball.x = this.player1.x + 24 : this.ball.x

                this.state.flipX = false;
                this.state.current.setVelocityX(100);
                this.player1.anims.play('player1-walk', true);
                this.player1.flipX = this.state.flipX;
            }
            if (input.left && this.state.isRun === true){

                this.state.haveBall ? this.ball.x = this.player1.x - 24 : this.ball.x


                this.state.flipX = true
                this.state.current.setVelocityX(-160);
                this.player1.anims.play('player1-run',true);
                this.player1.flipX = this.state.flipX;
            }
            else if (input.left){

                this.state.haveBall ? this.ball.x = this.player1.x - 24 : this.ball.x

                this.state.flipX = true;
                this.state.current.setVelocityX(-100);
                this.player1.anims.play('player1-walk',true);
                
                this.player1.flipX = this.state.flipX;;
            }
            if (input.up && this.state.isRun === true && this.state.onFloor){

                
                this.state.current.setVelocityY(-100);
                this.player1.anims.play('player1-run',true);
                this.player1.flipX = this.state.flipX;

                this.state.haveBall ? this.ball.y = this.player1.y : this.ball.y
            }
            else if (input.up && this.state.onFloor){

                // this.state.haveBall ? this.ball.y = this.player1.y : this.ball.y

                this.state.current.setVelocityY(-100);
                this.player1.anims.play('player1-walk',true);
                this.player1.flipX = this.state.flipX;

                this.state.haveBall ? this.ball.y = this.player1.y : this.ball.y
            }


            if (input.down && this.state.isRun === true && this.state.onFloor){

                

                this.state.current.setVelocityY(100);
                this.player1.anims.play('player1-run',true);
                this.player1.flipX = this.state.flipX;

                this.state.haveBall ? this.ball.y = this.player1.y : this.ball.y

            }
            else if (input.down && this.state.onFloor){

                this.state.current.setVelocityY(100);
                this.player1.anims.play('player1-walk', true);
                this.player1.flipX = this.state.flipX;

                this.state.haveBall ? this.ball.y = this.player1.y : this.ball.y

            }


            if (input.x && input.z && this.state.onFloor){
                this.state.onFloor = false;
                this.state.canThrow = false;
                this.state.y = this.player1.y;

                // console.log(this.state.active.getChildren())
                // this.state.active.setAccelerationY(500)
                if(this.state.current.children){
                    let arr = this.state.current.getChildren();
                    arr.forEach((el)=>{el.setAccelerationY(500)})
                }
                else{this.state.current.setAccelerationY(500);} 
                
                this.state.current.setVelocityY(-300);
                this.player1.anims.play('player1-jump');
                this.state.haveBall ? this.ball.y = this.player1.y : this.ball.y
                this.player1.flipX = this.state.flipX;
                this.state.isJump = true;
                        
            }
            else if(this.state.isJump && this.player1.y > this.state.y ){
                
                this.state.current.setVelocityY(0);

                if(this.state.current.children){
                    let arr = this.state.current.getChildren();
                    arr.forEach(el=>{el.setAccelerationY(0)})
                }
                else{this.state.current.setAccelerationY(0);} 

                this.state.onFloor = true;
                this.state.isJump = false;
            }
            else if (this.state.haveBall && Phaser.Input.Keyboard.JustDown(this.keys.z) && this.state.canThrow){
                this.player1.anims.play('player1-throw')
                this.throw('right');
                this.state.isThrow = true;
            }
            else if (Phaser.Input.Keyboard.JustDown(this.keys.z)){
                this.catchBall()
            }
            else if(!this.state.isJump && Phaser.Input.Keyboard.JustDown(this.keys.x) && !this.state.haveBall ){
                
                this.player1.anims.play('player1-pick');
                if(this.player1.body.touching.up){
                    this.pickBall()
                }
            }
        }

    


        if(this.state.isJump){
            if(this.player1.body.velocity.y < 20 && this.player1.body.velocity.y > -10){
                this.state.canThrow = true;
            }
            this.player1.anims.play('player1-jump')
            
        }
        if(this.state.isThrow){
            this.player1.anims.play('player1-throw')
        }
        
        if(this.ball.body.velocity.x === 0){
            this.ball.setAccelerationX(0)
            // this.ball.anims.play('normal-ball')
        }
        // if(this.ball.y > this.player1.y + 20){
        //     this.ball.setAccelerationY(0)
        //     this.ball.body.stop()
        // }


        if(this.ball.body.velocity.x === 0 && this.ball.body.x > 600){
            
            this.tweens.add({
                targets: this.enemy1,
                x: this.ball.x,
                y: this.ball.y -30,
                ease: 'linear',
                delay:200,
                duration: 1000,
                repeat: 0,
                onStart: ()=>{
                    this.enemy1.flipX = false;
                    this.enemy1.anims.play('enemy1-walk', true)
                },
                onComplete: ()=>{
                    this.enemy1.flipX = true;
                    this.enemy1.anims.play('enemy1-turn', true)
                    this.state.turn = 'enemy'
                    this.throw('left')
                    this.test.active= true;
                }
            })
        }
    }

    playerInit(player, team, flipX){
        team.add(player);
        player.setSize(18,33);
        player.setOffset(23,22);
        player.setScale(1.8);
        player.setDamping(true);
        player.body.setDrag(0.9,0.9);
        player.flipX = flipX;
    }

    changeCurrent(){
        let dist = this.teamA.getChildren().map(el=>{
            return Math.abs(this.ball.x + this.ball.y - el.x -el.y);
        })
        let curIndex = dist.indexOf(Math.min(...dist))
        this.state.current = this.teamA.getChildren()[curIndex]
    }

    pickBall(){
        this.state.haveBall = true;
        this.state.current = this.both
        this.both.add(this.player1)
        this.both.add(this.ball)
        this.tweens.add({
            targets: this.ball,
            x: this.player1.x + 24,
            y: this.player1.y ,
            ease: 'linear',
            delay:200,
            duration: 0,
            repeat: 0
        })
        
        this.player1.setDamping(true);
        this.player1.body.setDrag(0.90,0.90);
        this.player1.setFrictionX(1);
        this.ball.setDamping(true);
        this.ball.body.setDrag(0.90,0.90);
        this.ball.setFriction(1,100)
        
    }

    catchBall(){
        if(this.state.turn === 'enemy'){
            this.player1.anims.play('player1-catch')

            if(this.ball.x < this.player1.x + 40 && this.ball.x > this.player1.x + 30){
                this.state.haveBall = true;
                this.state.current = this.both
                this.both.add(this.player1)
                this.both.add(this.ball)
                this.tweens.add({
                    targets: this.ball,
                    x: this.player1.x +24,
                    y: this.player1.y -5,
                    ease: 'linear',
                    delay:0,
                    duration: 0,
                    repeat: 0
                })
                this.ball.anims.play('normal-ball')
                this.player1.setDamping(true);
                this.player1.body.setDrag(0.90,0.90);
                this.player1.setFrictionX(1);
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