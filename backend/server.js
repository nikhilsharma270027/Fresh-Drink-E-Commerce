import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import ordersRouter from "./routes/orderRoutes.js"
import helmet from 'helmet';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import Razorpay from "razorpay";
import Product from "./Schemas/Product.js";

dotenv.config();
// console.log("Environment Variables:", process.env);
const PORT = process.env.PORT || 3000;
const server = express();

// const MongoDBStore = require('connect-mongodb-session')(session);

// Setup MongoDB session store
const store = new (MongoDBStore(session))({
  uri: process.env.DB_LOCATION,
  collection: 'sessions'
});

// Catch errors from session store
store.on('error', function(error) {
  console.log(error);
});


// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Replace with your frontend domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies to be sent with requests
  optionsSuccessStatus: 204,
};

// Use CORS middleware with options
server.use(cors(corsOptions));
server.use(express.json());
// server.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
//   next();
// });
server.use(helmet());
// Express session middleware
// server.use(
//   session({
//     secret: process.env.SECRET_ACCESS_KEY, // Replace with a strong key
//     resave: false,
//     saveUninitialized: false,
//     store: store,  // Store session in MongoDB
//     cookie: { 
//       maxAge: 1000 * 60 * 60 * 24, // Session expiration time (24 hours)
//       secure: false  // Set true if using HTTPS
//     }
//   })
// );


mongoose
  .connect(process.env.DB_LOCATION, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

server.use("/api/products", productRoutes);
// Use the orders router for all order-related routes
server.use('/api', ordersRouter);
server.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});
// Middleware to make session user data globally available
// server.use((req, res, next) => {
//   if (req.session.user) {
//     res.locals.user = req.session.user; // Make user available in response locals
//   }
//   next();
// });

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const User = mongoose.model("User", userSchema);


// Login route to store user data from Firebase in session
server.post('/api/login', (req, res) => {
  const { name, email, uid } = req.body;  // Assuming user data from Firebase
  if (!name || !email || !uid) {
    return res.status(400).json({ message: "Missing required fields: name, email, or uid" });
  }

  // req.session.user = { name, email, uid };  // Store Firebase user data in session
  // console.log(req.session.user)
  res.status(200).json({ message: "User logged in", user: req.session.user });
});

// // Route to get the logged-in user from the session
// server.get('/api/session', (req, res) => {
//   if (req.session.user) {
//     res.status(200).json({ user: req.session.user });
//     console.log(req.session.user)
//   } else {
//     res.status(401).json({ message: 'User not logged in' });
//   }
// });

server.post('/api/home', async(req, res) => {
  const { storedCartItems } = req.body;

  try {
    const products = await Product.find({ _id: { $in: storedCartItems } });
    res.json(products);
    console.log(products)
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve product data" });
  }
}) 


// // Endpoint to save user
// server.post("/api/save-user",  async (req, res) => {
//   const { name, email } = req.body;

//   if (!name || !email) {
//     return res
//       .status(400)
//       .json({ message: "Missing required fields: name or email" });
//   }

//   let user = await User.findOne({ email });
//   if (!user) {
//     user = new User({ name, email });
//     await user.save();
//   }

//   res.json({ message: "User saved", user });
// });

// Set Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy headers
server.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin'); // Or 'unsafe-none'
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp'); // Optional, depending on your use case
  next();
});

server.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  res.status(status).send(message);
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});



