import React from 'react';
import Story from '../components/Story';
import renderer from 'react-test-renderer';
import {GameContext} from '../contexts/context'




describe('about', ()=>{
    
    it('should show story component', ()=>{
        const tree = renderer.create(
            <GameContext.Provider value={{state: {game:null}}}>
                <Story/>
            </GameContext.Provider>)
        .toJSON();
        expect(tree).toMatchSnapshot();
    })
})


