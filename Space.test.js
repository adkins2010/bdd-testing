import React from 'react';
import ReactDOM from 'react-dom';
import { shallow,mount } from 'enzyme';
import Space from '../Space';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Space />, div);
});

it('find all apps for a given space')