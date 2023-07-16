/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import GallerySlider from '../components/sliders/gallerySlider';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { SET_CART } from '../store/constants';
import axios from '../utils/axios';

const Single = () => {
  const navigate = useNavigate();
  const [product, setproduct] = useState({});
  const { id } = useParams();
  const [count, setcount] = useState(0)
  const dispatch = useDispatch();
  const [color, setcolor] = useState()

  useEffect(async () => {
    try {
      if (id) {
        const { data } = await axios.get(`/api/product/${id}`);
        setproduct(data);
      }
    } catch (error) {
      navigate('/');
      console.log(error.response);
    }
  }, [id]);

  const increment = () => {
    setcount(count + 1);
  }

  const decrement = () => {
    if (count > 0) {
      setcount(count - 1);
    }
  }

  const addToCart = () => {

    if (product.quantity < count && product.quantity !== null) {
      toast.error(`מצטערים ! אין לנו מספיק "${product.name}" במלאי`);
      return;
    }

    if (product?.options?.colors.length > 0 && !color) {
      toast.error(`בבקשה בחרו צבע עבור ${product.name}`);
      return;
    }

    if (count === 0) {
      toast.error(`בבקשה בחרו כמות`);
      return;
    }

    let cartProducts = JSON.parse(localStorage.getItem('cartProducts'));

    if (!cartProducts) {
      cartProducts = [];
    }

    //check if product already in cart
    const productInCart = cartProducts.find((p) => p._id === product._id);
    let newCartproduct;

    //update quantity
    if (productInCart) {
      productInCart.count = count + productInCart.count;
    } else {
      newCartproduct = {
        _id: product._id,
        name: product.name,
        price: product.price,
        count: count,
        thumbnail: product.thumbnail,
        color: color,
      }
      cartProducts.push(newCartproduct);
    }

    dispatch({ type: SET_CART, payload: cartProducts });
    setcount(0);
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    toast.success('מוצר התווסף לעגלת הקניות בהצלחה !');
  }
  return (
    <div className='single-product'>
      <div className='container'>
        <div className="single-wrapper">
          <div className="gallery-side">
            <GallerySlider gallery={product?.gallery || []} />
          </div>
          <div className="detail-side">
            <p className="sku"><span>{product?.sku || 'null'}</span> :מקט</p>
            <p className="category">קטגוריה: <Link to={`/category/${product?.category?.value}`}>{product?.category?.label}</Link></p>
            <h2 className='name'>{product?.name}</h2>
            <h2 className='price'>₪ {product?.price}</h2>
            <hr />
            <p className='desc'>{product?.shortDesc}</p>
            <div className="colors">
              <p>:צבעים</p>
              <div className="color-wrapper">
                {product?.options?.colors?.map((color, index) => (
                  <div className="option-radio" key={index}>
                    <input onChange={(e) => setcolor(e.target.value)} name='color' value={color} type="radio" id={`colorOption-${index}`} />
                    <label htmlFor={`colorOption-${index}`} style={{ backgroundColor: color }}>{color}</label>
                  </div>
                ))}
              </div>
            </div>
            <p className="stock">זמינות במלאי: <span>{product?.quantity || 'unlimeted'}</span></p>
            <div className="product-counter">
              <span onClick={decrement} className='remove'><IoIosRemove /></span>
              <span className="value">{count}</span>
              <span onClick={increment} className='add'><IoIosAdd /></span>
            </div>
            <button onClick={addToCart} className='btn'>הוסף לעגלת הקניות</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Single