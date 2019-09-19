import React, { useState } from "react";
import Demo from './youtube'
import '../css/home.css'





const Home = () => {

    return (
        <React.Fragment>
            
            <div className='main'>
                <div className="kunio"></div>
                <div className='title'>
                    <p className='p1'>Super Dodge Ball</p>
                    <p className='p2'>- Kunio-kun Series</p>
                </div>
            </div>

            <div className='story'>
                <div className='article'>
                    <p className='title'>永遠的童年回憶</p>
                    <p className='text'> <span>1987</span>年
                        <span> TECHNOS </span>在經過了大型機台版「熱血高校躲避球部」的一炮而紅後，於隔年的<span> 1988 </span>年，推出了任天堂版<span>( </span>簡稱<span> FC )</span>的熱血高校
                        更獲得了廣大的迴響，從此奠定了熱血躲避球部的分支基礎。熱血系列也形成了「熱血硬派系列」和「熱血躲避球部系列」兩大分支
                    </p>
                </div>
                <div className="img"></div>
            </div>    
            <div className='demo'>
                <Demo videoId='chcHJm7G4p8'/>
            </div>
            
            
        
            
           
            
            {/* <video id="demo" preload='true' controls loop  width="640" height="360">
                <source src="../../materials/video/demo.mp4" type="video/mp4"/>
            </video> */}
        </React.Fragment>
       
    )
}

export default Home;

