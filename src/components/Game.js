import React, { useState, useEffect} from "react";


import 'phaser';
import TitleScene from '../scenes/TitleScene';
import GameScene from '../scenes/GameScene';
import GameOver from '../scenes/GameOver';
import '../css/game.css'





const Game = () => {
    useEffect(()=>{
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'game',
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
                // TitleScene,
                GameScene, 
                GameOver
            ],
            audio: {
                disableWebAudio: true
            }
        }
    
        new Phaser.Game(config);
    })


    return (
        <React.Fragment>
            <div id='game'></div>
            
        </React.Fragment>
    )
}






export default Game;