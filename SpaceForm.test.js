import React from 'react';
import ReactDOM from 'react-dom';
import SpaceForm from '../SpaceForm';
import { shallow,mount } from 'enzyme';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SpaceForm />, div);
});

it('test to make sure elements are present', () => {
    const div = document.createElement('div');
    const spaceForm = shallow(<SpaceForm />, div);

    expect(spaceForm.find('h1').text()).toEqual("Create a new Space:");
});

it('save space to database',()=>{
    const expectedSpace ={"name": "Face Novel","disk_allocationmb": 1000,"memory_allocationmb": 1000};
    const div = document.createElement('div');
    const handleSubmit = jest.fn()
    const spaceForm = mount(<SpaceForm handleSubmit={handleSubmit} space={expectedSpace} />, div);
    const nameText = spaceForm.find('#nameText');

    nameText.simulate('change',{target:{value: 'Larry'}});

    // expect(handleSubmit).toHaveBeenCalledWith()
    // nameForm.Simulate.change({target: {value: 'ZachFromJS'}});
    // console.log("name form  = " + nameForm.value)
    // const memoryForm = spaceForm.find('memoryText')
    // memoryForm.simulate('change', {target: {value: '1000'}})
    // const diskForm = spaceForm.find('diskText')
    // diskForm.simulate('change', {target: {value: '1000'}})

    // spaceForm.find('#createSpace').simulate('click');
});

