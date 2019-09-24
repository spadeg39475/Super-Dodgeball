import React, { useState, createContext } from 'react';
import setState from '../scenes/setState';

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
        <GameContext.Provider value={{state}}>
            {props.children}
        </GameContext.Provider> 
    )

}

export default GameContextProvider;