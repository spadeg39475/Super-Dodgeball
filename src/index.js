
import React from "react";
import ReactDOM from "react-dom";
import './css/index.css'
// import 'phaser';
// import TitleScene from './scenes/TitleScene';
// import GameScene from './scenes/GameScene';
// import GameOver from './scenes/GameOver';

import App from "./components/app.js";

// const config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,
//     parent: 'app',
//     physics: {
//         default: 'arcade',
//         arcade: {
//             gravity: {
//                 y: 0
//             },
//             debug:true
//         }
//     },
//     scene: [
//         // TitleScene,
//         GameScene, 
//         GameOver
//     ],
//     audio: {
//         disableWebAudio: true
//     }
// }

// const game = new Phaser.Game(config);
ReactDOM.render(<App />, document.getElementById("root"));