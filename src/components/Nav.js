import React , { useState }from "react";
import '../css/nav.css'

const Nav = () => {
    return (
        <header>
            <nav>
            
                <div><img className='ball' src="./materials/img/ball-icon.png"></img>HOME</div>
                <div>ABOUT</div>
                <div>GAME</div>
            </nav>
        </header>
       
    )
}

export default Nav;