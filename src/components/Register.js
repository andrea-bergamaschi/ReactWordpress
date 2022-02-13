import React, { createRef, useContext, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Context } from '../containers/Context';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {

    const websiteUrl = 'https://reactwordpress.000webhostapp.com';
    let navigate = useNavigate();

    const usernameInput = createRef();
    const emailInput = createRef();
    const passwordInput = createRef();
    const firstNameInput = createRef();
    const lastNameInput = createRef();
    const websiteInput = createRef();

    const [, setContext] = useContext(Context);
    const [wrongCredentials, setWrongCredentials] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        let userToRegister = {
            user_login: usernameInput.current.value,
            email: emailInput.current.value,
            password: passwordInput.current.value,
            first_name: firstNameInput.current.value,
            last_name: lastNameInput.current.value,
            user_url: websiteInput.current.value,
        }

        axios.post(`${websiteUrl}/?rest_route=/simple-jwt-login/v1/users&email=${emailInput.current.value}&password=${passwordInput.current.value}`, userToRegister, {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
            .then(response => {
                if (response.data.success) {
                    setWrongCredentials(false);
                    setContext(prev => ({ ...prev, isLogged: true, loggedUser: response.data }));
                    navigate('/');
                } else {
                    setWrongCredentials(true);
                }
            })
            .catch(error => {
                setWrongCredentials(true);
            })
    }

    return (
        <Container className="mt-5">
            <Row className="mt-2 d-flex justify-content-center">
                <Col className="preview px-5 pb-5 pt-1" xs={12} sm={9} md={6} lg={5}>
                    <h1 className="fs-1 fw-light py-4 text-center">Register</h1>
                    {wrongCredentials
                        ? <Container className="alert alert-warning mt-3">
                            The data you inserted is not correct. Please check and submit again.
                        </Container>
                        : null
                    }
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" ref={usernameInput} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" ref={emailInput} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" autoComplete="false" ref={passwordInput} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" placeholder="Enter first name" ref={firstNameInput} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" placeholder="Enter last name" ref={lastNameInput} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Website</Form.Label>
                            <Form.Control type="text" placeholder="Enter website" ref={websiteInput} />
                        </Form.Group>

                        <Form.Group className="d-flex justify-content-between">
                            <Button variant="dark" className="fw-bold px-5 text-uppercase" type="submit">
                                Register
                            </Button>
                            <Form.Text>
                                <Link to="/login" className="text-secondary">Login</Link>
                            </Form.Text>
                        </Form.Group>

                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
