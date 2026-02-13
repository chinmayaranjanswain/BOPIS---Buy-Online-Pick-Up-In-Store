import React from 'react';
import { useParams } from 'react-router-dom';

const ProductScreen = () => {
    const { id } = useParams(); // Get the ID from the URL (e.g., /product/123)

    return (
        <div>
            <h1>Product Details</h1>
            <p>You are looking at product ID: {id}</p>
        </div>
    );
};

export default ProductScreen;