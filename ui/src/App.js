import React from "react";
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Overview from "./overview";
import Message from "./message";
import {Route} from "react-router";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
                <div style={{height: '100%', width: '100%'}}>
                    <div>
                        <ReactNotification/>
                        <Router>
                            <Route path="/message" component={Message}/>
                            <Route exact path="/" component={Overview}/>
                        </Router>
                    </div>
                </div>
        );
    }
}
export default App;
