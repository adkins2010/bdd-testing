import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SpacesList from "./SpacesList";
import SpacesForm from "./SpacesForm";

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          spaces : []
      };
      this.state.editing = null;
  }
  render() {
    return (
      <div id="wired">
          <div id="spacesNavDiv">
              <SpacesList spaces={this.state.spaces}/>
              <button id="addSpaceButton" type="button" >Add Space</button>
          </div>
          <div id="mainDiv">
                <SpacesForm/>
          </div>
      </div>
    );
  }
}

export default App;
