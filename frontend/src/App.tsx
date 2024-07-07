// App.tsx
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Home from './pages/Home'
import ProductPage from './pages/ProductPage';
import SingleProductPage from './pages/SingleProductPage';
// import Productframe from './components/Productframe';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<SingleProductPage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/cart' element={<h1>Cart age</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
