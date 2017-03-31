import React from 'react';
import {shallow} from 'enzyme';
import SpaceEdit from '../src/SpaceEdit';

describe('SpaceEdit', () => {

    describe('in create mode', () => {
        it('returns new Space', () => {
            const expected = {name: 'Space1', memory_quotamb: '1000', disk_quotamb: '12000'};
            const newSpace =  {name: '', memory_quotamb: '0', disk_quotamb: '0'}
            const onDone = jest.fn()
            const div = document.createElement('div');
            const spaceCreate = shallow(<SpaceEdit onDone={onDone} space={newSpace}/>, div);

            spaceCreate.find('#spaceName').simulate('change', {target: {name: 'name', value: 'Space1'}});
            spaceCreate.find('#memory').simulate('change', {target: {name: 'memory_quotamb', value: '1000'}});
            spaceCreate.find('#disk').simulate('change', {target: {name: 'disk_quotamb', value: '12000'}});


            // expect(spaceCreate.props().space).toMatchObject(expected);

            spaceCreate.find('form').simulate('submit');

            expect(onDone).toHaveBeenCalled();

        });
    })

    // describe('in edit mode', () => {
    //     it('should update name', () => {
    //         const expected = {spaceName: 'space1', memory: '100', disk: '100'};
    //         const div = document.createElement('div');
    //         const spaceEdit = shallow(<SpaceEdit space={expected}/>, div);
    //         spaceEdit.find('#spaceName').simulate('change', {target: {name: 'spaceName', value: 'space1'}});
    //         expect(spaceEdit.props().space.spaceName).toBe('space1');
    //     });
    //     it('should update memory', () => {
    //         const expected = {spaceName: 'space1', memory: '100', disk: '100'};
    //         const div = document.createElement('div');
    //         const spaceEdit = shallow(<SpaceEdit space={expected}/>, div);
    //         spaceEdit.find('#memory').simulate('change', {target: {name: 'memory', value: '100'}});
    //         expect(spaceEdit.props().space.memory).toBe('100');
    //     });
    //
    //     it('should update disk', () => {
    //         const expected = {spaceName: 'space1', memory: '100', disk: '100'};
    //         const div = document.createElement('div');
    //         const spaceEdit = shallow(<SpaceEdit space={expected}/>, div);
    //         spaceEdit.find('#disk').simulate('change', {target: {name: 'disk', value: '100'}});
    //         expect(spaceEdit.props().space.disk).toBe('100');
    //     });
    //
    //     // it('returns edited person', () => {
    //     //     const expected = {spaceName: 'space1', memory: '100', disk:'100'};
    //     //     const onDone = jest.();
    //     //     const div = document.createElement('div');
    //     //     const personEdit = shallow(<PersonEdit person={expected} onDone={onDone}/>, div);
    //     //
    //     //     personEdit.find('#firstName').simulate('change', {target: {name: 'firstName', value: 'Ford'}});
    //     //     personEdit.find('#lastName').simulate('change', {target: {name: 'lastName', value: 'Prefect'}});
    //     //     personEdit.find('button').simulate('click');
    //     //
    //     //     expect(onDone.calledWith({firstName: 'Ford', lastName: 'Prefect'})).toBe(true);
    //     // });
    // })
});