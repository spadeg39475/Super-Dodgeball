import React, { useState, useEffect, useContext} from "react";
import { GameContext } from '../contexts/context'
import Footer from './Footer';

import '../css/about.css'

const About = () => {

    const {state, setGame} = useContext(GameContext);
    if(state.game){
        state.game.destroy(true,false)
        setGame(null);
    } 

    return (
            <div className='about-body'>
                <div className='author'>
                        <div className='container'>
                            <div className='title'>About Me</div>
                            <div className='content'>
                              轉職路上的新手前端工程師，也是名遊戲愛好者，因喜愛遊戲而使用 <span>JavaScript</span> 復刻一款童年時的熱門遊戲，結合喜愛的事物，悠遊在程式和遊戲的大海中。
                            </div>
                        </div>
                        
                </div> 
            </div>
            
            
       
    )
}

export default About;