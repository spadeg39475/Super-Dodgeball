import React, { useState } from "react";

import '../css/about.css'

const About = () => {
    return (
        <React.Fragment>
            <div className='main'></div>
            <div className='about-background'></div>
            <div className='intro'>
                    <div className='container'>
                        <div className='title'>系列簡介</div>
                        <div className='content'>
                        熱血系列是由TECHNŌS JAPAN所開發製作的一系列電子遊戲的合稱，
                        遊戲內容主要為格鬥及運動兩大類。<br/><br/>
                        1986年 熱血系列的第一款作品為在街機上推出的橫向打鬥動作遊戲《熱血硬派》。<br/><br/>
                        1987年 熱血第二款作品推出在街機上，是球類運動遊戲《熱血高校》（又譯《熱血躲避球》）<br/><br/>
                        兩款也是日後同類遊戲的元祖作品。 
                        由於這兩款作品都博得極大的人氣，成功地打響了「熱血」的名號，所以TECHNŌS後來更專注於續作的開發
                        ，陸續推出多款遊戲，形成了所謂的「熱血系列」。<br/><br/>

                        熱血系列的遊戲場景大多相當生活化，遊戲人物十分可愛，各個具有超凡的運動能力，無厘頭的動作與喜劇化的像素繪十分受到喜愛。
                        </div>
                    </div>
            </div>

            <div className='gameSetting'>
                <div className='container'>
                    <div className='title'>遊戲簡介</div>
                    <div className='block'>
                        <div className='picture'>
                            <div className="kunio"></div>
                            <div className="mochizuki"></div>
                        </div>
                        <div className='content'>
                        
                            <div className='subtitle'>經典像素2D風格</div>
                        </div>
                    </div>
                    
                </div>
            </div>>
        </React.Fragment>
       
    )
}

export default About;