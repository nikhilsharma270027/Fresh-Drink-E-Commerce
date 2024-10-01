import dotenv from "dotenv";
import express from 'express';
import Razorpay from 'razorpay';
import crypto from "crypto";
import Orders from '../Schemas/Order.js'
import { getUserOrder } from "../controllers/orderController.js";

dotenv.config();

const router = express.Router();
// console.log("Key ID:", process.env.KeyId);
// console.log("Key Secret:", process.env.KeySecret);


// Razorpay instance
const instance = new Razorpay({
  key_id: process.env.KeyId, // Razorpay Key ID from env
  key_secret: process.env.KeySecret, // Razorpay Key Secret from env
});

// Create Order API
router.post("/create-order", async (req, res) => {
  const { totalAmount } = req.body;
  console.log("Received totalAmount:", totalAmount);
  if (!totalAmount) {
    return res.status(400).json({ error: "Total amount is required." });
  }

  const options = {
    amount: totalAmount * 100, // Convert to paise
    currency: "INR",
  };

  try {
    const order = await instance.orders.create(options);
    res.json(order); // Response sent
  } catch (error) {
    if (!res.headersSent) {  // Check if headers are not sent already
      res.status(500).json({ error: error.message });
    }
  }
});


// Verify Payment Signature API
router.put("/verify-payment", async (req, res) => {
  console.log("Received request to verify payment:", req.body); // Check if this logs the data
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, phone, address, email } = req.body;

  // if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
  //   return res.status(400).json({ error: "Missing payment details" });
  // }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  // const expectedSignature = crypto
  //   .createHmac("sha256", process.env.KeySecret)
  //   .update(body.toString())
  //   .digest("hex");

  // if (expectedSignature === razorpay_signature) {
  if (razorpay_payment_id) {
  //   try {
      const newOrder = await Orders.create({
        // razorpay_order_id,
        razorpay_payment_id,
        // razorpay_signature,
        amount,
        phone,
        email,
        address,
      });
      // await newOrder.save();
      res.json(newOrder);
    // } catch (error) {
    //   res.status(500).json({ error: error.message });
    // }
  } else {
    res.status(400).json({ error: "Invalid signature" });
  }
});
router.post("/orderdis", getUserOrder);

export default router;

