import React from "react";
import "./index.css"
import {Button, Form} from "react-bootstrap";
import {login, register} from "./requests";
import {Formik} from "formik";

const Login = () => {
    return (
        <div>
            <Formik
                onSubmit={(values, actions) => {
                    const data = {
                        email: values.email,
                        password: values.password,
                    };

                    console.log(data);
                    login(data).then(response => {
                        console.log(response.data);
                    }).catch((error) => {
                        console.log(error);
                    })
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
};

export default Login;