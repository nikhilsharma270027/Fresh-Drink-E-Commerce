import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/ui/button";
import Loader from "./Loader";

interface Product {
  _id: string;
  name: string;
  imageurl: string;
  price: string;
}

const SingleProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false)
    }
  };

  // const handleProductClick = (productId: string) => {
  //   navigate(`/product/${productId}`);
  // };

  return (
    loading ? (<Loader />) : (
    <div className="border-2 border-black">
      <h1 className="text-3xl text-black text-left p-4 py-8 font-extrabold">
        Our flavors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <div
            className="mb-10 cursor-pointer"
            key={product._id}
          >
            <div className="w-full h-64 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={product.imageurl}
                alt={product.name}
              />
            </div>
            
            <div className="text-xl font-bold text-center px-3">
              {product.name}
            </div>
            <span className="px-3">From Rs.{product.price}</span>
            <div className="p-3 flex justify-center">
                <Button className="rounded-full ml-4 px-3 py-2">
                  1 x 250ml
                </Button>
                <button className="rounded-full ml-4 border-2 border-black px-3 py-1">
                  1 x 500ml
                </button>
              </div>
            <div className="flex justify-evenly mt-4">
            <Button>Add</Button>
            <Button variant="destructive">Remove</Button>
              </div>
          </div>
        ))}
      </div>
    </div>
  )
  );
};

export default SingleProduct;
// import React from 'react';
// import Footer from './Footer';

// const ProductDetail: React.FC = () => {
//   return (
//     <>
//     <div className="container">
//       <div className="left-section">
//         <h1>Product Title</h1>
//         <p>Product description...</p>
//         <ul>
//           <li>Feature 1</li>
//           <li>Feature 2</li>
//           <li>Feature 3</li>
//         </ul>
//         <p>Price: $99.99</p>
//         <button>Add to Cart</button>
//       </div>
//       <div className="right-section">
//         <div className="image-container">
//           <img src="can.png" alt="Product Image 1" />
//           <img src="can.png" alt="Product Image 2" />
//         </div>
//       </div>
//     </div>
// <Footer />
//     </>
//   );
// };

// export default ProductDetail;
