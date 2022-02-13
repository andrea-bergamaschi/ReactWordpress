import React, { createRef, useContext, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Context } from '../containers/Context';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

    const websiteUrl = 'https://reactwordpress.000webhostapp.com';
    let navigate = useNavigate();

    const usernameInput = createRef();
    const passwordInput = createRef();

    const [,setContext] = useContext(Context);
    const [wrongCredentials, setWrongCredentials] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        let userToCheck = {
            username: usernameInput.current.value,
            password: passwordInput.current.value
        }

        axios.post(`${websiteUrl}/?rest_route=/simple-jwt-login/v1/auth`, userToCheck, { headers: { 'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(response => {
                if(response.data.success) {
                    setWrongCredentials(false);
                    axios.get(`${websiteUrl}/?rest_route=/simple-jwt-login/v1/auth/validate&JWT=${response.data.data.jwt}`)
                    .then (res => {
                        setContext(prev => ({...prev, isLogged: true, loggedUser: res.data.data }));
                        navigate('/');
                    })
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
                    <h1 className="fs-1 fw-light py-4 text-center">Login</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" ref={usernameInput} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" autoComplete="false" ref={passwordInput} />
                        </Form.Group>

                        <Form.Group className="d-flex justify-content-between">
                            <Button className="btn btn-primary fw-bold px-5 text-uppercase" type="submit">
                                Login
                            </Button>
                            <Form.Text>
                                <Link to="/register" className="text-secondary">Register</Link>
                            </Form.Text>
                        </Form.Group>

                    </Form>
                    {wrongCredentials
                        ? <Container className="alert alert-warning mt-3">
                            The credentials are not correct. Please check your email and password.
                        </Container>
                        : null
                    }
                </Col>
            </Row>
        </Container>
    )
}
