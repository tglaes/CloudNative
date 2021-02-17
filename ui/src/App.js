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
                <div>
                    <ReactNotification/>
                    <Router>
                        <Route exact path="/" render={(props) => <Overview/>}></Route>
                        <Route path="/message" render={(props) => <Message/>}></Route>
                    </Router>
                </div>
        );
    }
}

export default App;
