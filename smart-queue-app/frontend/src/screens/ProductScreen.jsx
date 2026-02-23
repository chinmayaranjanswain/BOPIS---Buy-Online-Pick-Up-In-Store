import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ProductScreen = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1); // <--- Add this line (Default is 1)
    const navigate = useNavigate();

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            // 3. Ask the backend for THIS specific product
            const { data } = await axios.get(`/api/products/${id}`);
            setProduct(data);
        };
        fetchProduct();
    }, [id]);

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>

            <Row>
                {/* Column 1: The Image */}
                <Col md={5}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>

                {/* Column 2: The Details */}
                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
                        <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                    </ListGroup>
                </Col>

                {/* Column 3: The Action Card */}
                <Col md={3}>
                    <Card>
                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        <Form.Control
                                            as='select'
                                            value={qty}
                                            onChange={(e) => setQty(Number(e.target.value))}
                                        >
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}

                        <ListGroup.Item>
                            <Button
                                onClick={addToCartHandler} // <--- THIS IS NEW
                                className="btn-block w-100"
                                type="button"
                                disabled={product.countInStock === 0}
                            >
                                Add To Cart

                            </Button>
                        </ListGroup.Item>
                    </Card>
                </Col>
            </Row >
        </>
    );
};

export default ProductScreen;