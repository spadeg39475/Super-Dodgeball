import React from 'react';
import About from '../components/About';
import renderer from 'react-test-renderer';
import Enzyme,{shallow} from 'enzyme'  
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter() }) 

describe('about', ()=>{
    
    it('should show about component', ()=>{
        const tree = renderer.create(<About/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should show about me', ()=>{
        const title =shallow(<About/>);
        expect(title.find('.title').text()).toBe('About Me');
    })
})





