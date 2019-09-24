import React, { useState, createContext } from 'react';


export const GameContext = createContext({
    game: null,
    setGame: ()=>{}
});

const GameContextProvider = (props) => {
    
    const setGame = (game)=>{
        setState({...state, game: game})
    }
    
    const initState = {
        game: null,
        setGame:setGame
    }
    
    const [state, setState ] = useState(initState)
    
    

    
     
    return (
        <GameContext.Provider value={{state, setGame:state.setGame}}>
            {props.children}
        </GameContext.Provider> 
    )

}

export default GameContextProvider;