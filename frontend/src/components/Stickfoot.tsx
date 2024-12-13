import React, { useEffect, useState } from "react";

const StickyFooter = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountUnlocked, setDiscountUnlocked] = useState(false);

  // This function calculates the total price of products in the session
  const calculateTotalPrice = () => {
    const products = JSON.parse(sessionStorage.getItem("cart") || "[]");
    const total = products.reduce((acc: any, product: any) => acc + product.price, 0);
    setTotalPrice(total);
    // Check if discount threshold is met
    if (total >= 1000) {
      setDiscountUnlocked(true);
    }
  };

  // This function adds a product to the session storage
  const addToCart = (product: any) => {
    const existingCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    existingCart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(existingCart));
    calculateTotalPrice(); // Recalculate the total after adding a product
  };

  // Calculate the total price when the component is mounted
  useEffect(() => {
    calculateTotalPrice();
  }, [addToCart]);

  const getProgressPercentage = () => {
    return (totalPrice / 1000) * 100;
  };

  return (
    <div>
      {/* Main content of your page */}
      <div className="p-4">
        {/* Example items */}
        <button
          onClick={() =>
            addToCart({ name: "Product 1", price: 300 })
          }
          className="btn"
        >
          Add Rs.300 Product
        </button>
        <button
          onClick={() =>
            addToCart({ name: "Product 2", price: 500 })
          }
          className="btn"
        >
          Add Rs.500 Product
        </button>
      </div>

      {/* Sticky Footer */}
      <div
        className="bg-[#bd5aeb] fixed bottom-0 left-0 right-0 bg- shadow-lg p-4 z-10"
        style={{ boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex justify-between items-center">
          <div>
            <div>Total: Rs.{totalPrice}</div>
            {discountUnlocked && <div className="text-green-500">10% Discount Unlocked!</div>}
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyFooter;