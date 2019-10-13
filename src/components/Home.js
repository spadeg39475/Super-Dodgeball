import React, { useState, useEffect , useContext} from "react";
import { GameContext } from '../contexts/context'
import { Link } from "react-router-dom";

import '../css/home.css';
import Board from "./Board";
import Backdrop from "./Backdrop";






const Home = () => {
   
    const {state, setGame} = useContext(GameContext);
    if(state.game){
        state.game.destroy(true,false)
        setGame(null);
    } 
    const [showClose, setShowClose] = useState(false);
    const [show, setShow] = useState('story');
    const [color, setColor] = useState({
        story: {color: '#2c6fff'},
        video: {color: '#ffffff'},
        about: {color: '#ffffff'}
    })
    const [showBoard, setShowBoard] = useState(true);


    useEffect(()=>{
        if(window.innerWidth < 800 ) {
            setShowBoard(false);
            setColor({
                story: {color: '#ffffff'},
                video: {color: '#ffffff'},
                about: {color: '#ffffff'}
            })

        }

    },[showClose])

    const changeBoard = (e)=>{
        setShow(`${e.target.className}`);
        switch(e.target.className){
            case 'story':
                setColor({
                    story: {color: '#2c6fff'},
                    video: {color: '#ffffff'},
                    about: {color: '#ffffff'}
                })
                break;
            case 'video':
                setColor({
                    story: {color: '#ffffff'},
                    video: {color: '#2c6fff'},
                    about: {color: '#ffffff'},
                })
                break;
            case 'about':
                setColor({
                    story: {color: '#ffffff'},
                    video: {color: '#ffffff'},
                    about: {color: '#2c6fff'}
                })
                break;    
        }
        
        setShowBoard(true);         
            
            
    }
    
    return (
        <React.Fragment>
            <Backdrop/>
            <div className='main' id='main'>
                <div className='title'>
                    <p className='p1'>熱血高校</p>
                    <p className='p2'>Super Dodge Ball</p>
                    
                    <div className='menu'>
                        <Link to='/game' className='play'>Play</Link>
                        <div className='story' onClick={changeBoard} style={color.story} >Story</div>
                        <div className='video' onClick={changeBoard} style={color.video} >Video</div>
                        <div className='about' onClick={changeBoard} style={color.about} >About</div>
                    </div>
                    <Board 
                        type={show} 
                        showBoard={showBoard} 
                        setShowBoard={setShowBoard}
                        showClose={showClose}
                        setShowClose={setShowClose}    
                    />
                    <div className='warning'>This version can only play on Web!</div> 
                </div>
                
            </div>
           
            
        </React.Fragment>
       
    )
}

export default Home;

