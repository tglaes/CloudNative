import React from "react";
import "./message.css";
import {Formik} from "formik";
import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import {Form, ListGroup} from "react-bootstrap";
import {withRouter} from 'react-router-dom'
import {Link} from "react-router-dom";
import {sendMessage} from "./util/notifications";
import * as yup from "yup";

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            user: localStorage.getItem('user'),
            messages: [],
            showMessage: false,
            currentBody: '',
            showNewTemplate: true,
            recipientEmail: '',
            senderEmail: '',
            time: '',
        }
        this.getMessage();
    }

    /**
     * Lifecycle Methode: wird ausgeführt nachdem die Komponente in das DOM gerendert wurde
     */
    componentDidMount() {
        this.getMessage();
    }

    /**
     * Methode, die die empfangenen Nachrichten eines Users erhält
     */
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
                })
            ).catch((error) => {
            console.log(error);
        });
    }

    /**
     * Methode, die die Items einer Nachricht den State-Variaben zuordnet
     */
    showMessageItem(item) {
        this.setState({
            showNewTemplate: false,
            showMessage: true,
            body: item.body,
            recipientEmail: item.recipientEmail,
            senderEmail: item.senderEmail,
            time: item.messageTime,
        })
    }

    /**
     * Methode, die den User ausloggt
     */
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
            }).catch((error) => {
            console.log(error);
        });
    }

    /**
     * Methode, die ein leeres Mail-Template anzeigt
     */
    addEmptyTemplate = () => {
        this.setState({
            showNewTemplate: true,
            showMessage: false,
            body: "",
            senderEmail: "",
        })
    }

    render() {
        const schema = yup.object({
            message: yup.string().required("Bitte eine Nachricht eingeben"),
            senderEmail: yup.string().email().required("Bitte Empfänger eingeben"),
        })
        return (
            <Formik
                validationSchema={schema}

                onSubmit={(values, actions) => {
                    const data = {
                        recipientEmail: this.state.senderEmail === "" ? values.senderEmail : this.state.senderEmail,
                        body: values.message,
                        token: this.state.token,
                    };

                    const requestOptions = {
                        method: 'POST',
                        headers: {'Content-Type': 'text/plain'},
                        body: JSON.stringify(data)
                    };
                    //POST-Request zum Senden von Nachrchten
                    fetch('http://localhost:8300/gateway/sendMessage', requestOptions)
                        .then(response => {
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
                    <Form className="message" noValidate onSubmit={handleSubmit}>
                        <div className="div-size row rounded-lg overflow-hidden shadow">
                            <div className="col-5 px-0">
                                <div className="bg-white">
                                    <div className="bg-gray px-4 py-2 bg-light">
                                        <div className="row">
                                            <div className="col-3">
                                                <div className="h6 mb-0 py-1">
                                                    <AccountCircleIcon fontSize="middle"/>{this.state.user}
                                                </div>
                                            </div>
                                            <div className="col-5 mt-1" onClick={this.addEmptyTemplate}>
                                                <Link to="#"><AddIcon/>Neue Nachricht</Link></div>
                                            <div className="col-4 mt-1">
                                                <Link to={'/'}
                                                      onClick={this.logout}><PowerSettingsNewIcon/>Ausloggen</Link>
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
                                <div className="div-size bg-white col-7 px-0">
                                    <div className="chat-box bg-white">

                                        <Form.Group className="form-group-size" controlId="senderEmail">
                                            <Form.Control
                                                className="height-form form-control border-0 bg-light"
                                                type="text"
                                                aria-describedby="button-addon2"
                                                placeholder="Empfänger"
                                                value={values.senderEmail}
                                                onChange={handleChange}
                                                isInvalid={!!errors.senderEmail && touched.senderEmail}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.senderEmail}
                                            </Form.Control.Feedback>

                                        </Form.Group>

                                    </div>

                                    <div className="row sendMessage">
                                        <div className="col-11 bg-light message-form">
                                            <Form.Group controlId="message" className="margintop">
                                                <Form.Control
                                                    className="form-control border-0 bg-light"
                                                    type="text"
                                                    aria-describedby="button-addon2"
                                                    placeholder="Nachricht schreiben ..."
                                                    value={values.message} onChange={handleChange}
                                                    isInvalid={!!errors.message && touched.message}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.message}
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                        </div>
                                        <div className="col-1 bg-light icon">
                                            <button id="button-addon2" type="submit"
                                                    className="btn btn-link bg-light"><SendIcon/></button>
                                        </div>
                                    </div>
                                </div> : <div className="div-size bg-white col-7 px-0">
                                    <div className="chat-box bg-white">

                                        <Form.Group className="form-group-size" controlId="senderEmail">
                                            <Form.Control
                                                className="height-form form-control border-0 bg-light"
                                                type="text"
                                                aria-describedby="button-addon2"
                                                placeholder="Empfänger"
                                                value={this.state.senderEmail}
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
                                            </div>
                                        : <div></div>}

                                    </div>

                                    <div className="row sendMessage">
                                        <div className="col-11 bg-light message-form">
                                            <Form.Group controlId="message" className="margintop">
                                                <Form.Control
                                                    className="form-control border-0 bg-light"
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
                                        <div className="col-1 bg-light icon">
                                            <button id="button-addon2" type="submit"
                                                    className="btn btn-link bg-light"><SendIcon/></button>
                                        </div>
                                    </div>
                                </div>}

                        </div>

                    </Form>
                )}
            </Formik>
        );
    }
}

export default withRouter(Message);