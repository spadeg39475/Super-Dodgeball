import React , { useState, useContext}from "react";
import { Link } from "react-router-dom";
import { GameContext } from '../contexts/context'


import ball from '../../materials/img/ball-icon.png'
import '../css/nav.css'
function newgame(){
    if(document.querySelector('#game')){
        let cav = document.querySelector('canvas');
        console.log(cav)
        document.querySelector('#game').removeChild(cav);

        
    }
}
const Nav = () => {
    const state = useContext(GameContext);
    
    const destroyGame=()=>{
        
        if(state.game){
            state.game.destroy(true,false)
            state.setGame(null);
        }
    }
    
    return (
        <header>
            <nav>
            
                <div><img className='ball' src={ball} /><Link to='/' onClick={destroyGame}>HOME</Link></div>
                <div><Link to='/about' onClick={destroyGame}>ABOUT</Link></div>
                <div><Link to='/game' onClick={destroyGame}>GAME</Link></div>
            </nav>
        </header>
       
    )
}

export default Nav;