import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();

    // 1. Get all the saved data from Local Storage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {};
    const paymentMethod = localStorage.getItem('paymentMethod') || '';

    // 2. Security Check: If they skipped steps, send them back
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        } else if (!paymentMethod) {
            navigate('/payment');
        }
    }, [shippingAddress, paymentMethod, navigate]);

    // 3. Calculate Prices (Math Helper)
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const itemsPrice = addDecimals(
        cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    // Free pickup/shipping if over ₹500, else ₹50 fee
    const shippingPrice = addDecimals(itemsPrice > 500 ? 0 : 50);

    // 15% Tax
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));

    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2);

    // 4. Submit Function (Just a placeholder for now)
    const placeOrderHandler = () => {
        console.log('Order Placed! (Backend connection coming soon)');
        alert('Order Ready to be sent to Database!');
    };

    return (
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping / Pickup</h2>
                        <p>
                            <strong>Address: </strong>
                            {shippingAddress.address}, {shippingAddress.city}{' '}
                            {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method: </strong>
                        {paymentMethod}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                            <ListGroup variant='flush'>
                                {cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>₹{itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>₹{shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>₹{taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>₹{totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block w-100'
                                disabled={cartItems === 0}
                                onClick={placeOrderHandler}
                            >
                                Place Order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default PlaceOrderScreen;