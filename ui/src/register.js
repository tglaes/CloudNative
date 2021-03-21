import React from "react";
import "./index.css"
import {Button, Form} from "react-bootstrap";
import {Formik} from "formik";
import {registrationSuccess} from "./util/notifications";
import * as yup from 'yup';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const schema = yup.object({
            email: yup.string().email().required("Bitte E-Mail-Adresse eingeben"),
            password: yup.string().required("Bitte Passwort eingeben"),
            country: yup.string().required("Bitte Land eingeben"),
        })
        return (
            <div className="Register">
                <Formik
                    validationSchema={schema}
                    onSubmit={(values, actions) => {

                        const requestOptions = {
                            method: 'POST',
                            headers: {'Content-Type': 'text/plain'},
                            body: JSON.stringify({
                                email: values.email,
                                password: values.password,
                                country: values.country
                            })
                        };
                        //POST-Request zum Registrieren eines Users
                        fetch('http://localhost:8300/gateway/registration', requestOptions)
                            .then(response => {
                                registrationSuccess();
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
                          errors,
                          touched,
                      }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group size="lg" controlId="email">
                                <Form.Label className="form-size">Email</Form.Label>
                                <Form.Control
                                    className="input-size"
                                    autoFocus
                                    type="email"
                                    value={values.email} onChange={handleChange}
                                    isInvalid={!!errors.email && touched.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group size="lg" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    className="input-size"
                                    type="password"
                                    value={values.password} onChange={handleChange}
                                    isInvalid={!!errors.password && touched.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group size="lg" controlId="country">
                                <Form.Label>Land</Form.Label>
                                <Form.Control
                                    className="input-size"
                                    type="country"
                                    value={values.country} onChange={handleChange}
                                    isInvalid={!!errors.country && touched.country}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.country}
                                </Form.Control.Feedback>
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