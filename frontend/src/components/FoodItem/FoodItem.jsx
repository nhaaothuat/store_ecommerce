import React, { useContext, useEffect } from "react";
import "./FoodItem.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { StoreContext } from "../../context/StoreContext";
const FoodItem = ({ id, name, price, description, image }) => {
 
  const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

  useEffect(()=>{
    console.log(cartItems)
  },[cartItems])

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={url+"images/"+image} alt="" />
        {!cartItems[id] ? (
          <IoIosAddCircleOutline
            className="add"
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="food-item-counter">
            <IoIosRemoveCircleOutline
              className="remove"
              onClick={() => removeFromCart(id)}
            />
            <p>{cartItems[id]}</p>
            <IoIosAddCircle
              className="add1"
              onClick={() => addToCart(id)}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
