import React from 'react';
import ReactDOM from 'react-dom';
import SpacesSidebar from '../SpacesSidebar';
import Space from '../Space';
import { shallow } from 'enzyme';

describe('Spaces Sidebar', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SpacesSidebar />, div);
    });

    it('renders a Space list', ()=>{
        const div = document.createElement('div');
        const spaces = [
            {name: "Faces Novel",disk_allocationmb: 1000,memory_allocationmb: 1000},
            {name: "Space Odyssey: 2000",disk_allocationmb: 1000,memory_allocationmb: 1000}
        ];
        const spacesSideBar = shallow(<SpacesSidebar spaces={spaces}/>, div);
        const actual = spacesSideBar.find('#spacesDiv').children();
        expect(actual).toHaveLength(2);
    });
});

