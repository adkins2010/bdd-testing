import React, {Component} from 'react';

export default class SpaceForm extends Component {
    constructor(props) {
        super(props);
    }

    get someDiv() {
        return this.props.submitted ? (<div id="submitted"/>) : null
    }

    render() {
        return (
            <form id="formSave" onSubmit={this.props.onSubmit}>
                <div id="createSpaceDiv">
                    <h1>Create a new Space:</h1>
                    <hr/>
                    <div>
                        <label id="nameLabel">Name</label>
                        <br/>
                        <input id="nameText" type="text"/>
                    </div>
                    <div>
                        <label id="memoryLabel">Memory</label>
                        <br/>
                        <input id="memoryText" type="text"/>
                    </div>
                    <div>
                        <label id="diskLabel">Disk</label>
                        <br/>
                        <input id="diskText" type="text"/>
                    </div>
                    <div>
                        <input id="createSpace" type="submit" value="Create"/>
                    </div>
                </div>
                {this.someDiv}
            </form>
        );
    }
}


