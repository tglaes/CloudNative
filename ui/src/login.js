import React from "react";
import "./index.css"
import {Button, Form} from "react-bootstrap";
import {login} from "./requests";
import {Formik} from "formik";

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
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
                        window.location = "/message";

                        // login(data).then(response => {
                        //         this.props.history.push({
                        //                             pathname: 'message',
                        //                             state: {token: response.data.token}
                        //                         })
                        //     console.log(response.data);
                        // }).catch((error) => {
                        //     console.log(error);
                        // })
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

export default Login;