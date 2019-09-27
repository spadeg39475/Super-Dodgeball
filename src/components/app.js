import React, { useState,useEffect } from "react";

import { BrowserRouter , Route } from 'react-router-dom';
// import Home from './Home'
// import About from './About'
// import Game from './Game'
// import Nav from './Nav'
import Main from './Main'


import GameContextProvider from '../contexts/context.js'


const App = () => {
   
    
    
       

    return (
        <React.Fragment>

            <BrowserRouter>
                <GameContextProvider>
                    <Main />
                </GameContextProvider>
            </BrowserRouter>  

              
        </React.Fragment>
       
    )
}

export default App;