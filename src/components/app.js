import React, { useState } from "react";
import Nav from './Nav.js'
import Banner from './Banner.js'

const App = () => {
    return (
        <React.Fragment>
            <Nav />
            <div className='main'>
                <Banner />
            </div>
        </React.Fragment>
       
    )
}

export default App;