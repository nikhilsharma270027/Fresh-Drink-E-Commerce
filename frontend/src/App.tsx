// App.tsx
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Home from './pages/Home'
// import Productframe from './components/Productframe';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/product' element={<Productframe />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
