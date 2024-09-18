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

const jwtCheck = auth({
  audience: 'apple',
  issuerBaseURL: 'https://dev-e7kwz32ylcdzonq1.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});



// enforce on all endpoints
// server.use(jwtCheck);

server.use('/api/products', productRoutes);
server.get('/authorized', jwtCheck,function (req, res) {
  res.send('Secured Resource');
});

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


import { request } from 'express';

var options = { method: 'POST',
  url: 'https://dev-e7kwz32ylcdzonq1.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"7NfK5lbkzg0TbGrJCLuv0uumJqnV8tf7","client_secret":"ZOnWGZavosPtlTakpozYkdB3H29M4OeAAVElbDmyqji86FqggHG8-eFGmjLsT4qy","audience":"apple","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
