import React, {Component} from 'react';

export default class SpaceEdit extends Component {

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {

        // this.props.onChange(event);

        // this.state.space[event.target.id]  = event.target.value;
        // this.setState(this.state);
        this.props.space[event.target.name] = event.target.value;
        // console.log(this.props.space)
    }


    render() {
        // console.log(this.props.space)
        return (
            <div>
                <h1>Create a new Space: </h1>
                <form name="new-space-form" onSubmit={this.props.onDone}>
                    <label> Name: </label>
                    <input type="text" id="spaceName" onChange={this.handleInputChange}
                           name="name" defaultValue={this.props.space.name}></input>

                    <label> Memory: </label>
                    <input type="number" id="memory" onChange={this.handleInputChange}
                           name="memory_quotamb" defaultValue={this.props.space.memory_quotamb}></input>

                    <label> Disk: </label>
                    <input type="number" id="disk" onChange={this.handleInputChange}
                           name="disk_quotamb" defaultValue={this.props.space.disk_quotamb}></input>

                    <input type="submit" name="submitButton" id="submitButton" value={this.props.mode}></input>
                </form>

            </div>

        );
    }
}