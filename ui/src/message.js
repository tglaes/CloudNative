import React from "react";
import "./message.css";
import {Formik} from "formik";
import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AddIcon from '@material-ui/icons/Add';
import {sendMessage} from "./requests";
import {Button, Form, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //token: this.props.location.state.token,
            messages: [{
                body: "Hello Cloud Native",
                resE: "hallo@test.de",
                sendE: "sender@sending.com",
            },
                {
                    body: "Hello from the other side",
                    resE: "hallo@test.de",
                    sendE: "senderTest@sending.com"
                },
                {
                    body: "Hello 3456",
                    resE: "hallo@test.de",
                    sendE: "senderTest123@sending.com"
                }],
            showMessage: false,
            currentBody: '',
            showNewTemplate: false,
            recipientEmail: '',
            senderEmail: '',
        }
    }

    componentDidMount() {
    }

    showMessageItem(item) {
        console.log(item);
        this.setState({
            showNewTemplate: false,
            showMessage: true,
            body: item.body,
            recipientEmail: item.resE,
            senderEmail: item.sendE,
        })
    }

    logout() {
        window.location = "/"
        //this.props.location.push('/')
    }

    addEmptyTemplate = () => {
        this.setState({
            showNewTemplate: true,
            showMessage: false,
            body: "",
            senderEmail: "",
        })
    }

    render() {
        // https://bootstrapious.com/p/bootstrap-chat
        return (
            <div className="Message">
                <Formik
                    onSubmit={(values, actions) => {
                        const data = {
                            // recipientEmail: this.state.recipientEmail,
                            // senderEmail: this.state.senderEmail === "" ? values.senderEmail : this.state.senderEmail,
                            recipientEmail: this.state.senderEmail === "" ? values.senderEmail : this.state.senderEmail,
                            body: values.message,
                            // token: this.state.token,
                        };

                        console.log(data)

                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'text/plain' },
                            body: JSON.stringify(data)
                        };
                        fetch('http://localhost:8300/gateway/message', requestOptions)
                            .then(response => {
                                console.log(response);
                            }).catch((error) => {
                            console.log(error);
                        });

                    }}
                    initialValues={{
                        senderEmail: this.state.senderEmail,
                        message: "",
                    }}
                >
                    {({
                          handleSubmit,
                          handleChange,
                          values,
                      }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <div className="message-box-size"
                                 style={{marginTop: "160px", marginLeft: "170px", marginRight: "170px"}}>
                                <div className="row rounded-lg overflow-hidden shadow">
                                    <div className="col-5 px-0">
                                        <div className="bg-white">
                                            <div className="bg-gray px-4 py-2 bg-light">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <p className="h5 mb-0 py-1">Recent</p>
                                                    </div>
                                                    <div className="col-5 mt-1" onClick={this.addEmptyTemplate}>
                                                        <Link><AddIcon/>Neue Nachricht</Link></div>
                                                    <div className="col-3 mt-1"><Link
                                                        onClick={this.logout}><PowerSettingsNewIcon/> Ausloggen</Link>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="messages-box">
                                                <div className="list-group rounded-0">
                                                    <ListGroup>
                                                        {this.state.messages.map(item =>
                                                            <ListGroup.Item onClick={(e =>
                                                                this.showMessageItem(item))
                                                            }> <AccountCircleIcon fontSize="large"/>{item.sendE}
                                                            </ListGroup.Item>
                                                        )}
                                                    </ListGroup>

                                                    {/*<a className="list-group-item list-group-item-action active text-white rounded-0">*/}
                                                    {/*         <div className="media"><AccountCircleIcon fontSize="large"/>*/}
                                                    {/*       <div className="media-body ml-4">*/}
                                                    {/*               <div className="d-flex align-items-center justify-content-between mb-1">*/}
                                                    {/*                <h6 className="mb-0">Jason Doe</h6><small*/}
                                                    {/*                      className="small font-weight-bold">25*/}
                                                    {/*                      Dec</small>*/}
                                                    {/*                 </div>*/}
                                                    {/*                 <p className="font-italic mb-0 text-small">Lorem ipsum dolor sit amet,*/}
                                                    {/*                      consectetur adipisicing elit, sed do eiusmod tempor incididunt ut*/}
                                                    {/*                    labore.</p>*/}
                                                    {/*            </div>*/}
                                                    {/*       </div>*/}
                                                    {/*    </a>*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {this.state.showNewTemplate ?
                                        <div className="col-7 px-0">
                                        <div className="px-4 py-5 chat-box bg-white">

                                            <Form.Group controlId="senderEmail">
                                                <Form.Control
                                                    className="form-control rounded-0 border-0 py-4 bg-light"
                                                    type="text"
                                                    aria-describedby="button-addon2"
                                                    placeholder="Empfänger"
                                                    value={values.senderEmail}
                                                    onChange={handleChange}
                                                />

                                            </Form.Group>

                                            {/*{this.state.showMessage ?*/}
                                            {/*    <div className="media w-50 ml-auto mb-3">*/}

                                            {/*        <div className="media-body">*/}
                                            {/*            <div className="bg-primary rounded py-2 px-3 mb-2">*/}
                                            {/*                <p className="text-small mb-0 text-white">Apollo*/}
                                            {/*                    University, Delhi, India*/}
                                            {/*                    Test</p>*/}
                                            {/*                <p className="text-small mb-0 text-white">{this.state.body}</p>*/}
                                            {/*            </div>*/}
                                            {/*        </div>*/}
                                            {/*    </div> : <div></div>}*/}

                                        </div>

                                        <div className="row" style={{
                                            backgroundColor: "#f8f9fa",
                                            marginLeft: "0px",
                                            marginBottom: "-16px"
                                        }}>
                                            <div className="col-11">
                                                <Form.Group controlId="message">
                                                    <Form.Control
                                                        className="form-control rounded-0 border-0 py-4 bg-light"
                                                        type="text"
                                                        aria-describedby="button-addon2"
                                                        placeholder="Nachricht schreiben ..."
                                                        value={values.message} onChange={handleChange}
                                                    />

                                                </Form.Group>
                                            </div>
                                            <div className="col-1 ">
                                                <Form.Group controlId="email">
                                                    <div className="input-group-append">
                                                        <button id="button-addon2" type="submit"
                                                                className="btn btn-link"><SendIcon/></button>
                                                    </div>
                                                </Form.Group>


                                            </div>
                                        </div>
                                    </div> : <div className="col-7 px-0">
                                            <div className="px-4 py-5 chat-box bg-white">

                                                <Form.Group controlId="senderEmail">
                                                    <Form.Control
                                                        className="form-control rounded-0 border-0 py-4 bg-light"
                                                        type="text"
                                                        aria-describedby="button-addon2"
                                                        placeholder="Empfänger"
                                                        value={this.state.senderEmail}
                                                        disabled
                                                        onChange={handleChange}
                                                    />

                                                </Form.Group>

                                                {this.state.showMessage ?
                                                    <div className="media w-50 ml-auto mb-3">

                                                        <div className="media-body">
                                                            <div className="bg-primary rounded py-2 px-3 mb-2">
                                                                <p className="text-small mb-0 text-white">{this.state.body}</p>
                                                            </div>
                                                        </div>
                                                    </div> : <div></div>}

                                            </div>

                                            <div className="row" style={{
                                                backgroundColor: "#f8f9fa",
                                                marginLeft: "0px",
                                                marginBottom: "-16px"
                                            }}>
                                                <div className="col-11">
                                                    <Form.Group controlId="message">
                                                        <Form.Control
                                                            className="form-control rounded-0 border-0 py-4 bg-light"
                                                            type="text"
                                                            aria-describedby="button-addon2"
                                                            placeholder="Nachricht schreiben ..."
                                                            value={values.message}
                                                            onChange={handleChange}
                                                        />

                                                    </Form.Group>
                                                </div>
                                                <div className="col-1 ">
                                                    <Form.Group controlId="email">
                                                        <div className="input-group-append">
                                                            <button id="button-addon2" type="submit"
                                                                    className="btn btn-link"><SendIcon/></button>
                                                        </div>
                                                    </Form.Group>


                                                </div>
                                            </div>


                                            {/*<form action="#" className="bg-light">*/}
                                            {/* <div className="input-group">*/}
                                            {/*      <input type="text" placeholder="Nachricht schreiben ..." aria-describedby="button-addon2"*/}
                                            {/*              className="form-control rounded-0 border-0 py-4 bg-light"/>*/}
                                            {/*       <div className="input-group-append">*/}
                                            {/*         <button id="button-addon2" type="submit" className="btn btn-link"><SendIcon/></button>*/}
                                            {/*      </div>*/}
                                            {/*    </div>*/}
                                            {/*</form>*/}
                                        </div>}

                                </div>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

export default Message;