import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import helmet from 'helmet';


dotenv.config();
const PORT = process.env.PORT || 3000;
const server = express();

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
server.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
server.use(helmet());


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
server.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const User = mongoose.model("User", userSchema);

// Endpoint to save user
server.post("/api/save-user",  async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res
      .status(400)
      .json({ message: "Missing required fields: name or email" });
  }

  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ name, email });
    await user.save();
  }

  res.json({ message: "User saved", user });
});

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
