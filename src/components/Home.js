import React, { useState, useEffect , useContext} from "react";
import { GameContext } from '../contexts/context'
import { Link } from "react-router-dom";

import Demo from './youtube';
import Footer from './Footer';
import '../css/home.css';
import Board from "./Board";
import Backdrop from "./Backdrop";





const Home = () => {
   
    const {state, setGame} = useContext(GameContext);
    if(state.game){
        state.game.destroy(true,false)
        setGame(null);
    } 

    const [show, setShow] = useState('story');
    
    const changeBoard = (e)=>{
        setShow(`${e.target.className}`);
    }
    
    return (
        <React.Fragment>
            <Backdrop/>
            <div className='main' id='main'>
                <div className='title'>
                    <p className='p1'>熱血高校</p>
                    <p className='p2'>Super Dodge Ball</p>
                    
                    <div className='menu'>
                        {/* <img src='./materials/img/avg1.png'></img> */}
                        <Link to='/game' className='play'>Play</Link>
                        <div className='story' onClick={changeBoard}>Story</div>
                        <div className='video' onClick={changeBoard}>Video</div>
                        <div className='about' onClick={changeBoard}>About</div>
                    </div>
                   <Board type={show}/>
                        
                </div>
                
            </div>
            {/* <div className='background'></div>
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
                <a href='#gameSetting' id='down'>
                    <img className='down-arrow'src='./materials/img/down-arrow.svg'></img>
                </a>
                
                
            </div>
            <div className='gameSetting' id='gameSetting'>
                <div className='container'>
                    
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
                        <div className='picture'></div>
                    </div>
                    
                </div>
            </div>


            <div className='demo'>
                <div className='video'>
                    <Demo videoId='chcHJm7G4p8'/>
                </div>
                
                <div className="kunio"></div>
                <a href='#nav' id='down'>
                    <img className='down-arrow'src='./materials/img/down-arrow.svg'></img>
                </a>
            </div>
            <Footer />  */}
            
        </React.Fragment>
       
    )
}

export default Home;

