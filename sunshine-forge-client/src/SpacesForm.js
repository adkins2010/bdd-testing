import React, { Component } from 'react';

export default class SpacesForm extends Component{

    render() {
        return(
            <form id="createSpaceContainer">
                <label>Name</label><br/>
                <input name="name"/>
                <label>Memory</label><br/>
                <input name="memory"/>
                <label>Disk</label><br/>
                <input name="disk"/>
            </form>
        );
    }

}