import makeAnimations from './animations';

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
        
        
        this.load.image('tiles', '../materials/img/court4.png')
        this.load.tilemapTiledJSON('court', './materials/img/court3.json');

        this.load.on('complete', () => {
            // prepare all animations, defined in a separate file
            makeAnimations(this);
            // progress.destroy();
            // this.scene.start('TitleScene');
        });
    }
    
    create(){
        // 資源載入完成，加入遊戲物件及相關設定
        const court = this.make.tilemap({ key: "court" })
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload);
        const tileset = court.addTilesetImage('court4', 'tiles');
        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const background = court.createStaticLayer("background", tileset, 0, 0);
        const block = court.createStaticLayer("block", tileset, 0, 0);
        block.setCollisionByProperty({ collides: true });
        background.setCollisionByProperty({ collides: true });
        this.physics.world.bounds.setTo(100,200, 800,300);
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
        this.player1.name = 'player1';
        this.teamA.add(this.player1);
        this.player1.setSize(18,33);
        this.player1.setOffset(29,15);
        this.player1.setScale(2.0);
        this.player1.setDamping(true);
        this.player1.body.setDrag(0.9,0.5);

        this.player2 = this.physics.add.sprite(this.playerPos[1].x, this.playerPos[1].y, 'player2');
        this.player2.name = 'player2';
        this.playerInit(this.player2, this.teamA, false) // name group flipX

        this.player3 = this.physics.add.sprite(this.playerPos[2].x, this.playerPos[2].y, 'player3');
        this.player3.name = 'player3';
        this.playerInit(this.player3, this.teamA, false)
        
        this.player4 = this.physics.add.sprite(this.playerPos[3].x, this.playerPos[3].y, 'player4');
        this.player4.name = 'player4';
        this.playerInit(this.player4, this.teamA, true)

        this.player5 = this.physics.add.sprite(this.playerPos[4].x, this.playerPos[4].y, 'player5');
        this.player5.name = 'player5';
        this.playerInit(this.player5, this.teamA, true)

        this.player6 = this.physics.add.sprite(this.playerPos[5].x, this.playerPos[5].y, 'player6');
        this.player6.name = 'player6';
        this.playerInit(this.player6, this.teamA, true)
        

        

        this.enemy1 = this.physics.add.sprite(this.enemyPos[0].x, this.enemyPos[0].y, 'enemy1');
        this.enemy1.name = 'enemy1';
        this.playerInit(this.enemy1, this.teamB, true)


        this.enemy2 = this.physics.add.sprite(this.enemyPos[1].x, this.enemyPos[1].y, 'enemy2');
        this.enemy2.name = 'enemy2';
        this.playerInit(this.enemy2, this.teamB, true)

        this.enemy3 = this.physics.add.sprite(this.enemyPos[2].x, this.enemyPos[2].y, 'enemy3');
        this.enemy3.name = 'enemy3';
        this.playerInit(this.enemy3, this.teamB, true)

        this.enemy4 = this.physics.add.sprite(this.enemyPos[3].x, this.enemyPos[3].y, 'enemy4');
        this.enemy4.name = 'enemy4';
        this.playerInit(this.enemy4, this.teamB, false)

        this.enemy5 = this.physics.add.sprite(this.enemyPos[4].x, this.enemyPos[4].y, 'enemy5');
        this.enemy5.name = 'enemy5';
        this.playerInit(this.enemy5, this.teamB, false)

        this.enemy6 = this.physics.add.sprite(this.enemyPos[5].x, this.enemyPos[5].y, 'enemy6');
        this.enemy6.name = 'enemy6';
        this.playerInit(this.enemy6, this.teamB, false)
        

        this.ball = this.physics.add.sprite(400,300,'ball');
        this.ball.name = 'ball'
        this.ball.setCircle(6.5)
        this.ball.setOffset(18.5,18.5)
        this.ball.setScale(2.5);
        this.ball.setBounce(0);
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

        
       


        // this.player1.anims.play('player1-dodge');
        this.player2.anims.play('player2-tired');
        this.player3.anims.play('player3-tired');
        // this.player4.anims.play('player4-hit-down2');
        // this.enemy6.anims.play('enemy6-throw');


        this.throw =(direct) => {
                this.ball.body.stop();
                let speedX;
                if(direct){this.state.ballTo=direct}
                else{this.state.current.flipX? this.state.ballTo = 'left' : this.state.ballTo = 'right';}
                this.state.ballTo==='right'? speedX = 160 : speedX = -160;
                this.ball.setFriction(0);
                this.ball.setDamping(false);

                this.tweens.add({
                    targets: this.state.current,
                    ease: 'linear',
                    delay:0,
                    duration: 1000,
                    yoyo: true,
                    repeat: 0,
                    onStart:  ()=> {this.state.current.anims.play(`${this.state.current.name}-throw`)},
                    // completeDelay: -,
                    onComplete:  ()=>{
                        this.ball.setVelocityX(speedX).setCollideWorldBounds(true);
                        if(this.state.current.x <390 && this.state.current.x>340 && this.ball.body.velocity.x > 159.5){
                            let ballAnime = 'magic-ball' + Math.ceil(Math.random() * 3)
                            this.ball.anims.play(ballAnime)
                        }else{this.ball.anims.play('normal-ball')}
                        this.state.isThrow = false;
                        this.state.haveBall = false;
                    }
                })
                

                
        }
        //create collides
        this.teamA.getChildren().forEach(el=>{
            this.createCollideToTeamA(el, `hit_${el.name}`)
        })
        this.teamB.getChildren().forEach(el=>{
            this.createCollideToTeamB(el,  `hit_${el.name}`)
        })
        
        

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
            ballTo: 'right',
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
        
      
        



        
        this.state.current.on('animationcomplete',function(){this.state.current.anims.play(`${this.state.current.name}-turn`)},this);
        this.state.current.on(`animationcomplete`,function(){this.state.isActive=true},this);
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
        this.checkFace();
        // this.changeCurrent(time);

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

        

        this.state.flipX ? this.state.current.setOffset(16,15)  : this.state.current.setOffset(29,15) ;
        
        if(this.state.isActive){
            if(input.right && this.state.isRun === true ){
                if(this.state.haveBall){
                    this.ball.x = this.state.current.x +30;
                    this.ball.setVelocityX(160)
                }
                this.state.flipX = false;
                this.state.current.setVelocityX(160);
                this.state.current.anims.play(`${this.state.current.name}-run`, true);
                this.state.current.flipX = this.state.flipX;
            }
            else if(input.right){
                if(this.state.haveBall){
                    this.ball.x = this.state.current.x +30;
                    this.ball.setVelocityX(100)
                }
                this.state.flipX = false;
                this.state.current.setVelocityX(100);
                this.state.current.anims.play(`${this.state.current.name}-walk`, true);
                this.state.current.flipX = this.state.flipX;

                // this.ball.x = this.state.current.x
            }
            if (input.left && this.state.isRun === true){
                if(this.state.haveBall){
                    this.ball.x = this.state.current.x - 30;
                    this.ball.setVelocityX(-160)
                }
                this.state.flipX = true
                this.state.current.setVelocityX(-160);
                this.state.current.anims.play(`${this.state.current.name}-run`,true);
                this.state.current.flipX = this.state.flipX;
            }
            else if (input.left){
                if(this.state.haveBall){
                    this.ball.x = this.state.current.x - 30;
                    this.ball.setVelocityX(-100)
                }
                this.state.flipX = true;
                this.state.current.setVelocityX(-100);
                this.state.current.anims.play(`${this.state.current.name}-walk`,true);
                this.state.current.flipX = this.state.flipX;
            }
            if (input.up && this.state.onFloor){

                if(this.state.haveBall){
                    this.ball.setVelocityY(-100);
                    this.ball.y = this.state.current.y;
                }
                this.state.current.setVelocityY(-100);
                this.state.isRun 
                    ? this.state.current.anims.play(`${this.state.current.name}-run`,true) 
                    : this.state.current.anims.play(`${this.state.current.name}-walk`,true);
                this.player1.flipX = this.state.flipX;
            }
            if (input.down && this.state.onFloor){
                if(this.state.haveBall){
                    this.ball.setVelocityY(100);
                    this.ball.y = this.state.current.y;
                }
                this.state.current.setVelocityY(100);
                this.state.isRun 
                    ? this.state.current.anims.play(`${this.state.current.name}-run`,true) 
                    : this.state.current.anims.play(`${this.state.current.name}-walk`,true);
                this.player1.flipX = this.state.flipX;
            }

            if (input.x && input.z && this.state.onFloor){
                this.state.onFloor = false;
                this.state.canThrow = false;
                this.state.y = this.state.current.y;

                if(this.state.haveBall){
                    this.ball.setAccelerationY(500);
                    this.ball.setVelocityY(-300);
                }
                this.state.current.setAccelerationY(500);
                this.state.current.setVelocityY(-300);
                this.state.current.anims.play(`${this.state.current.name}-jump`);
                this.state.haveBall ? this.ball.y = this.state.current.y : this.ball.y
                this.state.current.flipX = this.state.flipX;
                this.state.isJump = true;
            }
            else if(this.state.isJump && this.state.current.y > this.state.y ){
                this.state.isJump = false;
                this.state.onFloor = true;
                if(this.state.haveBall){
                    this.ball.setVelocityY(0)
                    this.ball.setAccelerationY(0);
                }
                this.state.current.setAccelerationY(0);
                this.state.current.setVelocityY(0);
            }
            else if (this.state.haveBall && Phaser.Input.Keyboard.JustDown(this.keys.z) && this.state.canThrow){
                this.state.current.anims.play(`${this.state.current.name}-throw`)
                this.throw();
                this.state.isThrow = true;
            }
            else if (Phaser.Input.Keyboard.JustDown(this.keys.z)){
                this.catchBall()
            }
            else if(!this.state.isJump && Phaser.Input.Keyboard.JustDown(this.keys.x) && !this.state.haveBall ){
                this.state.current.anims.play(`${this.state.current.name}-pick`);
                if(this.state.current.body.touching.up){
                    this.pickBall()
                }
            }

            if(this.state.turn === 'enemy' && input.x){
                this.state.current.anims.play(`${this.state.current.name}-dodge`);
                this[`hit_${this.state.current.name}`].active = false;
            }else if (this.state.turn === 'enemy' && Phaser.Input.Keyboard.JustUp(this.keys.x)){
                this[`hit_${this.state.current.name}`].active = true;
            }
        }

    


        if(this.state.isJump){
            if( Math.abs(this.state.current.body.velocity.y)  < 10 ){
                this.state.canThrow = true;
            }
            this.state.current.anims.play(`${this.state.current.name}-jump`)
            
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
                    this[`hit_${this.state.current.name}`].active= true;
                }
            })
        }


        //for testing
        if(input.x){
            // console.log(this.state.isActive)
        }
    }

    playerInit(player, team, flipX){
        team.add(player);
        player.setSize(18,33);
        player.setOffset(23,22);
        player.setScale(2);
        player.setDamping(true);
        player.body.setDrag(0.9,0.5);
        player.flipX = flipX;
    }

    changeCurrent(time){
        if(time%1000 < 1){
            let dist = this.teamA.getChildren().map(el=>{
                return Math.abs(this.ball.x + this.ball.y - el.x -el.y);
            })
            let curIndex = dist.indexOf(Math.min(...dist))
            this.state.current = this.teamA.getChildren()[curIndex]
            console.log(time)
        }
        
    }

    checkFace(){
        this.teamA.getChildren().forEach(el=>{
            if(el !== this.state.current){
                el.x < this.ball.x ? el.flipX=false : el.flipX =true;
            }
           
        })
        this.teamB.getChildren().forEach(el=>{
            if(el !== this.state.current){
                el.x < this.ball.x ? el.flipX=false : el.flipX =true;
            }
            
        })
    }

    pickBall(){
        this.state.haveBall = true;
        this.tweens.add({
            targets: this.ball,
            x: this.state.flipX?   this.state.current.x - 30 : this.state.current.x + 30,
            y: this.state.current.y ,
            ease: 'linear',
            delay:200,
            duration: 0,
            repeat: 0
        })
        // this.player1.setDamping(true);
        // this.player1.body.setDrag(0.90,0.90);
        // this.player1.setFrictionX(1);
        this.ball.setDamping(true);
        this.ball.body.setDrag(0.9,0.5);
        this.ball.setFriction(1,100)
    }

    catchBall(){
        if(this.state.turn === 'enemy'){
            this.state.current.anims.play(`${this.state.current.name}-catch`)
            //從右邊來的球
            if(this.state.ballTo==='left'){
                if(this.ball.x > this.state.current.x + 30 && this.ball.x < this.state.current.x + 60){
                    this.state.haveBall = true;
                    this.tweens.add({
                        targets: this.ball,
                        x: this.state.current.x +30,
                        y: this.state.current.y -5,
                        ease: 'linear',
                        delay:0,
                        duration: 0,
                        repeat: 0
                    })
                    this.ball.anims.play('normal-ball');
                    this.ball.body.stop();
                    this.state.turn = 'us'
                }

            //從左邊來的球
            }else{
                if(this.ball.x > this.state.current.x - 50 && this.ball.x < this.state.current.x - 30){
                    this.state.haveBall = true;
                    this.tweens.add({
                        targets: this.ball,
                        x: this.state.current.x -30,
                        y: this.state.current.y -5,
                        ease: 'linear',
                        delay:0,
                        duration: 0,
                        repeat: 0
                    })
                    this.ball.anims.play('normal-ball');
                    this.ball.body.stop();
                    this.state.turn = 'us'

                }
            }
            
        }
        
    }

    dodge(){
        this.state.current.anims.play(`${this.state.current.name}-dodge`)
    }

    createCollideToTeamA(obj,cName){
        this[cName] = this.physics.add.overlap(obj, this.ball, null,(e)=>{
            if(this.state.turn === 'enemy' ){
                if(this.state.ballTo==='left'){
                    if(this.ball.x < e.x +24 && !e.flipX ){
                        e.setVelocityX(-800);
                        e.anims.play(`${e.name}-hit-down`, true); 
                        e.anims.chain(`${e.name}-hit-down-2`);
                        this[`hit_${e.name}`].active = false;
                        this.state.turn = 'us';      
                    }else if(this.ball.x < obj.x +24 && e.flipX){
                        e.setVelocityX(-800);
                        e.anims.play(`${e.name}-hit-down2`, true); 
                        // obj.anims.chain(`${obj.name}-hit-down-2`);
                        this[`hit_${e.name}`].active = false;
                        this.state.turn = 'us';    
                    }
                }else {
                    if(this.ball.x > e.x -24 && e.flipX){
                        e.setVelocityX(800);
                        e.anims.play(`${e.name}-hit-down`, true);
                        // obj.anims.chain(`${obj.name}-hit-down-2`);
                        this[`hit_${e.name}`].active = false;
                        this.state.turn = 'us';   
                    }else if (this.ball.x > e.x -24 && !e.flipX){
                        e.setVelocityX(800);
                        e.anims.play(`${e.name}-hit-down2`, true);
                        this[`hit_${e.name}`].active = false;
                        this.state.turn = 'us';   
                    }
                }
                // this[`hit_${e.name}`].active = false;
                this.state.isActive = false;
               
            }
           
        });
    }

    createCollideToTeamB(obj,cName){
        this[cName] = this.physics.add.overlap(obj, this.ball, null,(e)=>{
            if(this.state.turn === 'us'){
                if(this.state.ballTo==='left'){
                    if(this.ball.x < e.x +24 && !e.flipX ){
                        e.setVelocityX(-800);
                        e.anims.play(`${e.name}-hit-down`, true); 
                        e.anims.chain(`${e.name}-hit-down-2`);
                        this[`hit_${e.name}`].active = false;
                        this.state.turn = 'enemy';     
                    }else if(this.ball.x < obj.x +24 && e.flipX){
                        e.setVelocityX(-800);
                        e.anims.play(`${e.name}-hit-down2`, true); 
                        // obj.anims.chain(`${obj.name}-hit-down-2`);
                        this[`hit_${e.name}`].active = false; 
                        this.state.turn = 'enemy';  
                    }
                }else {
                    if(this.ball.x > e.x -24 && e.flipX){
                        e.setVelocityX(800);
                        e.anims.play(`${e.name}-hit-down`, true);
                        // obj.anims.chain(`${obj.name}-hit-down-2`);
                        this[`hit_${e.name}`].active = false;
                        this.state.turn = 'enemy';  
                    }else if (this.ball.x > e.x -24 && !e.flipX){
                        e.setVelocityX(800);
                        e.anims.play(`${e.name}-hit-down2`, true);
                        this[`hit_${e.name}`].active = false;
                        this.state.turn = 'enemy';  
                    }
                }
                // this[`hit_${e.name}`].active = false;
                 
            }
           
        });
    }

}

export default GameScene;