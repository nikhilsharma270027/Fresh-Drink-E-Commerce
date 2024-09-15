import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const server = express();

// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Replace with your frontend domain
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


// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const User = mongoose.model('User', userSchema);

// Endpoint to save user
app.post('/api/save-user', async (req, res) => {
  const { name, email } = req.body;

  // Check if user already exists
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ name, email });
    await user.save();
  }

  res.json({ message: 'User saved', user });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
