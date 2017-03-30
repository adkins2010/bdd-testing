import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import SpaceForm from '../SpaceForm';
import SpacesSidebar from '../SpacesSidebar';
import Space from '../Space';
import {shallow} from 'enzyme';
import mockJson from "../../public/spaces.json";
import fetchMock from 'fetch-mock';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

it('tests to make sure button is present', () => {
    const div = document.createElement('div');
    const app = shallow(<App />, div);
    expect(app.find('#addSpace')).toHaveLength(1);
});

it('tests to make sure button is clicked and Create a new Space comes up', () => {
    const div = document.createElement('div');
    const app = shallow(<App />, div);
    // expect(app.find('h1')).toHaveLength(0);
    app.find('#addSpace').simulate('click');

    const spaceForm = app.find(SpaceForm.name);
    expect(spaceForm.length).toEqual(1);

});

it('test that Space Sidebar component exists', () => {
    const div = document.createElement('div');
    const app = shallow(<App />, div);
    let spaceSideBar = app.find(SpacesSidebar.name);
    expect(spaceSideBar).toBeDefined();
});

it('test that Space component exists', () => {
    const div = document.createElement('div');
    const app = shallow(<App />, div);
    let space = app.find(Space.name);
    expect(space).toBeDefined();
});

it("test mock space data from web service", () => {
    const div = document.createElement('div');
    const app = shallow(<App />, div);

    fetchMock
        .mock('/spaces', mockJson);

    return app.node._self.componentWillMount()
        .then(() => {
            expect(fetchMock.done()).toBeTruthy();
            // expect(app.state().spaces).toBe(mockJson.spaces);

            console.log(app.state().spaces[0].appList[0].id);
            // let carousel = app.find(Carousel.name);
            // expect(carousel.props().posts).toHaveLength(3);
        })
        .catch(error => {
           console.log(error);
        });

    fetchMock.restore();

});

// beforeEach(() => {
//     fetchMock.mock('/spaces', mockJson);
// });