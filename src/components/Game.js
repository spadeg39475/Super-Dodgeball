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
            <div className='main'>
                <div id='game'></div>
                <div className='keys'>
                    <div className='key-item '>
                        <div class='key' id='direction'>
                            <img src='../../materials/img/Keys/direction.png'></img>
                        </div>
                        <div className='text' id='direction-text'>Move</div>
                    </div>
                    <div className='key-item'>
                        <div class='key'>
                            <img src='../../materials/img/Keys/Z.png'></img>
                        </div>
                        <div className='text'>Throw/Catch</div>
                    </div>

                    <div className='key-item'>
                        <div class='key'>
                            <img src='../../materials/img/Keys/X.png'></img>
                        </div>
                        <div className='text'> Pass/Dodge</div>
                    </div>

                    <div className='key-item'>
                        <div class='key'>
                            <img src='../../materials/img/Keys/Z.png'></img>
                        </div>
                        <div class='key'>
                            <img src='../../materials/img/Keys/X.png'></img>
                        </div>
                        <div className='text'>Jump</div>
                    </div>

                    
                    
                </div>
            </div>
            
            
        </React.Fragment>
    )
}






export default Game;