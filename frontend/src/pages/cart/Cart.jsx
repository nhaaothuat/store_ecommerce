import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cartItems, food_list, removeFromCart,getTotalCartAmount } = useContext(StoreContext);

  const navigate = useNavigate()
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p className="">Items</p>
          <p className="">Title</p>
          <p className="">Price</p>
          <p className="">Quantity</p>
          <p className="">Total</p>
          <p className="">Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index} className="">
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]}</p>
                  <MdDelete
                    className="cross"
                    onClick={() => removeFromCart(item._id)}
                  />
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="">
            <div className="cart-total-details">
              <p className="">Subtotal</p>
              <p className="">${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p className="">Delivery Fee</p>
              <p className="">${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p className="">Total</p>
              <p className="">${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>Proceed to checkout</button>
        </div>

        <div className="cart-promocode">
          <div className="">
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code"/>
              <button >Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
