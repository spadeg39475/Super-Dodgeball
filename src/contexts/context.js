import React, { useState, createContext } from 'react';


export const GameContext = createContext({
    game: null,
    setGame: ()=>{},
    ballPos: {},
    setBallPos: ()=>{}
});

const GameContextProvider = (props) => {
    
    const setGame = (game)=>{
        setState({...state, game: game})
    }
    const setBallPos = (ballPos)=>{
        setState({...state, ballPos: ballPos});
    }
    
    const initState = {
        game: null,
        setGame:setGame,
        ballPos: {left: 'calc(50% - 20% - 95px)'},
        setBallPos: setBallPos
    }
    
    const [state, setState ] = useState(initState)
     
    return (
        <GameContext.Provider value={{state, setGame:state.setGame, setBallPos:state.setBallPos}}>
            {props.children}
        </GameContext.Provider> 
    )

}

export default GameContextProvider;