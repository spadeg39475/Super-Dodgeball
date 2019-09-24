import React , { useState, useContext} from "react";
import { Link } from "react-router-dom";
import { GameContext } from '../contexts/context'


import ball from '../../materials/img/ball-icon.png'
import '../css/nav.css'
import { callbackify } from "util";

const Nav = () => {
    const {state, setGame} = useContext(GameContext);
    const [ballPos, setBallPos] = useState({left: 'calc(50% - 20% - 95px)'})
    const destroyGame=()=>{
        if(state.game){
            state.game.destroy(true,false)
            setGame(null);
        } 
    }
    const changeBallPos=(e)=>{
        switch(e.target.id){
            case 'nav-home': 
                setBallPos({left: 'calc(50% - 20% - 95px)'});
                break;
            case 'nav-about':
                setBallPos({left: 'calc(50%  - 110px)'});
                break;
            case 'nav-game':
                setBallPos({left: 'calc(50% + 20% - 100px)'});
                break;
        }
    }

    const navHandler=(e)=>{
        changeBallPos(e);
        destroyGame();
    }
    
    
    return (
        <header>
            <nav>
                <img className='ball' src={ball}  style={ballPos}/>
                <div><Link to='/' onClick={navHandler} id='nav-home'>HOME</Link></div>
                <div><Link to='/about' onClick={navHandler} id='nav-about'>ABOUT</Link></div>
                <div><Link to='/game' onClick={navHandler} id='nav-game'>GAME</Link></div>
            </nav>
        </header>
       
    )
}

export default Nav;