"use strict";
import React from 'react';
import {shallow} from 'enzyme';
import SpacesForm from '../src/SpacesForm';

describe('Space edit/create form', () => {
    it("spaces form renders", () => {
        const expected =[];
        const div = document.createElement('div');
        const spacesForm = shallow(<SpacesForm/>, div);
        expect(spacesForm).toBeDefined();
    });
});
