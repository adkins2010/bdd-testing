import React, { Component } from 'react';

export default class SpacesList extends Component{
    render() {
        return (
            <ul id="spacesList">
                {this.spaces}
            </ul>
        );
    }
}