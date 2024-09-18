import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import { auth } from 'express-oauth2-jwt-bearer';
import {jwt} from 'express-jwt';
import {jwks} from 'jwks-rsa'

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

// server.use(auth({
//   issuerBaseURL: process.env.AUTH0_DOMAIN,
//   audience: process.env.AUTH0_AUDIENCE,
// }));
// Middleware to protect routes with JWT
const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by JWKS
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `"https://dev-e7kwz32ylcdzonq1.us.auth0.com/.well-known/jwks.json`,
  }),
  // Validate the audience and the issuer
  audience: "apple",
  issuer: 'https://dev-e7kwz32ylcdzonq1.us.auth0.com/',
  algorithms: ['RS256'],
});
// enforce on all endpoints
// server.use(jwtCheck);
server.use(checkJwt)
server.use('/api/products', productRoutes);


// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const User = mongoose.model('User', userSchema);

// Endpoint to save user
server.post('/api/save-user', jwtCheck, async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Missing required fields: name or email' });
  }
  

  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ name, email });
    await user.save();
  }

  res.json({ message: 'User saved', user });
});


server.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';
  res.status(status).send(message);
});


server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
