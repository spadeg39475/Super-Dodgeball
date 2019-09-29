import makeAnimations from './animations';
import setState from './setState';
import Player1_Control from './Player1_Control';
import Player2_Control from './Player2_Control';
import Player3_Control from './Player3_Control';
import Player4_Control from './Player4_Control';
import Player5_Control from './Player5_Control';
import Player6_Control from './Player6_Control';
import Enemy_Control from './Enemy_Control';
// import GameOver from './GameOver';

class GameScene extends Phaser.Scene{

    constructor(test){
        super({
            key: 'GameScene'
        });
    }

    preload(){
        // 載入資源
        this.load.spritesheet('ball', './materials/img/ball.png', {frameWidth: 50, frameHeight: 50});
        
        this.load.spritesheet('player1', './materials/img/character/Kunio/Kunio.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('player2', './materials/img/character/Nanase/Nanase.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('player3', './materials/img/character/Saotome/Saotome2.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('player4', './materials/img/character/Sugata/Sugata.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('player5', './materials/img/character/Sawaguchi/Sawaguchi2.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('player6', './materials/img/character/Gouda/Gouda2.png', {frameWidth:64, frameHeight: 64});
        
        this.load.spritesheet('enemy1', './materials/img/character/Hira/Hira2.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('enemy2', './materials/img/character/Kinoshita/Kinoshita.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('enemy3', './materials/img/character/Onizuka/Onizuka.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('enemy4', './materials/img/character/Kobayashi/Kobayashi.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('enemy5', './materials/img/character/Wataru/Wataru2.png', {frameWidth:64, frameHeight: 64});
        this.load.spritesheet('enemy6', './materials/img/character/Yamada/Yamada.png', {frameWidth:64, frameHeight: 64});

        this.load.image('tiles', './materials/img/court4.png')
        this.load.tilemapTiledJSON('court', './materials/img/court3.json');
        // this.load.audio('matchStart',[
        //     './materials/audio/06 - Match Start.ogg',
        //     './materials/audio/06 - Match Start.mp3'
        // ]);
        this.load.audio('gamePlay', [
            './materials/audio/Track9.ogg',
            './materials/audio/Track9.mp3'
        ]);
        this.load.audio('gameStart', [
            './materials/audio/Track 18.ogg',
            './materials/audio/Track 18.mp3'
        ]);
        this.load.audio('gameWin', [
            './materials/audio/Track 19.ogg',
            './materials/audio/Track 19.mp3'
        ]);
        this.load.audio('gameLose', [
            './materials/audio/Track 20.ogg',
            './materials/audio/Track 20.mp3'
        ]);
        
        this.load.audio('sfx', [
            './materials/audio/sounds/sfx.ogg',
            './materials/audio/sounds/sfx.mp3'
        ],{
            instances: 4
        }
        );
    
        this.markers = [
            {name: 'throw', start: 0, duration: 1.3, config: {} },
            {name: 'throw-magic', start: 1.5, duration: 2.8, config: {} },
            {name: 'throw-magic2', start: 57.59, duration:2.89, config: {} },
            {name: 'catch', start: 10.35, duration:1.12, config: {} },
            {name: 'jump', start: 7.56, duration: 1.19, config: {} },
            {name: 'pass', start: 35.77, duration: 1.18, config: {} },
            {name: 'hit', start: 44.28, duration: 1.32, config: {} },
            {name: 'pause', start: 22.76, duration: 1.69, config: {} },
            {name: 'run', start: 11.71, duration: 1.28, config: {volume:1} },
            {name: 'pick', start: 41.43, duration: 1.18, config: {volume: 0.5} }
        ]


        this.load.on('complete', () => {
            // prepare all animations, defined in a separate file
            makeAnimations(this);
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
        this.physics.world.bounds.setTo(45,265, 1000,250);
        this.physics.world.setBoundsCollision(true);
        
        this.count = 0;
        
        
    


        let gameLose = this.sound.add('gameLose');
        let gameWin = this.sound.add('gameWin');
        let gameStart = this.sound.add('gameStart');
        let gamePlay;

        gameStart.play();
        // gameStart.setMute(true);
        gameStart.once('complete', ()=>{
            gamePlay = this.sound.add('gamePlay',{volume: 1});
            gamePlay.play();
            gamePlay.setLoop(true);
            this.state.isStart = true;
        });

        gameWin.once('complete', ()=>{
            this.scene.sleep();
            this.scene.start('GameOver')
        });

        gameLose.once('complete', ()=>{
            this.scene.sleep()
            this.scene.start('GameOver')
        });
        
        
        // music.setLoop(true);

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
        

        this.ball = this.physics.add.sprite(400,400,'ball');
        this.ball.name = 'ball'
        this.ball.setCircle(6.5)
        this.ball.setOffset(18.5,18.5)
        this.ball.setScale(2.5);
        this.ball.setBounce(0);
        this.ball.setFriction(100);
        this.ball.body.setDrag(0.9,0.5);
        this.ball.setDamping(true);
        this.ball.body.onWorldBounds = true;
        // this.ball.setCollideWorldBounds(true);


        this.physics.add.collider(this.ball, block);
        this.physics.add.collider(this.ball, background, ()=>{
            this.ball.setDamping(true);
            this.ball.body.setDrag(0.9,0.5);
            this.inactiveCollides(this.teamA);
            this.inactiveCollides(this.teamB);
        });
        
        
        this.teamA.getChildren().forEach(el=>{
            this.physics.add.collider(el,block);
            this.physics.add.collider(el, background);
            this.physics.add.overlap(el, this.ball);
        })
        this.teamB.getChildren().forEach(el=>{
            this.physics.add.collider(el,block);
            this.physics.add.collider(el, background);
            this.physics.add.overlap(el, this.ball);
        })

        this.both = this.physics.add.group();

        const camera = this.cameras.main;
        
        camera.startFollow(this.ball, 0, 0.1, 0, 0, 0);
        camera.setBounds(0, 0, court.widthInPixels, court.heightInPixels);

        
        this.physics.world.on('worldbounds', ()=>{
            console.log('123123')
            this.ball.setDamping(true);
            this.ball.setAccelerationY(0);
            this.ball.state.ballFrom = '';
            this.state.turn='';
            this.inactiveCollides(this.teamA);
            this.inactiveCollides(this.teamB);
            this.ball.anims.play('normal-ball');
            this.teamB.getChildren().forEach(el=>el.state.haveBall=false);
        })

        
        
        
        // create collides
        this.teamA.getChildren().forEach(el=>{
            this.createCollideToTeamA(el, `hit_${el.name}`)
        })
        this.teamB.getChildren().forEach(el=>{
            this.createCollideToTeamB(el,  `hit_${el.name}`)
        })
        


        setState(this);


        //set name & hp text
        this.add.text(100,30, 'くにお', {fontSize: '20px'}).setScrollFactor(0)
        this.add.text(100,60, 'ななせ', {fontSize: '20px'}).setScrollFactor(0)
        this.add.text(100,90, 'さおとめ', {fontSize: '20px'}).setScrollFactor(0)

        this.add.text(450,30, 'ひら', {fontSize: '20px'}).setScrollFactor(0)
        this.add.text(450,60, 'きのした', {fontSize: '20px'}).setScrollFactor(0)
        this.add.text(450,90, 'おにズカ', {fontSize: '20px'}).setScrollFactor(0)

        this.currentPlayer = this.add.text(this.state.current.x +5, this.state.current.y-60, '1', {fontSize: '20px', strokeThickness:2})
        this.currentPlayer.setShadow(2, 2, "#333333", 2, true, true);
        
        this.tag1 = this.add.text(80,28, '1',{fontSize: '20px', color: '#1E90FF'}).setScrollFactor(0)
        this.tag1.setStroke('#1E90FF',2)

        this.tag2 = this.add.text(430,28, 'C',{fontSize: '20px', color: '#1E90FF'}).setScrollFactor(0)
        this.tag2.setStroke('#1E90FF',2)

        this.hp1 =  this.add.text(200,25, '|||||||||', {
            fontSize: '20px', 
            color: '#00BFFF',
            stroke: '#00BFFF',
            strokeThickness: 4,   
        }).setScrollFactor(0)
        this.hp1.setShadow(2, 2, "#00008B", 0, true, true);

        this.hp2 =  this.add.text(200,55, '|||||||', {
            fontSize: '20px', 
            color: '#00BFFF',
            stroke: '#00BFFF',
            strokeThickness: 4,   
        }).setScrollFactor(0)
        this.hp2.setShadow(2, 2, "#00008B", 0, true, true);

        this.hp3 =  this.add.text(200,85, '|||||||', {
            fontSize: '20px', 
            color: '#00BFFF',
            stroke: '#00BFFF',
            strokeThickness: 4,   
        }).setScrollFactor(0)
        this.hp3.setShadow(2, 2, "#00008B", 0, true, true);

        this.hp4 =  this.add.text(550,25, '||||||||||', {
            fontSize: '20px', 
            color: '#00BFFF',
            stroke: '#00BFFF',
            strokeThickness: 4,   
        }).setScrollFactor(0)
        this.hp4.setShadow(2, 2, "#00008B", 0, true, true);

        this.hp5 =  this.add.text(550,55, '||||||||', {
            fontSize: '20px', 
            color: '#00BFFF',
            stroke: '#00BFFF',
            strokeThickness: 4,   
        }).setScrollFactor(0)
        this.hp5.setShadow(2, 2, "#00008B", 0, true, true);

        this.hp6 =  this.add.text(550,85, '||||||||||', {
            fontSize: '20px', 
            color: '#00BFFF',
            stroke: '#00BFFF',
            strokeThickness: 4,   
        }).setScrollFactor(0)
        this.hp6.setShadow(2, 2, "#00008B", 0, true, true);




        // this.passTween = this.tweens.timeline();


        //鍵盤控制
        // this.gamePlaykeys = this.input.keyboard.addKeys('RIGHT, LEFT, UP , DOWN, Z, X');
        this.keys = {
            z: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
            x: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            enter: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
        }
      

        
       
        // this.input.keyboard.on('keydown-' + 'Z', ()=>{this.sound.play('sfx', this.markers[0]);} );
        // this.input.keyboard.on('keydown-' + 'X', ()=>{this.sound.play('sfx', this.markers[1]);} );
        
      
        

        this.teamA.getChildren().forEach(el=>{
            el.on('animationstart-' + `${el.name}-pick`,()=>{this.sound.play('sfx', this.markers[9])});
            el.on('animationcomplete', ()=>{
                el.anims.play(`${el.name}-turn`)},this);
            el.on('animationcomplete-' + `${el.name}-throw`, ()=>{
                el.state.isThrow=false; },this);
            el.on('animationcomplete-' + `${el.name}-jump-throw`, ()=>{
                el.state.isThrow=false; },this);
            el.on('animationcomplete-' + `${el.name}-hit-down-2`, ()=>{
                el.state.isActive=true; },this);
            el.on('animationcomplete-' + `${el.name}-hit-down2-2`, ()=>{
                el.state.isActive=true; },this);
            el.on('animationcomplete-' + `${el.name}-die`, ()=>{
               
                this.destroyPlayer(el);
            },this);
            el.on('animationcomplete-' + `${el.name}-die2`, ()=>{
                
                this.destroyPlayer(el);
            },this);
        })

        this.teamB.getChildren().forEach(el=>{
            el.on('animationcomplete', ()=>{
                el.anims.play(`${el.name}-turn`)
            },this);
            el.on('animationcomplete-' + `${el.name}-throw`, ()=>{
                el.state.isThrow=false; },this);
            el.on('animationcomplete-' + `${el.name}-hit-down-2`, ()=>{
                el.state.isActive=true;},this);
            el.on('animationcomplete-' + `${el.name}-hit-down2-2`, ()=>{
                el.state.isActive=true},this);
            el.on('animationcomplete-' + `${el.name}-die`, ()=>{
                
                this.destroyPlayer(el);
            },this);
            el.on('animationcomplete-' + `${el.name}-die2`, ()=>{
                
                this.destroyPlayer(el);
            },this);


        })
        

        this.player5.once('animationstart-' +　'player5-win',()=>{
            gamePlay.stop();
            gameWin.play();
        },this)
        this.player5.once('animationstart-' +　'player5-lose',()=>{
            gamePlay.stop();
            gameLose.play();
        },this)
       


        console.log(this)
        

        this.checkRun = () => {
            if(this.state.turn!=='over' && this.teamA.getChildren().length>3){
                if ((this.keys.right.duration > 0 && this.keys.right.duration < 100) || (this.keys.left.duration > 0 && this.keys.left.duration < 100)  ){
                    this.state.current.state.isRun = true;
                    
                }
                else if (this.keys.right.isUp && this.keys.left.isUp){
                    this.state.current.state.isRun = false;
                }
            }
           
        }
        
        
        
    
    
        // this.player1.anims.play('player1-pass');
        
        this.timedEvent1 = this.time.addEvent({delay: 1000, callback: this.changeCurrent, callbackScope:this, loop: true});
        // this.timedEvent1 = this.time.addEvent({delay: 1000, callback: ()=>{this.count=0}, callbackScope:this, loop: true});
        // this.timedEvent2 = this.time.addEvent({delay: 3000, callback: ()=>{
        //     if(this.state.turn !== 'over' ){
        //         this.state.current.state.isActive = true;
        //         // this.state.enemy.state.canThrow = true;
        //     }
        // }, callbackScope:this, loop: true});
        
        this.depthInit();
        this.timer = 0;
    }

    update(time, delta){
        // 遊戲狀態更新
        

         //鍵盤控制
        let input = {
            left: this.keys.left.isDown,
            right:this.keys.right.isDown,
            up: this.keys.up.isDown,
            down: this.keys.down.isDown,
            z: this.keys.z.isDown,
            x: this.keys.x.isDown,
            enter: this.keys.enter.isDown
        }
        if(this.state.turn !== 'over' && this.state.isStart){

            if(this.teamA.getChildren().length === 3 ||this.teamB.getChildren().length === 3){
                this.state.turn = 'over';
                this.currentPlayer.x =-100;
                this.currentPlayer.y = -100;
                return;
            }
            
            // this.changeCurrent(time);
            
            Player1_Control(this, input);
            Player2_Control(this, input);
            Player3_Control(this, input);
            Player4_Control(this, input);
            Player5_Control(this, input);
            Player6_Control(this, input);

            this.teamA.getChildren().forEach(el=>{
                if(el.state.haveBall){
                    this.teamB.getChildren().forEach(el=>{
                        el.state.haveBall=false;
                        this[`hit_${el.name}`].active = false;
                    })
                }
            })
            this.teamB.getChildren().forEach(el=>{
                if(el.state.haveBall){
                    this.teamA.getChildren().forEach(el=>el.state.haveBall=false)
                }
            })

            this.updateText();
            this.checkRun();
            this.checkFace();

            if(this.state.current.state.alive){
                if(this.state.current===this.player1){
                    this.state.current.flipX ? this.state.current.setOffset(16,15)  : this.state.current.setOffset(29,15) ;
                }else{
                    this.state.current.flipX ? this.state.current.setOffset(22,23)  : this.state.current.setOffset(24,23) ;
                }
                this.state.current.setDepth(1);
            }
           
            Enemy_Control(this,time,delta);
            this.teammateControl();

            if(this.ball.body.velocity.x ===0){
                this.ball.anims.play('normal-ball');
                this.inactiveCollides(this.teamA);
                this.inactiveCollides(this.teamB);  
            }

        }
        else if (this.state.turn === 'over'){
            
            // this.timedEvent2.paused = true;
            // this.enemyAction.pause();
            // this.enemyActionPick.pause();
            // this.enemyActionThrow.pause();
            if(this.teamA.getChildren().length === 3){
                this.teamA.getChildren().forEach(el=>{
                    el.anims.play(`${el.name}-lose`,true);
                })
                this.teamB.getChildren().forEach(el=>{
                    el.anims.play(`${el.name}-win`,true);
                })
                this.cameras.main.centerOnX(800);
            }else{
                this.teamA.getChildren().forEach(el=>{
                    el.anims.play(`${el.name}-win`,true);
                })
                this.teamB.getChildren().forEach(el=>{
                    el.anims.play(`${el.name}-lose`,true);
                })
                this.cameras.main.centerOnX(100);
            }
            
            // setTimeout(()=>{
            //     this.scene.pause()
            //     this.scene.start('GameOver')
            // },5000)
            
        }
        
        

        //for testing
        if(input.x ){
            
            
        }
        if(input.enter){
            console.log('state:', this.state)
            console.log('ballstate:', this.ball)
            console.log('enemy',this.state.enemy)
            console.log('player',this.state.current)
            console.log(this.player2.x,this.player2.y)
            console.log(this.ball.x,this.ball.y)
            console.log('enemy5', this.enemy5);
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

    depthInit(){
        this.player4.setDepth(0);
        this.enemy4.setDepth(0);
        this.player1.setDepth(0);
        this.player2.setDepth(0);
        this.player3.setDepth(0);
        this.enemy1.setDepth(0);
        this.enemy2.setDepth(0);
        this.enemy3.setDepth(0);
        this.player5.setDepth(0);
        this.enemy5.setDepth(0);
        this.player6.setDepth(10);
        this.enemy6.setDepth(10);
        this.state.current.setDepth(1);
        this.ball.setDepth(100);
    }


    changeCurrent(){
        if(this.state.turn!=='over' && this.teamA.getChildren().length>3  ){
            if(this.state.turn !=='enemy'){
                if(this.state.current.state.haveBall){
                    this.state.current.state.isActive = true;
                    this.state.canChange = false;
                }
                else if(!this.state.current.state.haveBall){
                    this.state.canChange = true;
                }
    
                if(this.state.canChange){
                    if(this.ball.x<520 && !this.state.current.state.haveBall && this.state.turn === ''){
                        let dis = []
                        for(let i=0; i<this.teamA.getChildren().length-3 ; i++){
                            
                            dis.push(this.distance(this.teamA.getChildren()[i], this.ball))
                        }
                        let i = dis.indexOf(Math.min(...dis));
                        if(i !== -1 && this.teamA.getChildren()[i].state.isActive){
                            this.state.current = this.teamA.getChildren()[i];
                        }
                    
                    }else if(this.ball.x > 520 && this.ball.x < 910 && this.ball.y<290){
                        this.state.current =this.player4;
                    }else if(this.ball.x > 520 && this.ball.x < 970 && this.ball.y > 475){
                        this.state.current = this.player6;
                    }else if(this.ball.x > 920 && this.ball.x > (this.ball.y + 2930)/3.5){
                        this.state.current = this.player5;
                    }
                }
            }else{
                if(this.ball.state.ballFrom !== 'enemy'){
                    let dis = [];
                    for(let i=0; i<this.teamA.getChildren().length-3 ; i++){
                        
                        dis.push(this.distance(this.teamA.getChildren()[i], this.ball))
                    }
                    let i = dis.indexOf(Math.min(...dis));
                    if(i !== -1 && this.teamA.getChildren()[i].state.isActive){
                        this.state.current = this.teamA.getChildren()[i];
                    }
                }
                
                
            }
            if(this.state.turn === 'us'){
                let dis =[];
                for(let i=0; i<this.teamB.getChildren().length-3; i++){
                    dis.push(this.distance(this.teamB.getChildren()[i], this.ball)) 
                }
                let i = dis.indexOf(Math.min(...dis));
                if(i !== -1 && this.teamB.getChildren()[i].state.isActive){
                    this.state.enemy =  this.teamB.getChildren()[i];
                }
            }

           
            
        }
        
    }

    checkFace(){
        this.teamA.getChildren().forEach(el=>{
            if(el !== this.state.current){
                el.x < this.ball.x ? el.flipX=false : el.flipX =true;
                if(el===this.player1){
                    el.flipX ? el.setOffset(16,15)  : el.setOffset(29,15) ;
                }else{
                   el.flipX ? el.setOffset(22,23)  : el.setOffset(24,23) ;
                }
            }
            
           
        })
        this.teamB.getChildren().forEach(el=>{
            if(el !== this.state.current){
                el.x < this.ball.x ? el.flipX=false : el.flipX =true;
            }
            
        })
    }

    pickBall(){
        if(this.state.turn !=='enemy'){
            this.state.current.state.haveBall = true;
            this.ball.anims.play('normal-ball');
            this.ball.setCollideWorldBounds(false);
            this.ball.setAccelerationY(0);
            let offsetX, offsetY;
            if(this.state.current===this.player1){
                offsetX = 30;
                offsetY = 0 ;
            }else{
                offsetX = 20;
                offsetY = 16 ;
            }
            this.tweens.add({
                targets: this.ball,
                x: this.state.current.flipX?   this.state.current.x - offsetX : this.state.current.x + offsetX,
                y: this.state.current.y + offsetY,
                ease: 'linear',
                delay:100,
                duration: 0,
                repeat: 0
            })
            // this.player1.setDamping(true);
            // this.player1.body.setDrag(0.90,0.90);
            // this.player1.setFrictionX(1);
            this.ball.setDamping(true);
            this.ball.body.setDrag(0.9,0.5);
            this.state.turn = 'us';
        }
        
    }

    enemyPickBall(){
        this.ball.anims.play('normal-ball');
        this.state.enemy.state.canThrow = true;
        this.ball.setCollideWorldBounds(false);
        this.ball.setDamping(true);
        this.ball.setAccelerationY(0);
        let offsetX, offsetY;
            offsetX = 20;
            offsetY = 16 ;
        this.enemyActionPick = this.tweens.add({
            targets: this.ball,
            x: this.state.enemy.flipX?   this.state.enemy.x - offsetX : this.state.enemy.x + offsetX,
            y: this.state.enemy.y + offsetY,
            ease: 'linear',
            delay:100,
            duration: 0,
            repeat: 0,
            onComplete: ()=>{
                this.state.enemy.state.haveBall = true;
                
            }
           
        })
        
        this.ball.body.setDrag(0.8,0.5);
        this.ball.setFriction(1,100)
        this.state.turn = 'enemy'

        
    }

    throw(direct){
        this.ball.body.stop();
        this.state.current.state.haveBall = false;
        this.ball.setCollideWorldBounds(false);
        let speedX,speedY;
        if(direct){this.ball.state.ballTo=direct}
        else{this.state.current.flipX? this.ball.state.ballTo = 'left' : this.ball.state.ballTo = 'right';}
        this.ball.state.ballTo==='right'? speedX = 200 : speedX = -200;
        if(this.state.current.state.isJump){speedX += 100}

        if(this.state.current===this.player4||this.state.current === this.player6){
            speedY = (this.state.enemy.y  - this.state.current.y)  ;
            speedX = (this.state.enemy.x  - this.state.current.x) * 200 / Math.abs(this.state.enemy.y - this.state.current.y);
        }
        else{
            speedY = (this.state.enemy.y  - this.state.current.y) * 200 / Math.abs(this.state.enemy.x - this.state.current.x);
        }
        
        setTimeout(()=>{this.ball.setCollideWorldBounds(true)},1500) 
        this.ball.setDamping(false);
        // this.state.current.state.isThrow=true;
        // this.state.current.anims.play(`${this.state.current.name}-throw`,true) 
        this.tweens.add({
            targets: this.state.current,
            ease: 'linear',
            duration: 0,
            completeDelay: 150,
            onStart:  ()=> {
                // this.state.current.state.isThrow=true;
                // this.state.current.anims.play(`${this.state.current.name}-throw`,true)    
            },
           
            onComplete:  ()=>{
                this.ball.state.ballFrom = 'us' 
                this.ball.setVelocityX(speedX);
                this.ball.setVelocityY(speedY);
                if(this.state.current.x <480 && this.state.current.x>430 && this.ball.body.velocity.x > 159.5){
                    let ballAnime = 'magic-ball' + Math.ceil(Math.random() * 3)
                    this.ball.anims.play(ballAnime)
                    this.ball.state.damage = 20;
                    this.sound.play('sfx', this.markers[1])
                }else{
                    this.ball.anims.play('normal-ball');
                    this.ball.state.damage = 10;
                    this.sound.play('sfx', this.markers[0])
                }
                // this.state.current.state.isThrow = false;
                this.activeCollides(this.teamB);
            }
        })
    }
    enemyThrow(){
        this.ball.body.stop();
        this.state.enemy.state.haveBall = false;
        this.ball.setCollideWorldBounds(false);
        this.state.enemy.anims.play(`${this.state.enemy.name}-throw`,true);
        if(this.state.enemy.state.isJump){
            this.state.dy = this.state.current.y +40;
        }
        let speedX, speedY;
        this.state.enemy.flipX? this.ball.state.ballTo = 'left' : this.ball.state.ballTo = 'right';
        this.ball.state.ballTo==='right'? speedX = 200 : speedX = -200;
        this.ball.setDamping(false);
        if(this.state.enemy.state.isJump){
            this.ball.state.ballTo==='right'? speedX += 100 : speedX -= 100;
            speedY = (this.state.current.y  - this.state.enemy.y) * 200 / Math.abs(this.state.enemy.x - this.state.current.x);
            speedY += 20;
        }else{
            speedY = (this.state.current.y  - this.state.enemy.y) * 200 / Math.abs(this.state.enemy.x - this.state.current.x);
        }
        
        // if(speedY >= 100){speedY = 100 }
        
        setTimeout(()=>{this.ball.setCollideWorldBounds(true)},1500)
        this.ball.state.ballFrom = 'enemy' 
        this.tweens.add({
            targets: this.state.enemy,
            ease: 'linear',
            duration: 0,
            completeDelay: 250,
            onStart: ()=>{ 
                
            },
            onComplete: ()=>{
                this.ball.setVelocityX(speedX);
                this.ball.setVelocityY(speedY);
                let num = Math.random();
                if(num > 0.5){
                    let ballAnime = 'magic-ball' + Math.ceil(Math.random() * 3)
                    this.ball.anims.play(ballAnime);
                    this.ball.state.damage = 20;
                    this.sound.play('sfx', this.markers[1])
                }else{
                    this.ball.anims.play('normal-ball');
                    this.ball.state.damage = 10;
                    this.sound.play('sfx', this.markers[0])
                }
                this.state.enemy.state.isThrow = false;
                this.activeCollides(this.teamA);
            }
        })
        
    }
   
    
        






    catchBall(){
        if(this.ball.state.ballFrom === 'enemy'){
            this.state.current.anims.play(`${this.state.current.name}-catch`)
            //從右邊來的球
            if(this.ball.state.ballTo==='left'){
                if(this.ball.x > this.state.current.x + 30 & this.ball.x < this.state.current.x + 50){
                    this.state.turn = 'us';
                    this.state.current.state.haveBall = true;
                    this.state.current.canThrow = true;
                    this.tweens.add({
                        targets: this.ball,
                        x: this.state.current===this.player1? this.state.current.x +30 :this.state.current.x +20,
                        y: this.state.current===this.player1? this.state.current.y : this.state.current.y +16,
                        ease: 'linear',
                        delay:0,
                        duration: 0,
                        repeat: 0
                    })
                    this.ball.anims.play('normal-ball');
                    this.ball.body.stop();
                    this[`hit_${this.state.current.name}`].active = false;
                    this.ball.state.ballFrom = '';
                    this.ball.setDamping(true);
                    this.ball.body.setDrag(0.9,0.5);
                    console.log('catch')
                }

            //從左邊來的球
            }else{
                if(this.ball.x > this.state.enemy.x - 50 && this.ball.x < this.state.enemy.x - 30){
                    this.state.enemy.state.haveBall = true;
                    this.tweens.add({
                        targets: this.ball,
                        x: this.state.current===this.player1? this.state.current.x -30 :this.state.current.x -20,
                        y: this.state.current===this.player1? this.state.current.y : this.state.current.y -16,
                        ease: 'linear',
                        delay:0,
                        duration: 0,
                        repeat: 0
                    })
                    this.ball.anims.play('normal-ball');
                    this.ball.body.stop();
                    this.state.turn = 'enemy';
                    this.ball.state.ballFrom ='';
                    this[`hit_${this.state.enemy.name}`].active = false;
                    this.ball.setDamping(true);
                    this.ball.body.setDrag(0.9,0.5);
                }
            }
            
        }
    }

    enemyCatch(){
        if(this.ball.state.ballFrom === 'us'){
            this.state.enemy.anims.play(`${this.state.enemy.name}-catch`)
            //從右邊來的球
            if(this.ball.state.ballTo==='left'){
                if(this.ball.x > this.state.enemy.x + 30 && this.ball.x < this.state.enemy.x + 40 && Math.abs(this.ball.y-this.state.enemy.y) < 40){
                    // this.state.enemy.state.haveBall = true;
                    this.ball.anims.play('normal-ball');
                    this.ball.body.stop();
                    this.tweens.add({
                        targets: this.ball,
                        x: this.state.enemy.x +26,
                        y: this.state.enemy.y ,
                        ease: 'linear',
                        duration:0,
                        completeDelay: 750,
                        onComplete: ()=>{
                            this.state.enemy.state.haveBall = true;
                            this.ball.state.ballFrom ='';
                            this.state.turn = 'enemy';
                        }
                    })
                    // this.state.enemy.state.haveBall = true;
                    
                    // this.state.turn = 'enemy';
                    
                    this[`hit_${this.state.enemy.name}`].active = false;
                    this.ball.setDamping(true);
                    this.ball.body.setDrag(0.9,0.5);
                }

            //從左邊來的球
            }else{
                if(this.ball.x > this.state.enemy.x - 40 && this.ball.x < this.state.enemy.x - 30  && Math.abs(this.ball.y-this.state.enemy.y) < 40){
                    this.tweens.add({
                        targets: this.ball,
                        x: this.state.enemy.x -20,
                        y: this.state.enemy.y +16,
                        duration:0,
                        ease: 'linear',
                        completeDelay: 250,
                        onComplete: ()=>{
                            this.state.enemy.state.haveBall = true;
                            this.state.turn = 'enemy';
                            this.ball.state.ballFrom = '';
                            this.ball.body.stop();
                        }
                    })
                    // this.state.enemy.state.haveBall = true;
                    this.ball.anims.play('normal-ball');
                    this.ball.body.stop();
                    // this.state.turn = 'enemy';
                    this.ball.state.ballFrom ='';
                    this[`hit_${this.state.current.name}`].active = false;
                    
                    this.ball.setDamping(true);
                    this.ball.body.setDrag(0.9,0.5);
                    this.ball.setFriction(1,100);
                }
            }
            
        }
    }


    jump(){
        let offsetX, offsetY;
        
        if(this.state.current===this.player1){
            offsetX = 30;
            offsetY = 0 ;
        }else{
            offsetX = 20;
            offsetY = 16 ;
        }
        if(this.state.current.state.onFloor){
            // this.state.current.state.canChange = false;
            this.state.current.state.onFloor = false;
            this.ball.setCollideWorldBounds(false);
            // this.state.current.state.canThrow = false;
            this.state.current.state.y = this.state.current.y;
            if(this.state.current.state.haveBall){
                this.ball.setAccelerationY(500);
                this.ball.setVelocityY(-300);
            }
            this.state.current.setAccelerationY(500);
            this.state.current.setVelocityY(-300);
            // this.state.current.anims.play(`${this.state.current.name}-jump`);
            this.state.current.state.haveBall ? this.ball.y = this.state.current.y + offsetY : this.ball.y
            this.state.current.state.isJump = true;
            this.sound.play('sfx', this.markers[4])
        }
    }

    enemyJump(){
        let offsetX = 20;
        let offsetY = 16;

        if(this.state.enemy.state.onFloor){
            // this.state.current.state.canChange = false;
            this.state.enemy.state.onFloor = false;
            this.state.enemy.state.canThrow = false;
            this.ball.setCollideWorldBounds(false);
            this.state.enemy.state.y = this.state.enemy.y;
            if(this.state.enemy.state.haveBall){
                this.ball.y= this.state.enemy.y +offsetY;
                this.ball.setAccelerationY(500);
                this.ball.setVelocityY(-300);
            }
            this.state.enemy.setAccelerationY(500);
            this.state.enemy.setVelocityY(-300);
            this.state.enemy.anims.play(`${this.state.enemy.name}-jump`);
            this.state.enemy.state.haveBall ? this.ball.y = this.state.enemy.y + offsetY : this.ball.y
            this.state.enemy.state.isJump = true;
            this.sound.play('sfx', this.markers[4])
        }
    }



    pass(){
            this.state.current.state.haveBall = false;
            this.ball.state.isPass = true;
            this.ball.setCollideWorldBounds(false);
            let passObj;
            if(this.state.current.x < 520){
                if(!this.state.current.flipX){
                    if(this.state.current.y < 350){
                        passObj = this.player4
                    }else if(this.state.current.y > 410){
                        passObj = this.player6
                    }else{
                        passObj = this.player5;
                    }
                }else{
                    passObj = this.checkNearObj(this.teamA, 3)
                }
                
            }else{
                
                if((this.state.current.y < 340 || this.state.current.y > 420) && this.state.current!== this.player5 && !this.state.current.flipX){
                    passObj = this.player5;
                }else if (this.state.current.y < 340 && this.state.current!==this.player4){passObj = this.player4}
                 else if (this.state.current.y > 410 && this.state.current!==this.player6){passObj = this.player6}
                 else{ passObj = this.checkNearObj(this.teamA, 3)}
            }
            this.ball.body.stop();
            // this.ball.setFriction(0);
            // this.ball.setDamping(false);
            let offsetX, offsetY;
            if(passObj===this.player1){
                if(passObj.flipX){
                    offsetX = -30;
                    offsetY = 0 ;
                }else{
                    offsetX = 30;
                    offsetY = 0 ;
                }
            }else{
                if(passObj.flipX){
                    offsetX = -20;
                    offsetY = 16 ;
                }else{
                    offsetX = 20;
                    offsetY = 16 ;
                }
            }
            // this.state.current.anims.play(`${this.state.current.name}-pass`);   
            this.passTween = this.tweens.timeline();
            this.passTween.add({
                targets: this.ball,
                x: passObj.x + offsetX,
                duration:1500,
                ease: 'linear',
                onStart: ()=>{
                    this.ball.setDamping(false);
                    this.sound.play('sfx', this.markers[5]);
                },
                onComplete: ()=>{
                    this.ball.body.stop();
                    this.ball.setDamping(true);
                    this.state.current = passObj;
                    this.state.current.state.haveBall = true;
                    this.state.current===this.player1? this.ball.y = this.state.current.y : this.ball.y = this.state.current.y + offsetY;
                    this.ball.state.isPass=false;
                    this.state.turn='us';
                    this.sound.play('sfx', this.markers[3]);
                }
            })
            if(passObj === this.player5){
                this.passTween.add({
                    targets: this.ball,
                    y: passObj.y -100,
                    duration: 750,
                    ease: 'Sine.easeOut',
                    offset: 0
                })
            }else if (this.state.current === this.player4){
                this.passTween.add({
                    targets: this.ball,
                    y: this.player4.y - 50,
                    duration: 750,
                    ease: 'Sine.easeOut',
                    offset: 0
                })
            }
            else{
                this.passTween.add({
                    targets: this.ball,
                    y: passObj.y -150,
                    duration: 750,
                    ease: 'Sine.easeOut',
                    offset: 0
                })
            }
            
            this.passTween.add({
                targets: this.ball,
                y: passObj.y + offsetY,
                duration: 750,
                ease: 'Sine.easeIn',
                onComplete: ()=>{this.passTween.destroy()}
            })
            
            this.passTween.play();
            // this.state.current.state.isThrow = false;
    }
    
    enemyPass(){
        this.ball.setCollideWorldBounds(false);
        this.ball.state.isPass = true;
        this.ball.body.stop();
        this.state.turn='enemy';
        let passObj = this.teamB.getChildren()[0];
        let offsetX = 20;
        let offsetY = 16 ;
        // this.state.enemy.state.haveBall = false;
        this.enemyPassTween = this.tweens.createTimeline();
        this.enemyPassTween.add({
            targets: this.ball,
            x: passObj.x - offsetX,
            ease: 'linear',
            // offset:1000,
            delay:100,
            duration: 1520,
            completeDelay: 100,
            onStart: ()=>{
                
                this.ball.setDamping(false);
                this.state.enemy.state.haveBall = false;
                this.sound.play('sfx', this.markers[5]);
                
            },
            onComplete: ()=>{
                // this.ball.body.stop();
                // this.ball.setDamping(true);
                // this.state.enemy = passObj;
                // passObj.state.haveBall = true;
                // this.ball.y = this.state.enemy.y + offsetY;
                // this.ball.state.isPass=false;
                // this.sound.play('sfx', this.markers[3]);
                // console.log('test')
            },
        })
        this.enemyPassTween.add({
            targets: this.ball,
            y: passObj.y -150,
            duration: 750,
            ease: 'Sine.easeOut',
            offset: 100
        })
        this.enemyPassTween.add({
            targets: this.ball,
            y: passObj.y + offsetY,
            duration: 750,
            ease: 'Sine.easeIn',
            offset:850,
            onStart: ()=>{},
            onComplete: ()=>{

                this.ball.body.stop();
                this.ball.setDamping(true);
                this.state.enemy.state.haveBall = false;
                this.state.enemy = passObj;
                passObj.state.haveBall = true;
                passObj.state.canThrow = true;
                this.ball.y = this.state.enemy.y + offsetY;
                this.ball.state.isPass=false;
                this.sound.play('sfx', this.markers[3]);
                this.enemyPassTween.destroy();
            }
        })

        this.enemyPassTween.play();
        
    }

    //求距離
    distance(a,b){
        let dx, dy ;
        dx = Math.abs(a.x - b.x);
        dy = Math.abs(a.y - b.y);
        return (Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2)));
    }
    //求最近的隊友
    checkNearObj(team, to){
        let dis= new Array(to);
        for(let i=0; i<to; i++){
            let obj = team.getChildren()[i];
            if(team === this.teamA){
                if(this.state.current !== obj){ 
                    dis[i] = this.distance(obj, this.state.current);
                }else{dis[i]=Infinity}
            }else{
                if(this.state.enemy !== obj){ 
                    dis[i] = this.distance(obj, this.state.enemy);
                }else{dis[i]=Infinity}
            }
            
        }
        let i = dis.indexOf(Math.min(...dis));
        return team.getChildren()[i];
    }


    dodge(){
        this.state.current.anims.play(`${this.state.current.name}-dodge`)
    }

    createCollideToTeamA(obj,cName){
        this[cName] = this.physics.add.overlap(obj, this.ball, null,(e)=>{
            if(this.ball.state.ballFrom=== 'enemy' ){

                
            // this.state.current = this.teamA.getChildren().filter(el=>el!==e)[0]

                if(this.ball.state.ballTo==='left'){
                    if(this.ball.x < e.x +30 ){
                        e.state.isActive = false;
                        e.state.hp -= this.ball.state.damage;

                        if(e.flipX){
                            e.anims.play(`${e.name}-hit-down2`, true);
                            if(e.state.hp <=0){
                                e.state.alive = false;
                                e.anims.chain(`${e.name}-die2`)
                            }else{e.anims.chain(`${e.name}-hit-down2-2`)}
                        }
                        else{
                            e.anims.play(`${e.name}-hit-down`, true);
                            if(e.state.hp <=0){
                                e.state.alive = false;
                                e.anims.chain(`${e.name}-die`);
                                
                            }else{e.anims.chain(`${e.name}-hit-down-2`)} 
                        }
                        e.setVelocityX(-800);
                        this[`hit_${e.name}`].active = false;
                        this.sound.play('sfx', this.markers[6]);

                        this.ball.setVelocityX(60);
                        this.ball.setVelocityY(-80);
                        this.ball.setAccelerationY(200);
                        if(this.teamA.getChildren().length>4){
                            this.state.current = this.teamA.getChildren().filter(el=>el!==e)[0]
                        }
        
                        this.inactiveCollides(this.teamA); 
                        
                        this.tweens.add({
                            targets: this.ball,
                            y: { value: this.ball.y + 20, duration:1000, ease: 'Bounce.easeOut'},
                            duration: 2000,
                            ease: 'Bounce.Out',
                            delay: 500,
                            onStart: ()=>{
                                this.ball.state.ballFrom = '';
                                this.state.turn='';
                            },
                            onComplete: ()=>{
                                this.ball.setDamping(true);
                                this.ball.setAccelerationY(0);
                                
                            }
                        });
                    }
                }else {
                    if(this.ball.x > e.x -24){
                        e.state.isActive = false;
                        e.state.hp -= this.ball.state.damage;
                        if(e.flipX){
                            e.anims.play(`${e.name}-hit-down`, true);
                            if(e.state.hp <= 0){
                                e.state.alive = false;
                                e.anims.chain(`${e.name}-die`)
                               
                            }else{e.anims.chain(`${e.name}-hit-down-2`)}
                        }else{
                            e.anims.play(`${e.name}-hit-down2`, true);
                            if(e.state.hp <= 0){
                                e.state.alive = false;
                                e.anims.chain(`${e.name}-die`);
                               
                            }else{ e.anims.chain(`${e.name}-hit-down2-2`)}
                            
                        }
                        e.setVelocityX(800);
                        // obj.anims.chain(`${obj.name}-hit-down-2`);
                        this[`hit_${e.name}`].active = false;
                        this.sound.play('sfx', this.markers[6]);

                        this.ball.setVelocityX(60);
                        this.ball.setVelocityY(-80);
                        this.ball.setAccelerationY(200);
                        if(this.teamA.getChildren().length>4){
                            this.state.current = this.teamA.getChildren().filter(el=>el!==e)[0]
                        }

                        this.inactiveCollides(this.teamA)

                        this.tweens.add({
                            targets: this.ball,
                            y: { value: this.ball.y + 20, duration:1000, ease: 'Bounce.easeOut'},
                            duration: 2000,
                            ease: 'Bounce.Out',
                            delay: 500,
                            onStart: ()=>{
                                this.ball.state.ballFrom = '';
                                this.state.turn='';
                            },
                            onComplete: ()=>{
                                this.ball.setDamping(true);
                                this.ball.setAccelerationY(0);
                                
                            }
                        });
                    }
                }
                // this.tweens.add({
                //     targets: this.ball,
                //     y: { value: this.ball.y + 20, duration:1000, ease: 'Bounce.easeOut'},
                //     duration: 2000,
                //     ease: 'Bounce.Out',
                //     delay: 500,
                //     onStart: ()=>{
                //         this.ball.state.ballFrom = '';
                //         this.state.turn='';
                //     },
                //     onComplete: ()=>{
                //         this.ball.setDamping(true);
                //         this.ball.setAccelerationY(0);
                        
                //     }
                // });
                // this[`hit_${e.name}`].active = false;
                
                this.ball.anims.play('normal-ball');
                
            }
           
        });
    }

    createCollideToTeamB(obj,cName){
        this[cName] = this.physics.add.overlap(obj, this.ball, null,(e)=>{
            if(this.ball.state.ballFrom === 'us'){

                
                // this.state.enemy = this.teamB.getChildren().filter(el=>el!==e)[0]

                if(this.ball.state.ballTo==='left'){
                    if(this.ball.x < e.x +24  ){
                        e.state.hp -= this.ball.state.damage;
                        e.state.isActive = false;
                        if(e.flipX){
                            e.anims.play(`${e.name}-hit-down2`, true);
                            if(e.state.hp <=0){
                                e.state.alive = false;
                                e.anims.chain(`${e.name}-die`);
                            }else{e.anims.chain(`${e.name}-hit-down-2`)} 
                           
                        }else{
                            e.anims.play(`${e.name}-hit-down`, true); 
                            if(e.state.hp <=0){
                                e.state.alive = false;
                                e.anims.chain(`${e.name}-die`);
                            }else{e.anims.chain(`${e.name}-hit-down-2`)} 
                        }

                        e.setVelocityX(-400);
                        this[`hit_${e.name}`].active = false;
                        this.sound.play('sfx', this.markers[6]);

                        this.ball.setVelocityX(60);
                        this.ball.setVelocityY(-80);
                        this.ball.setAccelerationY(200);
                        if(this.teamB.getChildren().length>4){
                            this.state.enemy = this.teamB.getChildren().filter(el=>el!==e)[0]
                        }
                        this.inactiveCollides(this.teamB);
                    }
                }else {
                    if(this.ball.x > e.x -24){
                        e.state.isActive = false;
                        e.state.hp -= this.ball.state.damage;
                        if(e.flipX){
                            e.anims.play(`${e.name}-hit-down`, true);
                            if(e.state.hp <=0){
                                e.state.alive = false;
                                e.anims.chain(`${e.name}-die`);    
                            }else{e.anims.chain(`${e.name}-hit-down-2`)} 
                        }else{
                            e.anims.play(`${e.name}-hit-down2`, true);
                            if(e.state.hp <=0){
                                e.state.alive = false;
                                e.anims.chain(`${e.name}-die`); 
                            }else{e.anims.chain(`${e.name}-hit-down-2`)} 
                        }

                        e.setVelocityX(400);
                       
                        this[`hit_${e.name}`].active = false;
                        this.sound.play('sfx', this.markers[6]);

                        this.ball.setVelocityX(-60);
                        this.ball.setVelocityY(-80);
                        this.ball.setAccelerationY(200);
                        if(this.teamB.getChildren().length>4){
                            this.state.enemy = this.teamB.getChildren().filter(el=>el!==e)[0]
                        }
                        this.inactiveCollides(this.teamB);
                    }
                    
                }
                this.tweens.add({
                    targets: this.ball,
                    // x: { value: this.ball.x - 60, duration:1000, ease:'Linear'},
                    y: { value: this.ball.y + 20, duration:1000, ease: 'Bounce.easeOut'},
                    duration: 2000,
                    ease: 'Bounce.Out',
                    delay: 500,
                    onStart: ()=>{
                        this.ball.state.ballFrom = '';
                        this.state.turn='';
                    },
                    onComplete: ()=>{
                        this.ball.setDamping(true);
                        this.ball.setAccelerationY(0);
                        
                    }
                });
                
                this.ball.anims.play('normal-ball')
                // this[`hit_${e.name}`].active = false;
                 
            }
        });
    }

    activeCollides(team){
        team.getChildren().forEach(el=>{
            this[`hit_${el.name}`].active = true;
        })
    }
    inactiveCollides(team){
        team.getChildren().forEach(el=>{
            this[`hit_${el.name}`].active = false;
        })
    }
    

    updateText(){
        if(this.state.turn!=='over' && this.teamA.getChildren().length>3){
            if(this.state.current === this.player1){
                this.player1.flipX? this.currentPlayer.x = this.player1.x -20 : this.currentPlayer.x = this.player1.x + 5
                this.currentPlayer.y = this.player1.y -  60;
            }
           else{
               this.state.current.flipX? this.currentPlayer.x= this.state.current.x -10 : this.currentPlayer.x = this.state.current.x
               this.currentPlayer.y = this.state.current.y -45
           }
    
    
           if(this.state.current === this.player1){this.tag1.y = 28}
           else if (this.state.current === this.player2){this.tag1.y = 58}
           else if (this.state.current === this.player3){this.tag1.y = 88}
           else{this.tag1.y = -20}
        }
        

       if(this.state.enemy === this.enemy1){this.tag2.y = 28}
       else if (this.state.enemy === this.enemy2){this.tag2.y = 58}
       else if (this.state.enemy === this.enemy3){this.tag2.y = 88}
       else{this.tag2.y = -20}

       let hpText1='', hpText2='', hpText3='', hpText4='', hpText5='', hpText6='';
       let hp1 = Math.ceil(this.player1.state.hp /10);
       let hp2 = Math.ceil(this.player2.state.hp /10);
       let hp3 = Math.ceil(this.player3.state.hp /10);
       let hp4 = Math.ceil(this.enemy1.state.hp /10);
       let hp5 = Math.ceil(this.enemy2.state.hp /10);
       let hp6 = Math.ceil(this.enemy3.state.hp /10);

       for(let i=0; i<hp1; i++){hpText1 += '|'};
       for(let i=0; i<hp2; i++){hpText2 += '|'};
       for(let i=0; i<hp3; i++){hpText3 += '|'};
       for(let i=0; i<hp4; i++){hpText4 += '|'};
       for(let i=0; i<hp5; i++){hpText5 += '|'};
       for(let i=0; i<hp6; i++){hpText6 += '|'};

       this.hp1.text = `${hpText1}`;
       this.hp2.text = `${hpText2}`;
       this.hp3.text = `${hpText3}`;
       this.hp4.text = `${hpText4}`;
       this.hp5.text = `${hpText5}`;
       this.hp6.text = `${hpText6}`;
    }


    destroyPlayer(obj){
        if(obj.name.slice(0,6)==='player'){
            // this.state.current = this.teamA.getChildren().filter(el=>el!==obj)[0]
            obj.destroy();
        }else{
            // this.state.enemy = this.teamB.getChildren().filter(el=>el!==obj)[0]
            obj.destroy();
        }
    }

    teammateControl(){

        //teammate  outside
        if(this.player4.x < 739 && this.state.current !== this.player4 && this.player4.state.isActive){
            this.player4.setVelocityX(160);
            this.player4.anims.play('player4-run',true);
            this.player4.flipX=false;
        }
        else if(this.player4.x > 800 && this.state.current !== this.player4 && this.player4.state.isActive ){
            this.player4.setVelocityX(-160);
            this.player4.anims.play('player4-run',true);
            this.player4.flipX=true;
        }
        if(this.player5.y < 320 && this.state.current !== this.player5 && this.player5.state.isActive){
            this.player5.setVelocityX(15);
            this.player5.setVelocityY(100);
            this.player5.anims.play('player5-run',true);
            this.player5.flipX=true;
        }
        else if(this.player5.y > 385 && this.state.current !== this.player5 && this.player5.state.isActive){
            this.player5.setVelocityX(-15);
            this.player5.setVelocityY(-100);
            this.player5.anims.play('player5-run',true);
            this.player5.flipX=true;
        }
        if(this.player6.x < 760 && this.state.current !== this.player6 && this.player6.state.isActive){
            this.player6.setVelocityX(160);
            this.player6.anims.play('player6-run',true);
            this.player6.flipX=false;
        }
        else if(this.player6.x > 810 && this.state.current !== this.player6 && this.player6.state.isActive ){
            this.player6.setVelocityX(-160);
            this.player6.anims.play('player6-run',true);
            this.player6.flipX=true;
        }

        // inside control
        if(this.player1.x<130 && this.player1.x < (700-this.player1.y)/2.4 
        && this.player1.state.isActive && this.state.current !== this.player1){
            this.player1.setVelocityX(160);
            this.player1.anims.play('player1-run',true);
            this.player1.flipX=false;
        }else if(this.player1.x > 500 && this.player1.state.isActive && this.state.current !== this.player1){
            this.player1.setVelocityX(-160);
            this.player1.anims.play('player1-run',true);
            this.player1.flipX=true;

        }
        if(this.player2.x<110 && this.player2.x < (740-this.player2.y)/3.2 
        && this.player2.state.isActive && this.state.current !== this.player2){
            this.player2.setVelocityX(160);
            this.player2.anims.play('player2-run',true);
            this.player2.flipX=false;
        }
        else if(this.player2.x > 500 && this.player2.state.isActive && this.state.current !== this.player2){
            this.player2.setVelocityX(-160);
            this.player2.anims.play('player2-run',true);
            this.player2.flipX=true;
        }
        if(this.player3.x<110 && this.player3.x < (740-this.player3.y)/3.2 
        && this.player3.state.isActive && this.state.current !== this.player3){
            this.player3.setVelocityX(160);
            this.player3.anims.play('player3-run',true);
            this.player3.flipX=false;
        }
        else if(this.player3.x>500 && this.player3.state.isActive && this.state.current !== this.player3){
            this.player3.setVelocityX(-160);
            this.player3.anims.play('player3-run',true);
            this.player3.flipX=true;
        }
        

        //teammate dodge
        if(this.ball.state.ballFrom === 'enemy' && !this.ball.state.isPass){
            for(let i=0; i<this.teamA.getChildren().length-3; i++){
                let el = this.teamA.getChildren()[i];
                if(el !== this.state.current && el.state.isActive){
                    if(Math.abs(el.x - this.ball.x) < 50 && Math.abs(el.y - this.ball.y) < 65){
                        el.anims.play(`${el.name}-dodge`);
                        this[`hit_${el.name}`].active = false;
                    }else {
                        this[`hit_${el.name}`].active = true;
                    }
                }
            }
        }
        if(this.state.turn==='enemy'){
            if(this.enemy1.state.haveBall || this.enemy2.state.haveBall || this.enemy3.state.haveBall || this.ball.x >520){
                for(let i=0; i<this.teamA.getChildren().length-3; i++){
                    let el = this.teamA.getChildren()[i];
                    if(el !== this.state.current && el.state.isActive && el.x > 200){
                        el.setVelocityX(-160);
                        el.anims.play(`${el.name}-run`,true);
                        el.flipX=true;
                    }
                }
            }else if(this.enemy5.state.haveBall){
                for(let i=0; i<this.teamA.getChildren().length-3; i++){
                    let el = this.teamA.getChildren()[i];
                    if(el !== this.state.current && el.state.isActive && el.x < 400){
                        el.setVelocityX(160);
                        el.anims.play(`${el.name}-run`,true);
                        el.flipX=false;
                    }
                }
            }
        }
        
        
    }


}

export default GameScene;