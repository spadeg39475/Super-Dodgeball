import React, { useState,useEffect } from "react";

import { BrowserRouter , Route } from 'react-router-dom';
import Home from './Home'
import About from './About'
import Game from './Game'
import Main from './Board'



import GameContextProvider from '../contexts/context.js'


const App = () => {
       

    return (
        <GameContextProvider>
            <React.Fragment>
                <BrowserRouter>    
                    {/* <Nav /> */}
                    <Route exact path="/" component={Home}/>
                    <Route  path="/game"  component={Game}/>
                    
                </BrowserRouter>  
              
            </React.Fragment>
        </GameContextProvider>
       
    )
}

export default App;