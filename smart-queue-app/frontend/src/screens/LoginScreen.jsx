import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    // If the user was trying to go somewhere else (like checkout), remember where it was
    const redirect = location.search ? location.search.split('=')[1] : '/';

    // Check if user is already logged in when the page loads
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault(); // Prevent page refresh
        try {
            // 1. Send email and password to our backend
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post(
                '/api/users/login',
                { email, password },
                config
            );

            // 2. If successful, save the "Wristband" (User Info & Token) to Local Storage
            localStorage.setItem('userInfo', JSON.stringify(data));

            // 3. Send the user to the home page (or checkout)
            navigate(redirect);

        } catch (err) {
            // If password is wrong, show an error
            setError(err.response && err.response.data.message
                ? err.response.data.message
                : err.message);
        }
    };

    return (
        <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
                <h1>Sign In</h1>

                {/* Show error message in red if login fails */}
                {error && <div className="alert alert-danger">{error}</div>}

                <Form onSubmit={submitHandler}>
                    <Form.Group className="my-2" controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary" className="mt-3">
                        Sign In
                    </Button>
                </Form>

                <Row className="py-3">
                    <Col>
                        New Customer?{' '}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                            Register Here
                        </Link>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default LoginScreen;