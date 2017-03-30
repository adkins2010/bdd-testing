import React, {Component} from 'react';
import './App.css';
import SpaceForm from './SpaceForm';
import SpacesSidebar from './SpacesSidebar';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spaces : [],
            isCreateSpace: false,
            submitted:false
        }
        this.onCreateSpaceClicked = this.onCreateSpaceClicked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onCreateSpaceClicked()
    {
        let state = this.state;
        state.isCreateSpace = !state.isCreateSpace;
        this.setState(state);
    }

    get findAllSpaces()
    {
        //make call to web service
        //localhost:8080/spaces
    }

    componentWillMount() {

        console.log("component mounted")
        let me = this;
        let fetched = fetch('/spaces')
            .then(function (response) {
                    if (response.status === 200) {
                        console.log("200 reached")
                        return response.json();
                    }
                    else
                        throw new Error("This failed with rc: " + response.status)
                })
            .then(data =>{
                console.log(data);
                let state = me.state;
                state.spaces = data;
                me.setState(state)
        })
            .catch(function (error) {
                console.log('Larry error', error)
            });
        // console.log(fetched);
        return fetched;
    }


    handleSubmit(event) {

        console.log("handle submit");
        event.preventDefault();
        const payload = '{"name" : "' + event.target[0].value + '",' +
            '"memory_quotamb": "' + event.target[1].value + '",' +
            '"disk_quotamb": "' + event.target[2].value + '"}';

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var myInit = { method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: payload};

        fetch("/spaces" , myInit)
            .then((response) => {
                this.setState({submitted: true})
            }).catch(new Error());
    }

    render() {
        return (
            <div id="App">
                <div id="spacesListDiv">
                    <SpacesSidebar spaces={this.state.spaces}/>
                </div>
                <div id="addSpaceDiv">
                    <button id="addSpace" onClick={this.onCreateSpaceClicked}>Add Space</button>
                    {this.state.isCreateSpace ? <SpaceForm
                            onSubmit={this.handleSubmit}
                            submitted={this.state.submitted}
                        /> : null}
                </div>
            </div>
        );
    }
}

export default App;
