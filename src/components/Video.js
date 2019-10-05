import React, { useState, useEffect, useContext} from "react";
import { GameContext } from '../contexts/context'
import Footer from './Footer';
import Demo from './youtube';
import '../css/video.css'

const Video = () => {

    const {state, setGame} = useContext(GameContext);
    if(state.game){
        state.game.destroy(true,false)
        setGame(null);
    }
    return (
        <div className='video' id='video'>
            <Demo />
                
            <div className="kunio"></div>
        </div>
    )
}

export default Video;