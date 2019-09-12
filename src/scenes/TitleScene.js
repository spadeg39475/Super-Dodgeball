class TitleScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'TitleScene'
        });
    }
    preload() {
        this.load.image('title', './materials/img/SuperDodgeBallNES-Title-JP.png');
    }
    create() {
        
        this.title = this.add.image(400,300, 'title');
        this.title.setScale(2.5)
        // this.input.on('pointerdown', () => {
        //     this.startGame();
        // });
    }

    update(time, delta) {
        
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