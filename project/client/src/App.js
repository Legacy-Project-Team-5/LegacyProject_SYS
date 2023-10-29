import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import List from './components/list';
import AddProduct from './components/productForm';
import NnavBar from './components/NnavBar';
import SignUp from './components/signup';
import Login from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';

function App() {
  const [product, setProduct] = useState([]);

  const getAllProducts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000');
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <BrowserRouter className="productForm">
      <NnavBar />
      <Routes>
        <Route
          path="/form"
          element={<AddProduct getAllProducts={getAllProducts} />}
        />
        <Route
          path="/"
          element={<List product={product} setProduct={setProduct} getAllProducts={getAllProducts} />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
