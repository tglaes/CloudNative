import React from "react";
import "./message.css";
import {Formik} from "formik";
import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import {Button, Form, ListGroup} from "react-bootstrap";
import {withRouter} from 'react-router-dom'
import {Link} from "react-router-dom";
import {sendMessage} from "./notifications";
import * as yup from "yup";

class Message extends React.Component {
    constructor(props) {
        super(props);
        const search = props.location.search;
        const params = new URLSearchParams(search);
        this.state = {
            token: localStorage.getItem('token'),
            user: localStorage.getItem('user'),
            // user: props.location.state.user,
            // token: props.location.state.sessionToken,
            // sendMessageRequest: props.location.state.sendMessage,
            messages: [],
            showMessage: false,
            currentBody: '',
            showNewTemplate: false,
            recipientEmail: '',
            senderEmail: '',
            time: '',
        }
    }

    componentDidMount() {
        console.log(this.state.token);
        this.getMessage();
    }

    getMessage() {
        let that = this;
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'text/plain'},
            body: JSON.stringify({token: this.state.token})
        };
        fetch('http://localhost:8300/gateway/getMessages', requestOptions)
            .then(response => response.json().then((text) => {
                    that.setState({messages: text.message})
                    console.log(this.state.messages);
                })
            ).catch((error) => {
            console.log(error);
        });
    }

    showMessageItem(item) {
        console.log(item);
        this.setState({
            showNewTemplate: false,
            showMessage: true,
            body: item.body,
            recipientEmail: item.recipientEmail,
            senderEmail: item.senderEmail,
            time: item.messageTime,
        })
    }

    logout = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'text/plain'},
            body: JSON.stringify({token: this.state.token})
        };
        fetch('http://localhost:8300/gateway/logout', requestOptions)
            .then(response => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                console.log(response);
            }).catch((error) => {
            console.log(error);
        });
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
        // const schema = yup.object({
        //     message: yup.string().email().required("Bitte eine Nachricht eingeben"),
        //     senderEmail: yup.string().email().required("Bitte Empfänger eingeben"),
        // })
        console.log(this.state.messages)
        // https://bootstrapious.com/p/bootstrap-chat
        return (
            <div className="Message">
                <Formik
                    onSubmit={(values, actions) => {
                        const data = {
                            recipientEmail: this.state.senderEmail === "" ? values.senderEmail : this.state.senderEmail,
                            body: values.message,
                            token: this.state.token,
                        };

                        console.log(data)

                        const requestOptions = {
                            method: 'POST',
                            headers: {'Content-Type': 'text/plain'},
                            body: JSON.stringify(data)
                        };
                        fetch('http://localhost:8300/gateway/sendMessage', requestOptions)
                            .then(response => {
                                console.log(response);
                                sendMessage();
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
                          errors,
                          touched,
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
                                                        <p className="h5 mb-0 py-1"><AccountCircleIcon
                                                            fontSize="large"/>{this.state.user}</p>
                                                    </div>
                                                    <div className="col-5 mt-1" onClick={this.addEmptyTemplate}>
                                                        <Link to="#"><AddIcon/>Neue Nachricht</Link></div>
                                                    <div className="col-3 mt-1">
                                                        <Link to={'/'}
                                                              onClick={this.logout}><PowerSettingsNewIcon/> Ausloggen</Link>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="messages-box">
                                                <div className="list-group rounded-0">
                                                    <ListGroup>
                                                        {this.state.messages.length !== 0 ? this.state.messages.map(item =>
                                                            <ListGroup.Item key={item.messageTime} onClick={(e =>
                                                                this.showMessageItem(item))
                                                            }> <PersonIcon fontSize="large"/>{item.senderEmail}
                                                            </ListGroup.Item>
                                                        ) : null}
                                                    </ListGroup>
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
                                                        isInvalid={!!errors.senderEmail && touched.senderEmail}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.senderEmail}
                                                    </Form.Control.Feedback>

                                                </Form.Group>

                                                {this.state.showMessage ?
                                                    <div className="media w-50 ml-auto mb-3">

                                                        <div className="media-body">
                                                            <div className="bg-primary rounded py-2 px-3 mb-2">
                                                                <p className="text-small mb-0 text-white">{this.state.body}</p>
                                                            </div>
                                                            <small
                                                                className="small font-weight-bold">{this.state.time}</small>
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
                                                            isInvalid={!!errors.message && touched.message}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.message}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                                <div className="col-1 ">
                                                        <div className="input-group-append">
                                                            <button id="button-addon2" type="submit"
                                                                    className="btn btn-link"><SendIcon/></button>
                                                        </div>
                                                </div>
                                            </div>
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

export default withRouter(Message);