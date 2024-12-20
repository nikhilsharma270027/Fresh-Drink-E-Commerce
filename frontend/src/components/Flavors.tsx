import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
interface Product {
  _id: string;
  name: string;
  imageurl: string;
  price: string;
}

const Flavors = () => {
  // const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  // Fetching products of type "can"
  const { data: canProducts = [] } = useQuery({
    queryKey: ["canProducts"],
    queryFn: async () => {
      const { data } = await axios.get(
        import.meta.env.VITE_SERVER_DOMAIN + "/api/products/can"
      );
      return data.slice(0, 2); // Return only the first 2 products
    },
    staleTime: 20000,
  });

  // Fetching products of type "cookie"
  const { data: cookieProducts = [] } = useQuery({
    queryKey: ["cookieProducts"],
    queryFn: async () => {
      const { data } = await axios.get(
        import.meta.env.VITE_SERVER_DOMAIN + "/api/products/cookie"
      );
      return data.slice(0, 2); // Return only the first 2 products
    },
    staleTime: 20000,
  });

  // Combine the products
  const combinedProducts = [...canProducts, ...cookieProducts];

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="border-2 border-black">
      <h1 className="text-3xl text-black text-left p-4 py-8 font-extrabold">
        Our flavors
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {combinedProducts.map((product: Product) => (
          <div
            className="mb-10"
            key={product._id}
            onClick={() => handleProductClick(product._id)}
          >
            <div className="relative inline-block">
              <img
                className="w-[20rem] lg:w-full lg:h-full cursor-pointer "
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
