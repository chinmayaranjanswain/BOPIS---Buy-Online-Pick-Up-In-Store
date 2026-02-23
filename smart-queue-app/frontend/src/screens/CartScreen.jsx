import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

const CartScreen = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    // 1. Initialize State from Local Storage (The Browser's Pocket)
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // 2. Fetch & Add Product (Only if ID exists)
    useEffect(() => {
        if (id) {
            const addToCart = async () => {
                // Check if item is already in cart to avoid duplicates
                const existItem = cartItems.find((x) => x.product === id);

                if (existItem) {
                    // If it exists, just update it (don't fetch again)
                    return;
                }

                const { data } = await axios.get(`/api/products/${id}`);

                const newItem = {
                    product: data._id,
                    name: data.name,
                    image: data.image,
                    price: data.price,
                    countInStock: data.countInStock,
                    qty,
                };

                // Add new item to the existing list
                const updatedCart = [...cartItems, newItem];
                setCartItems(updatedCart);

                // Save to Local Storage immediately
                localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            };

            addToCart();
        }
    }, [id, qty]); // Dependencies

    // 3. Remove Handler
    const removeFromCartHandler = (id) => {
        // Filter out the item we want to remove
        const updatedCart = cartItems.filter((x) => x.product !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    // 4. Update Qty Handler
    const updateQtyHandler = (id, newQty) => {
        const updatedCart = cartItems.map((item) =>
            item.product === id ? { ...item, qty: newQty } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <p>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </p>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>₹{item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as='select'
                                            value={item.qty}
                                            // Update Qty when changed
                                            onChange={(e) => updateQtyHandler(item.product, Number(e.target.value))}
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                items
                            </h2>
                            ₹
                            {cartItems
                                .reduce((acc, item) => acc + item.qty * item.price, 0)
                                .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={() => navigate('/shipping')}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default CartScreen;