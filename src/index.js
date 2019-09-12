import 'phaser';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';
import GameOver from './scenes/GameOver';

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
        TitleScene,
        GameScene, 
        GameOver
    ],
    audio: {
        disableWebAudio: true
    }
}

const game = new Phaser.Game(config);
