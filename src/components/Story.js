import React, { useState, useEffect, useContext} from "react";
import { GameContext } from '../contexts/context'
import Footer from './Footer';

import '../css/story.css'

const Story = () => {

    const {state, setGame} = useContext(GameContext);
    if(state.game){
        state.game.destroy(true,false)
        setGame(null);
    } 
    return(
        <div className='story' id='story'>
            <div className='block'>
                <div className='subtitle'>故事背景</div>
                <p className='text'>
                    <span className='l1'>
                        興趣是打架，運動萬能的不良少年國雄<br/>
                    </span>    
                    <span className='l2'>
                        在全國高校闘球試合上遇到了宿敵 － 花園高校<br/>
                    </span>
                    <span className='l3'>
                        目標是奪得全國優勝....
                    </span>
                </p>
            </div>
            
            <div className="img">
                <img src='./materials/img/story-pic.PNG'></img>
            </div>
        </div>
    )
}

export default Story;