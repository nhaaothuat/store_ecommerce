import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";
import { db } from "../../../firebase.js";
import { usePayOS, PayOSConfig } from "payos-checkout";
import axios from "axios";

const PlaceOrder = () => {
  const { userId, getTotalCartAmount, cartItems, url } = useContext(StoreContext);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      userId,
      items: cartItems,
      amount: getTotalCartAmount() + 2,
      address: deliveryInfo,
      status: "Pending",
    };
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(url + "api/order/place", orderData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setPaymentUrl(response.data.paymentUrl);
      setLoading(true);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const saveOrderToFirestore = async (orderData) => {
    try {
      const docRef = await db.collection("orders").add(orderData);
      return docRef.id;
    } catch (error) {
      console.error("Error saving order to Firestore: ", error);
      throw error;
    }
  };

  const renderInput = (name, placeholder, type = "text") => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={deliveryInfo[name]}
      onChange={handleChange}
      required
    />
  );

  return (
    <form onSubmit={handleSubmit} >
      <div className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          {renderInput("firstName", "First Name")}
          {renderInput("lastName", "Last Name")}
        </div>
        {renderInput("email", "Email address", "email")}
        {renderInput("street", "Street")}
        <div className="multi-fields">
          {renderInput("city", "City")}
          {renderInput("state", "State")}
        </div>
        <div className="multi-fields">
          {renderInput("zipCode", "Zip code")}
          {renderInput("country", "Country")}
        </div>
        {renderInput("phone", "Phone")}
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>$2</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <p>${getTotalCartAmount() + 2}</p>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div></div>
      {loading && <div style={{ width: '100%', height: '100vh' }}>
      <iframe
            src={paymentUrl}
        style={{ width: '100%', height: '100%', border: 'none' }}
        allowFullScreen
      />
    </div>}
      
    </form>
  );
};

export default PlaceOrder;
