import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Detail Page</h1>
      <p>Product ID: {product._id}</p>
      <p>Name: {product.name}</p>
      <p>Price: Rs.{product.price}</p>
      <img src={product.imageurl} alt={product.name} />
      {/* Add more details here based on your product schema */}
    </div>
  );
};

export default ProductDetail;
