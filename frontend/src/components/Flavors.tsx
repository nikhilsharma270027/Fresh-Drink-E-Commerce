import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  imageurl: string;
  price: string;
}

const Flavors = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/api/products");
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
            <div className="relative inline-block">
              <img
                className="w-full h-full cursor-pointer"
                src={product.imageurl}
                alt={product.name}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 absolute bottom-1 right-1 m-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>

            {/* <div className="text-xl font-bold text-center">Fresh Kombucha</div> */}
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

export default Flavors;
