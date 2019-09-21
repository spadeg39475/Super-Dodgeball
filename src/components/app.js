import React, { useState } from "react";
import { HashRouter , Route } from 'react-router-dom';
import Home from './Home'
import About from './About'
import Game from './Game'
import Nav from './Nav'
import Footer from './Footer'


const App = () => {
    
    return (
        <React.Fragment>

            <HashRouter>
                <Nav />
                    <Route exact path="/" component={Home}/>
                    <Route  path="/about" component={About}/>
                    <Route  path="/game"  component={Game}/>
                
            </HashRouter>  

            <Footer />      
        </React.Fragment>
       
    )
}

export default App;