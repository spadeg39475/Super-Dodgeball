import React, { useState, useEffect, useContext} from "react";
import { GameContext } from '../contexts/context'
import Footer from './Footer';

import '../css/about.css'

const About = () => {

    const {state, setGame} = useContext(GameContext);
    if(state.game){
        state.game.destroy(true,false)
        setGame(null);
    } 

    return (
        <React.Fragment>
            
            <div className='main'>
                <div className='about-title'>
                    {/* <p className='p1'>永遠的童年回憶</p> */}
                    {/* <p className='p2'>Memory</p> */}
                    
                    {/* <div className='start'><Link to='/game' id='nav-game'>PLAY</Link></div> */}
                    <a href='#story' id='down'>
                        <img className='down-arrow'src='./materials/img/down-arrow.svg'></img>
                    </a>
                </div>
            </div>
            <div className='about-body'>
                <div className='intro'>
                        <div className='container'>
                            <div className='title'>About Game</div>
                            <div className='content'>
                            熱血系列是由 TECHNŌS JAPAN 所開發製作的一系列電子遊戲的合稱，
                            遊戲內容主要為格鬥及運動兩大類。<br/><br/>
                            1986 年 熱血系列的第一款作品為在街機上推出的橫向打鬥動作遊戲《熱血硬派》。<br/><br/>
                            1987 年 熱血第二款作品推出在街機上，是球類運動遊戲《熱血高校》（又譯《熱血躲避球》）<br/><br/>
                            兩款也是日後同類遊戲的元祖作品。 
                            由於這兩款作品都博得極大的人氣，成功地打響了「熱血」的名號，所以 TECHNŌS 後來更專注於續作的開發
                            ，陸續推出多款遊戲，形成了所謂的「熱血系列」。<br/><br/>

                            熱血系列的遊戲場景大多相當生活化，遊戲人物十分可愛，各個具有超凡的運動能力，無厘頭的動作與喜劇化的像素繪十分受到喜愛。
                            </div>
                        </div>
                </div>
                <div className='author'>
                        <div className='container'>
                            <div className='title'>About Me</div>
                            <div className='content'>
                            <span>一名轉職路上的新手前端工程師</span>，也是名遊戲愛好者，因喜愛遊戲而選擇用 JavaScript 復刻一款童年時的經典遊戲，結合喜歡的事物，徜徉在程式碼和遊戲的大海中。
                            </div>
                        </div>
                        
                </div>
                <Footer /> 
            </div>
            
            
            
            
        </React.Fragment>
       
    )
}

export default About;