import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import {shallow} from 'enzyme';
import SpacesList from '../src/SpacesList';
import SpacesForm from '../src/SpacesForm';

describe('App', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });
    it('test that spaces list is empty', ()=> {
        const div = document.createElement('div');
        const app = shallow(<App />, div);
        const spacesList = app.find(SpacesList.name);
        expect(spacesList.props().spaces).toHaveLength(0);

    });
    it('test that the create space form exists', ()=> {
        const div = document.createElement('div');
        const app = shallow(<App />, div);

        const spacesForm = app.find(SpacesForm.name);
        expect(spacesForm).toBeDefined();
    });
});
