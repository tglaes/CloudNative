import React from "react";
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Overview from "./overview";
import Message from "./message";
import {Route} from "react-router";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
                <div>
                    <Router>
                        <Route exact path="/" render={(props) => <Overview/>}></Route>
                        <Route path="/message" render={(props) => <Message/>}></Route>
                    {/*    <Switch>*/}
                    {/*        <Route component={<Overview/>}></Route>*/}
                    {/*        /!*<Route path="message" component={<Message/>}></Route>*!/*/}
                    {/*    </Switch>*/}
                    </Router>
                    {/*<Overview>*/}

                    {/*</Overview>*/}
                    {/*<Message></Message>*/}

                </div>
        );
    }
}

export default App;
