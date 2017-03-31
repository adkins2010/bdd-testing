import React, { Component } from 'react';
import SpaceEdit from "./SpaceEdit";
import Sidebar from "./Sidebar";
import './App.css';


class App extends Component {


    constructor(props){
        super(props)

        this.state = {
            spaces: [],
            editing: {},
            mode: "Index",
            index: -1
        }

        this.addSpace = this.addSpace.bind(this)
        this.onDone = this.onDone.bind(this)
        this.postNewSpace = this.postNewSpace.bind(this)
        this.changeMode = this.changeMode.bind(this)
        this.putNewSpace = this.putNewSpace.bind(this)

    }

    componentWillMount() {
        fetch('/spaces').then(response => response.json())
            .then(spaces => { this.setState({spaces: spaces}) })
    }

    addSpace(){
        const editing = {name: '', memory_quotamb: 0, disk_quotamb: 0}
        this.setState({editing: editing, mode: "Create"})
        // debugger
    }

    onDone(event){
        // debugger
        event.preventDefault()
        console.log(event)
        console.log("OnDone state.editing = ", this.state.editing)

        if(this.state.mode === "Create"){
            this.state.spaces.push(this.state.editing)
            this.postNewSpace(this.state.spaces[this.state.spaces.length - 1])
            this.setState({index:-1})
        }
        else if (this.state.mode === "Edit"){
            // debugger
            this.putNewSpace(this.state.editing)
        }
        this.componentWillMount();
    }

    putNewSpace(space){
        const self = this;
        space.memory_quotamb = Number(space.memory_quotamb);
        space.disk_quotamb = Number(space.disk_quotamb);
        const spaces = this.state.spaces;
        spaces[this.state.index] = space;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var myInit = { method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(space)};

        return fetch('/spaces/1', myInit)
            .then(function(response) {
                self.setState({spaces: {spaces}, editing: {space}, mode:"Index"})
                return response;
            });
    }

    postNewSpace(space){
        const self = this;
        space.memory_quotamb = Number(space.memory_quotamb);
        space.disk_quotamb = Number(space.disk_quotamb);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var myInit = { method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(space)};

        return fetch('/spaces', myInit)
            .then(function(response) {
                self.setState({editing: {}, mode:"Index"})
                return response;
            });
    }

    changeMode(space, index){
        console.log(this.state)

        this.setState({editing: space, mode:"Edit", index:index})
    }

    get display(){
        // return this.state.editing
        //     ? <SpaceEdit space={this.state.editing} onDone={this.onDone} mode={this.state.mode} />
        //     : <div id="list">
        //         <button name="AddSpace" id="addSpace" onClick={this.addSpaces}>Add Space</button>
        //     </div>

        switch(this.state.mode.toLowerCase()){
            case "edit": return <SpaceEdit space={this.state.editing} mode="Edit" onDone={this.onDone}/>
                // break;
            case "create": return <SpaceEdit space={this.state.editing} onDone={this.onDone} mode="Create" />
                // break;
            default:
                return <h1 id="index">Index</h1>;
        }
    }


    get spaces() {
        console.log("Spaces ",this.state.spaces)
        if(this.state.spaces.length === undefined) {
            // this.state.spaces = [this.state.editing]
            // debugger
            console.log(this.state.spaces.length);
            console.log(this.state.spaces[0]);
        }
        console.log("Spaces Array: ",this.state.spaces)
        return this.state.spaces;
    }


    render() {
    return (

        <div id="App">
            <div id="sidebar"> <Sidebar spaces={this.spaces} addSpace={this.addSpace} changeMode={this.changeMode}/> </div>
            <div id="form">{this.display}</div>
        </div>

    );
  }
}

export default App;
