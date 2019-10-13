import React , { useState,useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import { GameContext } from '../contexts/context'



const Nav = (props) => {
    const {state, setGame, setBallPos} = useContext(GameContext);

    const destroyGame=()=>{
        if(state.game){
            state.game.destroy(true,false)
            setGame(null);
        } 
    }
   

    const navHandler=(e)=>{
        destroyGame();
    }
    
    


    return (
        <header>
            <nav id='nav'>
                
                <div><Link to='/'  id='nav-home'>HOME</Link></div>
                <div><Link to='/about'  id='nav-about'>ABOUT</Link></div>
                <div><Link to='/game'  id='nav-game'>GAME</Link></div>
            </nav>
        </header>
       
    )
}

export default Nav;