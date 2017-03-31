import React, {Component} from 'react';

export default class Sidebar extends Component {



    get sidebar(){


           return( this.props.spaces.map((space, index) => {
               console.log(space);
               return (
                   <li key={index} id={`sidebarItem${index+1}`}>
                       <a href="#" onClick={()=> {
                           return this.props.changeMode(space, index)
                       }}>{space.name} 0%</a>
                   </li>)
            }))
    }

    render() {
        return (
        <div>
            <ul className="ul">
                {this.sidebar}
                <button name="AddSpace" id="addSpace" onClick={this.props.addSpace}>Add Space</button>
            </ul>
        </div>

        );
    }
}