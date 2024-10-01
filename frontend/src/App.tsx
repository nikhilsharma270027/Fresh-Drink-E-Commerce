// App.tsxs
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Home from './pages/Home'
import ProductPage from './pages/ProductPage';
import SingleProductPage from './pages/SingleProductPage';
import Cart from './pages/Cart';
import Login from './components/auth/login/login';
import Register from './components/auth/register/register';
import PreviousOrder from './pages/PreviousOrder';
import SearchPage from './components/SearchPage';
// import Productframe from './components/Productframe';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/product' element={<SingleProductPage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/carthistory' element={<PreviousOrder />} />
        <Route path='/search/:query' element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
