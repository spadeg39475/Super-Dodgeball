import React , { useState, useEffect}from "react";
import { Link } from "react-router-dom";


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
    function destroyGame(){
        if(window.game){
            window.game.destroy(true,false)
        }
    }

    return (
        <header>
            <nav>
            
                <div><img className='ball' src={ball} onClick={destroyGame} /><Link to='/'>HOME</Link></div>
                <div><Link to='/about' onClick={destroyGame}>ABOUT</Link></div>
                <div><Link to='/game' onClick={destroyGame}>GAME</Link></div>
            </nav>
        </header>
       
    )
}

export default Nav;