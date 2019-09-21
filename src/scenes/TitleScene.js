



class TitleScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'TitleScene'
        });
    }
    preload() {
        this.load.image('title', './materials/img/SuperDodgeBallNES-Title-JP.png');
        this.load.audio('gameTitle', [
            './materials/audio/Track 1.ogg',
            './materials/audio/Track 1.mp3'
        ]);


        // this.load.spritesheet('ball', './materials/img/ball.png', {frameWidth: 50, frameHeight: 50});
        // this.load.spritesheet('kunio', './materials/img/character/Kunio/kunio.png', {frameWidth:64, frameHeight: 64});
    }
    create() {
        
        this.title = this.add.image(400,280, 'title');
        this.title.setScale(2.5);

        this.text = this.add.text(250,430, 'PRESS ENTER TO START', {
            fontSize: '24px',
            fontStyle: 'italic',
            lineSpacing: 1,
            color: '#E5E5E5',
            stroke: '#2D6FDD',
            strokeThickness: 2,
        })


        let keyObj = this.input.keyboard.addKey('ENTER');

        let music = this.sound.add('gameTitle');
        music.play();
        music.setLoop(true);

        keyObj.on('down', () => {
           
            this.scene.start('GameScene');
            this.scene.sleep();
            music.stop();
        });
        console.log(this)
        this.timer =0;
        
        this.anims.create({
            key: 'kunio-run',
            frames: this.anims.generateFrameNumbers('kunio', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: 0
        })

        // anime
        // this.kunio = this.physics.add.sprite(20, 380, 'kunio');
        // this.kunio.name = 'kunio';
        // this.kunio.setSize(18,33);
        // this.kunio.setOffset(29,15);
        // this.kunio.setScale(1.8);
        // this.kunio.setDamping(true);
        // this.kunio.body.setDrag(0.9,0.5);

        // this.ball = this.physics.add.sprite(380,400,'ball');
        // this.ball.name = 'ball'
        // this.ball.setCircle(6.5)
        // this.ball.setOffset(18.5,18.5)
        // this.ball.setScale(2.5);
        // this.ball.setBounce(0);
        // this.ball.setFriction(100);



        // let timeline = this.tweens.timeline();
        // timeline.add({
        //     targets: this.kunio,
        //     x: this.ball.x - 30,
        //     ease: 'linear',
        //     duration: 2000,
        //     onStart: ()=>{
        //         this.kunio.play('')
        //     }
        // })
        // timeline.play();

    }

    update(time, delta) {
        this.timer += delta
        if(this.timer >= 500){
            this.timer  -= 500; 
            this.text.visible = !this.text.visible; 
        }
    }

    startGame() {
        this.scene.stop('GameScene');
        this.registry.set('attractMode', false);
        this.scene.start('GameScene');
    }

    restartScene() {
        //        this.attractMode.stop();
        this.scene.stop('GameScene');
        this.scene.launch('GameScene');
        this.scene.bringToTop();

        this.registry.set('restartScene', false);
    }
}

export default TitleScene;