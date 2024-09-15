import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
const PORT = 3000;
const server = express();

// CORS configuration
const corsOptions = {
    origin: 'https://fresh-drink-e-commerce.vercel.app/', // Replace with your frontend domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent with requests
    optionsSuccessStatus: 204
  };
  
  // Use CORS middleware with options
  server.use(cors(corsOptions));
server.use(express.json());

mongoose.connect(process.env.DB_LOCATION, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  autoIndex: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});

server.use('/api/products', productRoutes);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
