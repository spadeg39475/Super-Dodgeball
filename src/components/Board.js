import React, { useState, useEffect, useContext} from "react";

import About from './About';
import Story from './Story';
import Video from './Video';

const Board = (props) => {
    
    useEffect(()=>{
        if(window.innerWidth < 800) {
            props.setShowClose(true);
        }
    },[props.showClose])

    const showBlog = ()=>{
        switch(props.type){
            case 'video':
                return <Video />
                
            case 'story':
                return <Story />
                
            case 'about':
                return <About />
        }
    }
    const close = ()=>{
        props.setShowBoard(false);
    }
    
    return (
        <div className='board' style={{display: props.showBoard ? 'block' : 'none'}}>
            {showBlog()}   
            <div className='close' onClick={close} style={{display: props.showClose ? 'block' : 'none'}}>X</div>                 
        </div>
    )
}

export default Board;