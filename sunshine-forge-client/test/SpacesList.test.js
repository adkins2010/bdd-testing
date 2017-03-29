"use strict";
import React from 'react';
import {shallow} from 'enzyme';
import SpacesList from '../src/SpacesList';

describe('Spaces List', () => {
    it('should render spaces', () =>{
        const expected =[];
        const div = document.createElement('div');
        const spacesList = shallow(<SpacesList spaces={expected}/>, div);
        const actual = spacesList.find('li');
        expect(actual).toHaveLength(0);
    });
});
