import React from 'react';
import { shallow, mount } from 'enzyme';

import Sidebar from '../src/Sidebar'

describe("Sidebar" , () => {
    it('returns a sidebar', () => {
        const div = document.createElement('div');
        const spaces = [{name: 'Space1', memory_quotamb: '1000', disk_quotamb: '12000'},
            {name: 'Space2', memory_quotamb: '1000', disk_quotamb: '12000'}]

        const sidebar = shallow(<Sidebar spaces={spaces}/>, div);


        expect(sidebar.find('#sidebarItem1').text()).toBe('Space1 0%')
        expect(sidebar.find('#sidebarItem2').text()).toBe('Space2 0%')
        expect(sidebar.find('#addSpace').text()).toBe('Add Space')
    })

    it('calls changeMode function if list item is clicked', () => {
        const div = document.createElement('div');
        const spaces = [{name: 'Space1', memory_quotamb: '1000', disk_quotamb: '12000'},
            {name: 'Space2', memory_quotamb: '1000', disk_quotamb: '12000'}]
        const changeMode = jest.fn()
        const sidebar = shallow(<Sidebar spaces={spaces} changeMode={changeMode}/>, div);

        const spaceClick = sidebar.find("#sidebarItem1 > a")

        spaceClick.simulate("click")

        expect(changeMode).toHaveBeenCalled()


    })
})