import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./ui/ui/button";
import Loader from "./Loader";

interface Product {
  _id: string;
  name: string;
  imageurl: string;
  price: string;
}

interface CartItem{
  _id: string;
  name: string;
  imageurl: string;
  size: string;
  price: string;
  quantity: number;
}
const SingleProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sizeClicked, setSizeClicked] = useState<{ [key: string]: string }>({}); // Store selected size per product
  // console.log(sizeClicked)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/api/products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Handle size click for each product
  const handleSizeClicked = (productId: string, size: string) => {
    setSizeClicked((prevState) => ({
      ...prevState,
      [productId]: size, // Update only the size for the clicked product
    }));
  };

  const addToCart = (product: Product) => {
    const size = sizeClicked[product._id] || "250ml";
    const existingcartItem = cartItems.find((item) => item._id === product._id && item.size === size);

    if(existingcartItem){
      setCartItems(
        cartItems.map((item) => 
        item._id === product._id && item.size === size 
        ? {...item, quantity: item.quantity + 1} : item
      )
      );
    } else {
      // add new item to cart instead
      setCartItems([
        ...cartItems,
        {
          _id: product._id,
          name: product.name,
          size: size,
          imageurl: product.imageurl,
          price: product.price,
          quantity: 1
        }
      ])
    }
  }

  const removeFromCart = (product: Product) => {
    const size = sizeClicked[product._id] || "250ml";

    const existingcartItem = cartItems.find(
      (item) => item._id === product._id && item.size == size
    );

    if(existingcartItem && existingcartItem.quantity > 1){
      // Reduce quantity if more than 1
      setCartItems(
        cartItems.map((item) => 
          item._id === product._id && item.size === size ?
            { ...item, quantity: item.quantity - 1} :
            item
        
        )
      )
    } else {
      // Remove the item if quantity is 1 or less
      setCartItems(
        cartItems.filter((item) => item._id !== product._id || item.size !== size)
      );
    }
  }

  useEffect(()=> {
    saveCartToLocalStorage();
  }, [cartItems])

  // saving cart to local storage
  const saveCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }
  console.log(saveCartToLocalStorage)

  return loading === true ? (
    <Loader />
  ) : (
    <div>
      <h1 className="text-3xl text-black text-left p-4 py-8 font-extrabold">
        Our flavors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 p-4">
        {products.map((product) => (
          <div
            className="mb-10 cursor-pointer border-4 border-black p-5"
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
              <Button
                className={`rounded-full ml-4 px-3 py-2 border-2 border-black ${
                  sizeClicked[product._id] === "250ml" ? "text-black bg-white" : ""
                }`}
                onClick={() => handleSizeClicked(product._id, "250ml")}
              >
                1 x 250ml
              </Button>
              <Button
                className={`rounded-full ml-4 border-2 border-black px-3 py-1 ${
                  sizeClicked[product._id] === "500ml" ? "bg-white text-black" : ""
                }`}
                onClick={() => handleSizeClicked(product._id, "500ml")}
              >
                1 x 500ml
              </Button>
            </div>
            <div className="flex justify-evenly mt-4">
              <Button onClick={()=> addToCart(product)}>Add</Button>
              <Button variant="destructive" onClick={()=> removeFromCart(product)}>Remove</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
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

