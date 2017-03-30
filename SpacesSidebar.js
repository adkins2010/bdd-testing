import React, {Component} from 'react';
import Space from './Space';


export default class SpacesSidebar extends Component {

    get getSpaces (){
        return (this.props.spaces !== undefined ? (this.props.spaces.map((space,i)=>(
            <span id={"space" + i} key={i}>
                <a>{space.name}</a>
            </span>
        ))) : "");
    }

    get calcualateSpacePercentage()
    {

    }
    render (){
        return (
            <div id="spacesDiv">
                {this.getSpaces}
            </div>
        );
    }
}