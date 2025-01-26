import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './Components/ProductList';
import AddProduct from './Components/AddProduct';
import EditProduct from './Components/EditProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
