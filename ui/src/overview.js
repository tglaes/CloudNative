import React from "react";
import "./index.css"
import {Card, Tab, Tabs} from "react-bootstrap";
import Login from "./login";
import Register from "./register";

class Overview extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="card-size">
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
        );
    }
}

export default Overview;