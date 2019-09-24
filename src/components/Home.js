import React, { useState } from "react";
import Demo from './youtube'
import '../css/home.css'





const Home = () => {

    return (
        <React.Fragment>
            
            <div className='main'>
                {/* <div className="kunio"></div> */}
                <div className='title'>
                    <p className='p1'>Super Dodge Ball</p>
                    <p className='p2'> - 熱血高校</p>
                </div>
            </div>
            <div className='background'></div>
            <div className='story'>
                <div className='article'>
                    {/* <p className='title'></p> */}
                    <p className='text'>興趣是打架、運動萬能的不良少年國雄<br/>
                        在全國高校闘球試合上遇到了宿敵 
                        － 花園高校<br/>
                        目標是奪得全國優勝....
                    </p>
                    <div className="img">
                        <div className="kunio"></div>
                    </div>
                </div>
               
            </div>    
            <div className='demo'>
                <div className='video'>
                    <Demo videoId='chcHJm7G4p8'/>
                </div>
                
                <div className="kunio"></div>
            </div>
            
            
        </React.Fragment>
       
    )
}

export default Home;

