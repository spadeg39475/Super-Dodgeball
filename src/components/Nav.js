import React , { useState }from "react";
import { Link } from "react-router-dom";
import ball from '../../materials/img/ball-icon.png'
import '../css/nav.css'

const Nav = () => {
    return (
        <header>
            <nav>
            
                <div><img className='ball' src={ball} /><Link to='/'>HOME</Link></div>
                <div><Link to='/about'>ABOUT</Link></div>
                <div><Link to='/game'>GAME</Link></div>
            </nav>
        </header>
       
    )
}

export default Nav;