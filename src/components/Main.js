import React , { useState,useEffect, useContext} from "react";
import { GameContext } from '../contexts/context'
import { BrowserRouter , Route } from 'react-router-dom';
import Home from './Home'
import About from './About'
import Game from './Game'
import Nav from './Nav'


const Main = () => {
    const {state} = useContext(GameContext);
        

    return (
        <React.Fragment>


                    <Nav ballPos={state.ballPos}/>
                    <Route exact path="/" component={Home}/>
                    <Route  path="/about" component={About}/>
                    <Route  path="/game"  component={Game}/>
                    
                
              
        </React.Fragment>
       
    )
}

export default Main;