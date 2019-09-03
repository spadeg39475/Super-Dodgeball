import 'phaser';
import GameScene from './scenes/GameScene';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
        GameScene,
    ]
}

const game = new Phaser.Game(config);
