import React, { useState } from "react";
import { BrowserRouter , Route } from 'react-router-dom';
import Home from './Home'
import About from './About'
import Game from './Game'
import Nav from './Nav'
import Footer from './Footer'


const App = () => {
    
    return (
        <React.Fragment>

            <BrowserRouter>
                <Nav />
                    <Route exact path="/" component={Home}/>
                    <Route  path="/about" component={About}/>
                    <Route  path="/game"  component={Game}/>
                
            </BrowserRouter>  

            <Footer />      
        </React.Fragment>
       
    )
}

export default App;