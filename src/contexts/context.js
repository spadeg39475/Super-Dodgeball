import React, { createContext } from 'react';

export const GameContext = createContext();

class GameContextProvider extends React.Component {
    state = {
        gameBody: null
    }
    render(){
        return (
            <GameContext.Provider value={{...this.state}}>
                {this.props.children}
            </GameContext.Provider> 
        )
    }

}

export default GameContextProvider;