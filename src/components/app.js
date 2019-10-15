import React, { useState,useEffect } from "react";

import { BrowserRouter , Route } from 'react-router-dom';
import Home from './Home'
import Game from './Game'

import GameContextProvider from '../contexts/context.js'


const App = () => {

    return (
        <GameContextProvider>
            <React.Fragment>
                <BrowserRouter>    
                    
                    <Route exact path="/" component={Home}/>
                    <Route  path="/game"  component={Game}/>
                    
                </BrowserRouter>  
              
            </React.Fragment>
        </GameContextProvider>
       
    )
}

export default App;