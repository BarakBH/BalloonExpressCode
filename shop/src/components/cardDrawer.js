import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_CART, SET_CART } from "../store/constants";
import { BsBag } from "react-icons/bs";
import { Link } from "react-router-dom";

const CardDrawer = () => {
  const [show, setshow] = useState(true);
  const dispatch = useDispatch();
  const { cartOpen } = useSelector((e) => e.OtherReducer);
  const { cart } = useSelector((state) => state.DataReducer);
  const [totalPrice, settotalPrice] = useState(0)
  const closeCart = () => {
    dispatch({ type: TOGGLE_CART, payload: false });
  };
  useEffect(() => {
    setshow(cartOpen);
  }, [cartOpen]);

  useEffect(() => {
    settotalPrice(cart.reduce((total, product) => total + product.count * product.price, 0))
  },[cart])

  const removeProductFromCart = (id) => {
    const newCart = cart.filter((item) => item._id !== id);
    localStorage.setItem("cartProducts", JSON.stringify(newCart));
    dispatch({ type: SET_CART, payload: newCart });
  };
  return (
    <div className={`cartDrawer ${show && "active"}`}>
      <div className="overlay" onClick={closeCart}></div>
      <button className="closebtn" onClick={closeCart}>
        <IoIosClose />
      </button>
      <div className="cartDrawer__content">
        <h2>עגלת הקניות</h2>
        <div className="cart-products">
          {cart.map((product) => (
            <div key={product._id} className="cart-product">
              <span
                onClick={() => removeProductFromCart(product._id)}
                className="removebtn">
                <IoIosClose />
              </span>
              <img src={product?.thumbnail} alt="" />
              <div className="info">
                <h3>{product.name}</h3>
                <p className="price-count">
                  {product.count} × ₪{product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        {cart.length < 1 && (
          <div className="no-products">
            <BsBag className="icon" />
            עגלת הקניות ריקה
          </div>
        )}
        <div className="total">
          <span>₪{totalPrice}</span>
          <span>: סהכ</span>
        </div>
        <Link onClick={closeCart} className="btn checkout-btn" to='/checkout'>הזמן עכשיו</Link>
      </div>
    </div>
  );
};

export default CardDrawer;
