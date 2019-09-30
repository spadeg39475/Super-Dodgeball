import React , { useState,useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import { GameContext } from '../contexts/context'


import ball from '../../materials/img/ball-icon.png'
import '../css/nav.css'


const Nav = (props) => {
    const {state, setGame, setBallPos} = useContext(GameContext);
    // const [ballPos, setBallPos] = useState({left: 'calc(50% - 20% - 95px)'});
    // const {state, } = useContext(GameContext);

    const destroyGame=()=>{
        if(state.game){
            state.game.destroy(true,false)
            setGame(null);
        } 
    }
    console.log(props)

    // const changeBallPos=(e)=>{

    //     switch(e.target.id){
    //         case 'nav-home': 
    //             setBallPos({left: 'calc(50% - 20% - 95px)'});
    //             break;
    //         case 'nav-about':
    //             setBallPos({left: 'calc(50%  - 110px)'});
    //             break;
    //         case 'nav-game':
    //             setBallPos({left: 'calc(50% + 20% - 100px)'});
    //             break;
    //     }
    //     console.log(state)
    // }

    const navHandler=(e)=>{
        // changeBallPos(e);
        destroyGame();
    }
    
    


    return (
        <header>
            <nav id='nav'>
                {/* <img className='ball' src={ball}  style={props.ballPos} /> */}
                <div><Link to='/'  id='nav-home'>HOME</Link></div>
                <div><Link to='/about'  id='nav-about'>ABOUT</Link></div>
                <div><Link to='/game'  id='nav-game'>GAME</Link></div>
            </nav>
        </header>
       
    )
}

export default Nav;