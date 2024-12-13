/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/4wXaNrXUoZd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Libre_Franklin } from 'next/font/google'

libre_franklin({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card";
import { Separator } from "./separator";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { Input } from "./input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../common/firebase";
import Styles from '../../../styles/navbar.module.css'
interface CartItem {
  _id: string;
  name: string;
  size: string;
  imageurl: string;
  price: number;
  quantity: number;
}

export function Component() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errorM, setErrorM] = useState(false);
  // const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [authUser, setAuthUser] = useState({
    userName: "",
    email: "",
    uid: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser({
          userName: user.displayName || "", // Set displayName (username)
          email: user.email || "", // Set email
          uid: user.uid, // Set uid
        });
        // console.log(user);
      }
    });

    LoadCartFromSessionStorage();
    ch();
  }, []);
  useEffect(() => {
    calculateAmount();
  }, [cart, products]);
  useEffect(() => {
    // const fetchSession = async () => {
    //   try {
    //     const { data } = await axios.get('/api/session', { withCredentials: true });
    //     setUser(data.user);
    //     console.log(data.user)
    //   } catch (error: any) {
    //     console.error('User not logged in:', error.response.data.message);
    //   }
    // };
    // fetchSession();
  }, []);

  const ch = async () => {
    const storedCartItems = JSON.parse(sessionStorage.getItem("cart") || "");
    if (storedCartItems) {
      await axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + "/api/home", {
          storedCartItems,
        })
        .then((res) => {
          setProducts(res.data);
          // console.log(res.data);
        });
    }
  };

  const LoadCartFromSessionStorage = () => {
    const savedCart = sessionStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const calculateAmount = () => {
    const totalAmount = cart.reduce((acc, item) => {
      return acc + Number(item.price) * item.quantity;
    }, 0);
    setTotal(totalAmount);
  };

  const removeFromCart = (productId: string, psize: string) => {
    const updatedCart = cart.filter(
      (item) => item._id !== productId || item.size !== psize
    );
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart)); // Ensure cart is updated in sessionStorage
  };
  
  const handleInputChange = (event: any) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, " ");
    inputValue = inputValue.slice(0, 10);
    setPhone(inputValue);
  };

  const handleButtonClick = async () => {
    if (!phone) {
      setErrorM(true);
      return;
    }
    if (!address) {
      setErrorM(true);
      return;
    }
    if (authUser) {
      const totalAmount: any = total;
      // const totalAmount: number = 1000;
      const { data } = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/api/create-order",
        {
          totalAmount,
        }
      );
      console.log(data);
      try {
        var options = {
          // key: import.meta.env.KeyId,
          key: import.meta.env.VITE_KeyId,
          amount: totalAmount * 100, // Convert to paisa (smallest unit)
          currency: "INR",
          name: "Fresh Drink",
          description: "My Chip Payment",
          image: "",
          order_id: data.order_id, // Order ID from backend
          prefill: {
            name: authUser.userName,
            email: authUser.email,
            contact: phone,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
          handler: async function (response: any) {
            // Send payment response to the backend for verification
            console.log(response)
            // Destructure the necessary fields from the response
            const {
              // razorpay_order_id,
              razorpay_payment_id,
              // razorpay_signature,
            } = response;
            await axios.put(
              import.meta.env.VITE_SERVER_DOMAIN + "/api/verify-payment",
              {
                // razorpay_order_id,
                razorpay_payment_id,
                // razorpay_signature,
                amount: totalAmount,
                phone,
                address,
                email: authUser.email,
              }
            );
          },
        };
        
        var razorpayObject = new window.Razorpay(options);
        razorpayObject.open();
        // Only clear the cart and navigate after successful verification
        if (razorpayObject) {
          // Clear the cart after successful payment
          sessionStorage.removeItem("cart");
          sessionStorage.clear();

          // Redirect to home page
          navigate("/");
        }
      } catch (error) {
        console.error("Error creating order:", error);
      }
    } else {
      sessionStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="grid md:grid-cols-[1fr_300px] gap-8 max-w-6xl mx-auto px-4 md:px-6 py-4">
      <div className="grid gap-6">
        <div className="grid gap-4">
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Review the items in your cart and proceed to checkout.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-4 border rounded-lg overflow-hidden w-full">
            {/* //header */}
            <div className="grid grid-cols-[100px_1fr_100px] items-center gap-4 bg-secondry backdrop-blur-md dark:bg-gray-800 px-4 py-3">
              <span className="font-medium">Product</span>
              <span className="font-medium">Name</span>
              <span className="font-medium text-right">Price</span>
            </div>
            {/* // inside box */}

            {cart.length == 0 ? (
              <>
                <img
                  src="./emptycart.png"
                  alt="Product Image"
                  width={100}
                  height={100}
                  className="rounded-md object-cover w-full"
                  style={{ objectFit: "cover" }}
                />
                <div className="grid gap-1">
                  <h3 className="font-medium">Add items to cart</h3>
                </div>
              </>
            ) : (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-[100px_1fr_100px] items-center gap-4 px-4 py-3 border-t dark:border-gray-700"
                >
                  <img
                    src={item.imageurl}
                    alt="Product Image"
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                    style={{ aspectRatio: "100/100", objectFit: "cover" }}
                  />
                  <div className="grid gap-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {item.size} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <span className="font-medium">Rs. {item.price}</span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeFromCart(item._id, item.size)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="grid gap-4 mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium">Rs. {total.toLocaleString('en-IN')}</span>

            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-medium">$0.00</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-medium text-lg">
              <span>Total</span>
              <span>{total}</span>
            </div>
            {errorM && phone.length == 0 && (
              <p className="text-red-600">Please Enter the contact no</p>
            )}
            <div className="font-medium text-lg text-leftzx">
              <label>Contact no:</label>
              <Input
                type="text"
                onChange={handleInputChange}
                placeholder="Contact no"
                required
              />
            </div>
            {errorM && address.length == 0 && (
              <p className="text-red-600">Please Enter the Address</p>
            )}
            <div className=" font-medium text-lg">
              <label>Address :</label>
              <Input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full" onClick={handleButtonClick}>
              Proceed to Checkout
            </Button>
          </CardFooter>
          <div className="flex justify-start m-4 " >
          <div className={"w-full " + Styles.cartBox}  onClick={() => navigate('/carthistory')}>
            <div className="text-xl gap-2 font-bold text-black cursor-pointer" >Previous orders</div>
          </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
