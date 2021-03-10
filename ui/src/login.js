import React from "react";
import "./index.css"
import {Button, Form} from "react-bootstrap";
import {Formik} from "formik";
import {withRouter} from 'react-router-dom';
import * as yup from "yup";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
        }
    }

    render() {
        const schema = yup.object({
            emailLogin: yup.string().email().required("Bitte E-Mail-Adresse eingeben"),
            passwordLogin: yup.string().required("Bitte Passwort eingeben"),
        })
        return (
            <div>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values, actions) => {

                        let that = this;
                        const requestOptions = {
                            method: 'POST',
                            headers: {'Content-Type': 'text/plain'},
                            body: JSON.stringify({
                                email: values.emailLogin,
                                password: values.passwordLogin,
                            })
                        };
                        fetch('http://localhost:8300/gateway/login', requestOptions)
                            .then(response => response.json().then((text) => {
                                localStorage.setItem('token', text.message);
                                localStorage.setItem('user', values.emailLogin);
                                that.props.history.push('/message')
                                })
                            )
                            .catch((error) => {
                                console.log(error);
                            });
                    }}
                    initialValues={{
                        emailLogin: "",
                        passwordLogin: "",
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
                            <Form.Group size="lg" controlId="emailLogin">
                                <Form.Label className="form-size">Email</Form.Label>
                                <Form.Control
                                    className="input-size"
                                    type="email"
                                    value={values.emailLogin} onChange={handleChange}
                                    isInvalid={!!errors.emailLogin && touched.emailLogin}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.emailLogin}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group size="lg" controlId="passwordLogin">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    className="input-size"
                                    type="password"
                                    value={values.passwordLogin} onChange={handleChange}
                                    isInvalid={!!errors.passwordLogin && touched.passwordLogin}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.passwordLogin}
                                </Form.Control.Feedback>
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