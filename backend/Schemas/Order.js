import { model, Schema } from "mongoose";

const orderSchema = new Schema({
    // razorpay_order_id: { type: String },
    razorpay_payment_id: { type: String },
    // razorpay_signature: { type: String },
    amount: { type: Number, required: true },
    phone: { type: Number },
    address: { type: String },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Orders = model('Order', orderSchema); // Make sure this is correctly named
export default Orders; // Default export
