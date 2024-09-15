// App.tsxs
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Home from './pages/Home'
import ProductPage from './pages/ProductPage';
import SingleProductPage from './pages/SingleProductPage';
import Cart from './pages/Cart';
// import Productframe from './components/Productframe';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<SingleProductPage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
