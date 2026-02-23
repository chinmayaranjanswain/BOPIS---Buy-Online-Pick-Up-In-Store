import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ShippingScreen = () => {
    // 1. Check if we already have an address saved in Local Storage
    const savedAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {};

    // 2. Set up state for the form fields
    const [address, setAddress] = useState(savedAddress.address || '');
    const [city, setCity] = useState(savedAddress.city || '');
    const [postalCode, setPostalCode] = useState(savedAddress.postalCode || '');
    const [country, setCountry] = useState(savedAddress.country || '');

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        // 3. Save the entered data to Local Storage
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({ address, city, postalCode, country })
        );

        // 4. Move to the next checkout step (Payment)
        navigate('/payment');
    };

    return (
        <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
                <h1>Shipping / Pickup Details</h1>
                <Form onSubmit={submitHandler}>

                    <Form.Group className="my-2" controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter address"
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter city"
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter postal code"
                            value={postalCode}
                            required
                            onChange={(e) => setPostalCode(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter country"
                            value={country}
                            required
                            onChange={(e) => setCountry(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary" className="mt-3">
                        Continue to Payment
                    </Button>
                </Form>
            </Col>
        </Row>
    );
};

export default ShippingScreen;