import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import { auth } from 'express-oauth2-jwt-bearer';

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

const apple = 'https://dev-e7kwz32ylcdzonq1.us.auth0.com/api/v2/'
const baseUrl = 'https://fresh-drink-e-commerce.vercel.app';
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  secret: "GS_8q42KfJJn9ONHijJPB94HWb30r2iJPZqaOQC8cCPKZbPFopdoM0D4DQbtnC3T",
  tokenSigningAlg: 'RS256'
});

server.use('/api/products', productRoutes);


// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const User = mongoose.model('User', userSchema);

// Endpoint to save user
server.post('/api/save-user', async (req, res) => {
  const { name, email } = req.body;

  // Check if user already exists
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ name, email });
    await user.save();
  }

  res.json({ message: 'User saved', user });
});

server.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 500;
  res.status(status).send(message);
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
