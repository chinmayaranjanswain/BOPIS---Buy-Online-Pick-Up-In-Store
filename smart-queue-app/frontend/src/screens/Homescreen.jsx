import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // <--- 1. Import Link
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded">
              {/* 2. Wrap Image in Link */}
              <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top" />
              </Link>

              <Card.Body>
                {/* 3. Wrap Title in Link */}
                <Link to={`/product/${product._id}`}>
                  <Card.Title as="div">
                    <strong>{product.name}</strong>
                  </Card.Title>
                </Link>

                <Card.Text as="h3">₹{product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;