import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './Pages/user';
import Product from './Pages/product';
import Order from './Pages/order';
import Home from './Pages/home';
import Dashboard from './Pages/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
  
   <Router>
      <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="home" element={<Home />} />
        <Route path="user" element={<User />} />
        <Route path="product" element={<Product />} />
        <Route path="order" element={<Order />} /> 
      </Route>
        </Routes>
     
      </Router>
  );
}

export default App;
