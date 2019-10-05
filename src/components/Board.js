import React, { useState, useEffect, useContext} from "react";
import { GameContext } from '../contexts/context';
import { Link } from "react-router-dom";

import Demo from './youtube';
import About from './About';
import Story from './Story';
import Video from './Video';

const Board = (props) => {
    const [show, setShow] = useState('about');
    console.log(props)
    const showBlog = ()=>{
        switch(props.type){
            case 'video':
                return <Video />
                break;
            case 'story':
                return <Story />
                break;
            case 'about':
                return <About/>
                break;
        }
    }
    
    return (
        <div className='board'>
            
            {showBlog()}                    
        </div>
    )
}

export default Board;