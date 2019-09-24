import React, { useState, useEffect , useContext} from "react";
import { GameContext } from '../contexts/context'

import 'phaser';
import TitleScene from '../scenes/TitleScene';
import GameScene from '../scenes/GameScene';
import GameOver from '../scenes/GameOver';
import '../css/game.css'

import KeyDirection from '../../materials/img/Keys/direction.png';
import KeyZ from '../../materials/img/Keys/Z.png';
import KeyX from '../../materials/img/Keys/X.png';





const Game = () => {
    const {state, setGame} = useContext(GameContext);
    
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
                TitleScene,
                GameScene, 
                GameOver
            ],
            audio: {
                disableWebAudio: true
            }
        }
        
        if(state.game===null){
            setGame(new Phaser.Game(config));
        }
        
    })

    return (
        <React.Fragment>
            <div className='main'>
                <div id='game'></div>
                <div className='keys'>
                    <div className='key-item '>
                        <div className='key' id='direction'>
                            <img src={KeyDirection}></img>
                        </div>
                        <div className='text' id='direction-text'>Move</div>
                    </div>
                    <div className='key-item'>
                        <div className='key'>
                            <img src={KeyZ}></img>
                        </div>
                        <div className='text'>Throw/Catch</div>
                    </div>

                    <div className='key-item'>
                        <div className='key'>
                            <img src={KeyX}></img>
                        </div>
                        <div className='text'> Pass/Dodge</div>
                    </div>

                    <div className='key-item'>
                        <div className='key'>
                            <img src={KeyZ}></img>
                        </div>
                        <div className='key'>
                            <img src={KeyX}></img>
                        </div>
                        <div className='text'>Jump</div>
                    </div>   
                </div>
            </div>
            
            
        </React.Fragment>
    )
}






export default Game;
