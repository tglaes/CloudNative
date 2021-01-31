import React from "react";
import './App.css';
import Login from "./login";
import {Card, Form, Tab, Tabs} from "react-bootstrap";
import Register from "./register";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <div className="App">
                    <Tabs defaultActiveKey="register">
                        <Tab eventKey="register" title="Registrierung">
                            <Card style={{width: '18rem'}}>
                                <Register/>
                            </Card>
                        </Tab>
                        <Tab eventKey="login" title="Login">
                            <Card style={{width: '18rem'}}>
                                <Login/>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>
            </div>


        );
    }
}

export default App;
