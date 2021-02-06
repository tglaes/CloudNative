import React from "react";
import "./index.css"
import {Button, Form} from "react-bootstrap";
import {Formik} from "formik";
import {register} from "./requests";
import axios from "axios";

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        // // Simple POST request with a JSON body using fetch
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'text/plain' },
        //     body: JSON.stringify({ title: 'React POST Request Example' })
        // };
        // fetch('http://localhost:8300/gateway/registration', requestOptions)
        //     .then(console.log("test"));
    }

    render() {
        return (
            <div className="Register">
                <Formik
                onSubmit={(values, actions) => {
                    const data = {
                        email: values.email,
                        password: values.password,
                        country: values.country,
                    };

                    console.log(data);

                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'text/plain' },
                        body: JSON.stringify({ email: values.email,
                            password: values.password,
                            country: values.country })
                    };
                    fetch('http://localhost:8300/gateway/registration', requestOptions)
                        .then(response => {
                                console.log(response.data);
                            }).catch((error) => {
                                console.log(error);
                            });
                }}
                initialValues={{
                    email: "",
                    password: "",
                    country: "",
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
                                    autoFocus
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
                            <Form.Group size="lg" controlId="country">
                                <Form.Label>Land</Form.Label>
                                <Form.Control
                                    className="input-size"
                                    type="country"
                                    value={values.country} onChange={handleChange}
                                />
                            </Form.Group>
                            <Button className="input-size" block size="lg" type="submit" style={{marginBottom: "15px"}}>
                                Registrieren
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

export default Register;