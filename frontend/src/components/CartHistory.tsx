import axios from "axios";
import { useEffect, useState } from "react";

interface Order {
  _id: string;
  address: string;
  amount: number;
}
const CartHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const sessionUser = sessionStorage.getItem("user");
    const sessionU = sessionUser ? JSON.parse(sessionUser) : null;

    if (sessionU && sessionU.email) {
      setEmail(sessionU.email);
      fetchOrders(sessionU.email); // Pass email to fetchOrders
    }
  }, [email]);

  const fetchOrders = async (userEmail: any) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/api/orderdis",
        { email: userEmail }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <>
      <div className="mt-4">
        {orders.map((order) => (
          <div key={order._id} className="m-2 border-black border-4 bg-[#bd5aeb] flex justify-between px-2 py-4">
            
            <div>
              <div className="font-bold">Order ID: {order._id}</div>
            </div>
            <div>
              <div className="font-bold">Address: {order.address}</div>
            </div>
            <div>
              <div className="font-bold">Total: {(order.amount / 100).toFixed(2)}</div>{" "}
              {/* Format total amount */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CartHistory;
