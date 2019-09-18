import React , { useState }from "react";
import { Link } from "react-router-dom";
import '../css/nav.css'

const Nav = () => {
    return (
        <header>
            <nav>
            
                <div><img className='ball' src="./materials/img/ball-icon.png" /><Link to='/'>HOME</Link></div>
                <div><Link to='/about'>ABOUT</Link></div>
                <div><Link to='/game'>GAME</Link></div>
            </nav>
        </header>
       
    )
}

export default Nav;