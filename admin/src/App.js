/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Navigate, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Orders from "./pages/orders";
import Customers from "./pages/customers";
import Products from "./pages/products";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Categories from "./pages/categories";
import AddProduct from "./pages/products/addProduct";
import Login from "./pages/login";
import Authorize from './utils/authorize';
import { ToastContainer } from 'react-toastify';
import EditProduct from './pages/products/editProduct';

function App() {
  const [showSidebar, setshowSidebar] = useState(false);
  return (
    <div className="admin">
      <ToastContainer />
      <Authorize />
      <Header setshowSidebar={setshowSidebar} showSidebar={showSidebar} />
      <Sidebar showSidebar={showSidebar} setshowSidebar={setshowSidebar} />
      <div className="admin__content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path='/edit-product/:id' element={<EditProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
