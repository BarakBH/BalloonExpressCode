/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Home from './views/home';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Login from './views/login';
import Register from './views/register';
import { ToastContainer } from 'react-toastify';
import Single from './views/single';
import CartDrawer from './components/cardDrawer';
import CheckUser from './utils/checkUser';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getcategories, getCart } from './store/actions/data';
import Category from './views/category';
import NotFound from './views/404';
import Checkout from './views/checkout';
import Profile from './views/profile';
import Search from './views/search';

function App() {
  const dispatch = useDispatch();
  const { products, categories, cart } = useSelector(state => state.DataReducer);

  useEffect(() => {
    if(products.length === 0){
      dispatch(getProducts());
    }
    if(categories.length === 0){
      dispatch(getcategories());
    }
    
    if(cart.length === 0){
      dispatch(getCart());
    }
  },[])
  return (
    <div className="App">
      <CheckUser />
      <ToastContainer />
      <Header />
      <CartDrawer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/:id' element={<Single />} />
        <Route path='/category/:category' element={<Category />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/search/:search' element={<Search />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
