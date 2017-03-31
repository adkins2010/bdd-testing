import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';

import SpaceEdit from '../src/SpaceEdit'
import Sidebar from '../src/Sidebar'

describe("App" , () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    })

    it('has state', () => {
        const div = document.createElement('div');
        const app= shallow(<App />, div);
        expect(app.state().spaces).toHaveLength(0);
        expect(app.state().editing).toMatchObject({})
        expect(app.state().mode).toBe("Index");

    })

    it('it passes a space state', () => {
        const div = document.createElement('div');
        const app= shallow(<App />, div);

        app.node._self.addSpace();
        expect(app.state().editing).toMatchObject({name: '', memory_quotamb: 0, disk_quotamb: 0});
        expect(app.state().mode).toBe("Create");

        const spaceEdit = app.find(SpaceEdit.name);
        expect(spaceEdit.props().space).toMatchObject({name: '', memory_quotamb: 0, disk_quotamb: 0});

    })


    it('renders create space page after \"Add Space\" is clicked', () => {
        const div = document.createElement('div');
        const app = mount(<App />, div);
        app.instance().addSpace();
        expect(app.state().mode).toBe("Create");
        const spaceCreate = app.find(SpaceEdit.name);

        const actual = spaceCreate.find('input');
        expect(actual).toHaveLength(4);
    });

    it("should POST a new space to the API", () => {

        const div = document.createElement('div');
        const app = mount(<App />, div);
        app.instance().addSpace();

        const space = {name: 'Space1', memory_quotamb: 1000, disk_quotamb: 12000};

        fetchMock.post('/spaces', space);

        app.instance().postNewSpace(space).then(function(response) {
            // console.log('Response', response);
            expect(response.status).toBe(200);
        })

        // Unmock.
        fetchMock.restore();
    })

    it("should display a sidebar in all modes", () => {

        const div = document.createElement('div');
        const app = mount(<App />, div);


        const space = {name: 'Space1', memory_quotamb: 1000, disk_quotamb: 12000};
        app.state().spaces.push(space);
        app.instance().forceUpdate();
        const sidebar = app.find(Sidebar.name);
        const actual = sidebar.find('#sidebarItem1');


        console.log(app.state().spaces)
        expect(actual.text()).toBe("Space1 0%");

    })

    it('should get a list of existing spaces', () => {
        const mock = jest.fn()

        mock.mockReturnValue({then: jest.fn().mockReturnValue({
            then: jest.fn()
        })})

        window.fetch = mock

        const div = document.createElement('div');
        const app = shallow(<App />, div);

        expect(mock).toHaveBeenCalledWith('/spaces')
    })

    it('renders details of space when space item in sidebar is clicked', () => {
        const div = document.createElement('div');
        const app = mount(<App />, div);

        expect(app.state().mode).toBe("Details");
        const spaceDetails = app.find(SpaceDetails.name);

        const actual = spaceDetails.find('h2');
    });
})

