import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./ui/ui/button";
import Loader from "./Loader";

interface Product {
  _id: string;
  name: string;
  imageurl: string;
  price: string;
  type: string;
}

interface CartItem {
  _id: string;
  name: string;
  imageurl: string;
  type: string;
  size: string;
  price: string;
  quantity: number;
}

const SingleProduct: React.FC = () => {
  const [canProducts, setCanProducts] = useState<Product[]>([]);
  const [cookieProducts, setCookieProduct] = useState<Product[]>([]);
  const [activeSection, setActiveSection] = useState<"can" | "cookie">("can");
  const [loading, setLoading] = useState(true);
  const [sizeClicked, setSizeClicked] = useState<{ [key: string]: string }>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Fetch products on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Load cart from sessionStorage on component mount
  useEffect(() => {
    const savedCart = sessionStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to sessionStorage whenever cartItems changes
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const fetchData = async () => {
    try {
      const canResponse = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/api/products/can");
      const cookieResponse = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/api/products/cookie");
      setCanProducts(canResponse.data);
      setCookieProduct(cookieResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSizeClicked = (productId: string, size: string) => {
    setSizeClicked((prevState) => ({
      ...prevState,
      [productId]: size,
    }));
  };

  const addToCart = (product: Product) => {
    const size = sizeClicked[product._id] || "250ml";
    const existingCartItem = cartItems.find((item) => item._id === product._id && item.size === size);

    if (existingCartItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          _id: product._id,
          name: product.name,
          size: size,
          type: activeSection ? 'can' : "cookie",
          imageurl: product.imageurl,
          price: product.price,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (product: Product) => {
    const size = sizeClicked[product._id] || "250ml";
    const existingCartItem = cartItems.find((item) => item._id === product._id && item.size === size);

    if (existingCartItem && existingCartItem.quantity > 1) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setCartItems(cartItems.filter((item) => item._id !== product._id || item.size !== size));
    }
  };

  const displayedProducts = activeSection === "can" ? canProducts : cookieProducts;

  return loading ? (
    <Loader />
  ) : (
    <div className="bg-[#23e299]">
      <h1 className="text-3xl text-black text-left p-4 py-8 font-extrabold">Our Flavors</h1>
      {/* Section Toggle Buttons */}
      <div className="flex justify-start p-4">
  <Button
    className={`mx-2 px-6 py-2 rounded-lg transition-all duration-300 ${
      activeSection === "can"
        ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md"
    }`}
    onClick={() => setActiveSection("can")}
  >
    Drinks
  </Button>
  <Button
    className={`mx-2 px-6 py-2 rounded-lg transition-all duration-300 ${
      activeSection === "cookie"
        ? "bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md"
    }`}
    onClick={() => setActiveSection("cookie")}
  >
    Cookies
  </Button>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {displayedProducts.map((product) => (
          <div className="mb-10 mr-2 cursor-pointer border-4 border-black bg-[#a06fff] p-5 rounded-2xl" key={product._id}>
            <div className="w-full h-64 overflow-hidden">
              <img className="w-full h-full object-cover" src={product.imageurl} alt={product.name} />
            </div>
            <div className="text-xl font-bold text-center px-3">{product.name}</div>
            <span className="px-3">From Rs.{product.price}</span>
            <div className="p-3 flex justify-center hidden sm:hidden md:hidden lg:block xl:block">
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
            <div className="flex justify-evenly mt-4 ">
              <Button onClick={() => addToCart(product)}>Add</Button>
              <Button variant="destructive" onClick={() => removeFromCart(product)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleProduct;
