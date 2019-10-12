import React from 'react';
import About from './src/components/About.js';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer
      .create(<About></About>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});
