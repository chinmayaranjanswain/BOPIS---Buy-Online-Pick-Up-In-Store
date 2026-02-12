import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios'; // The tool used to talk to the backend

function App() {
  const [products, setProducts] = useState([]); // A box to hold our products

  useEffect(() => {
    // This function runs when the app loads
    const fetchProducts = async () => {
      // Go to the backend and ask for products
      const { data } = await axios.get('/api/products');
      setProducts(data); // Put the data in the box
    };

    fetchProducts();
  }, []);

  return (
    <Container className="py-5">
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded">
              <Card.Img src={product.image} variant="top" />
              <Card.Body>
                <Card.Title as="div">
                  <strong>{product.name}</strong>
                </Card.Title>
                <Card.Text as="h3">₹{product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;