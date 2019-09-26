import React, { useState } from "react";
import { Link } from "react-router-dom";

import Demo from './youtube';
import Footer from './Footer';
import '../css/home.css';





const Home = () => {

    return (
        <React.Fragment>
            
            <div className='main'>
                {/* <div className="kunio"></div> */}
                <div className='title'>
                    <p className='p1'>Super Dodge Ball</p>
                    <p className='p2'>熱血高校</p>
                    
                    <div className='start'><Link to='/game' id='nav-game'>PLAY</Link></div>
                    <a href='#story' id='down'>
                        <img className='down-arrow'src='./materials/img/down-arrow.svg'></img>
                    </a>
                </div>
                
            </div>
            <div className='background'></div>
            <div className='about-background'></div>
            <div className='about-background2'></div>
            <div className='story' id='story'>
                <div className='article'>
                    <div className='block'>
                        <div className='subtitle'>故事背景</div>
                        <p className='text'>    
                            興趣是打架、運動萬能的不良少年國雄<br/>
                            在全國高校闘球試合上遇到了宿敵 
                            － 花園高校<br/>
                            目標是奪得全國優勝....
                        </p>
                    </div>
                    
                   <div className="img"></div>
                </div>
               
            </div>
            <div className='gameSetting'>
                <div className='container'>
                    {/* <div className='title'>遊戲簡介</div> */}
                    <div className='block bl1'>
                        <div className='picture'></div>
                        <div className='content'>
                        
                            <div className='subtitle'>經典像素2D風格</div>
                            <div className='subtitle'>詼諧逗趣的表情</div>    
                            <div className='subtitle'>誇張的搞笑動作</div>    
                        </div>
                    </div>
                    <div className='block bl2'>
                        
                        <div className='content'>
                            <div className='subtitle'>一場熱血的球賽</div> 
                            <div className='subtitle'>用全力擊倒對手</div>  
                            <div className='subtitle'>丟出強力的魔球</div>    
                        </div>
                        <div className='picture'>
                            {/* <div className="kunio"></div>
                            <div className="ball"></div>
                            <div className="mochizuki"></div> */}
                        </div>
                    </div>
                    
                </div>
            </div>


            <div className='demo'>
                <div className='video'>
                    <Demo videoId='chcHJm7G4p8'/>
                </div>
                
                <div className="kunio"></div>
            </div>
            <Footer /> 
            
        </React.Fragment>
       
    )
}

export default Home;

