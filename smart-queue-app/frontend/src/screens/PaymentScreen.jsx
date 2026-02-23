import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PaymentScreen = () => {
    const navigate = useNavigate();

    // 1. Check if they skipped the shipping screen somehow
    useEffect(() => {
        const shippingAddress = localStorage.getItem('shippingAddress');
        if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [navigate]);

    // 2. Set default payment method
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = (e) => {
        e.preventDefault();

        // 3. Save payment method to Local Storage
        localStorage.setItem('paymentMethod', paymentMethod);

        // 4. Move to the final review screen
        navigate('/placeorder');
    };

    return (
        <div className="justify-content-md-center row">
            <div className="col-12 col-md-6">
                <h1>Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as='legend'>Select Method</Form.Label>
                        <Col>
                            {/* Option 1: PayPal / Credit Card */}
                            <Form.Check
                                type='radio'
                                className='my-2'
                                label='PayPal or Credit Card'
                                id='PayPal'
                                name='paymentMethod'
                                value='PayPal'
                                checked={paymentMethod === 'PayPal'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></Form.Check>

                            {/* Option 2: Pay at Store (Great for BOPIS!) */}
                            <Form.Check
                                type='radio'
                                className='my-2'
                                label='Pay at Store (Pickup)'
                                id='PayAtStore'
                                name='paymentMethod'
                                value='Pay at Store'
                                checked={paymentMethod === 'Pay at Store'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></Form.Check>
                        </Col>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='mt-3'>
                        Continue
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default PaymentScreen;