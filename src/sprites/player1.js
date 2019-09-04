export default class Player1 extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.body.setSize(18,33);
        this.body.setOffset(29,15);
        this.setScale(2.0);
        // this.body.setDamping(true);
        this.body.setDrag(0.9,0.5);
    }
}