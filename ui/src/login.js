import React from "react";
import "./index.css"
import {Button, Form} from "react-bootstrap";
import {Formik} from "formik";
import {withRouter} from 'react-router-dom';

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            token: '',
        }

    }

    render(){

        return (
            <div>
                <Formik
                    onSubmit={(values, actions) => {
                        const data = {
                            email: values.email,
                            password: values.password,
                        };

                        console.log(data);

                        let that = this;
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'text/plain' },
                            body: JSON.stringify({ email: values.email,
                                password: values.password,
                                 })
                        };
                        fetch('http://localhost:8300/gateway/login', requestOptions)
                            .then(response =>  response.json().then((text) =>{
                                    that.setState({ token: text.message });
                                   that.props.history.push({
                                       pathname: '/message',
                                       state: { token: text.message }
                                   })
                            })
                            )
                            .catch((error) => {
                            console.log(error);
                        });
                    }}
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                >
                    {({
                          handleSubmit,
                          handleChange,
                          values,
                      }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group size="lg" controlId="email">
                                <Form.Label className="form-size">Email</Form.Label>
                                <Form.Control
                                    className="input-size"
                                    type="email"
                                    value={values.email} onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    className="input-size"
                                    type="password"
                                    value={values.password} onChange={handleChange}
                                />
                            </Form.Group>
                            <Button block className="input-size" size="lg" type="submit" style={{marginBottom: "15px"}}>
                                Einloggen
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }

};

export default withRouter(Login);