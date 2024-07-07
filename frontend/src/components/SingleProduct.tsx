import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  imageurl: string;
  price: string;
}

const SingleProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="border-2 border-black">
      <h1 className="text-3xl text-black text-left p-4 py-8 font-extrabold">
        Our flavors
      </h1>
      <div className="flex justify-center">
        {products.map((product) => (
          <div
            className="mb-10"
            key={product._id}
            onClick={() => handleProductClick(product._id)}
          >
            <img src={product.imageurl} alt={product.name} />
            <div className="text-xl font-bold text-center">Fresh Kombucha</div>
            <div className="text-xl font-bold text-center px-3">
              {product.name}
            </div>
            <span className=" px-3">From Rs.{product.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleProduct;
