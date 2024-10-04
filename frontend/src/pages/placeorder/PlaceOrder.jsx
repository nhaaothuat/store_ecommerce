import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";
import { db } from "../../../firebase.js";

const PlaceOrder = () => {
  const { userId, getTotalCartAmount, cartItems } = useContext(StoreContext);
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
  const [payosLoaded, setPayosLoaded] = useState(false); // State to track PayOS script loading

  // Dynamically load PayOS script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.payos.io/v1/checkout.js";
    script.async = true;
    script.onload = () => setPayosLoaded(true); // Set to true once the script is loaded
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!payosLoaded) {
    //   alert("PayOS checkout is not ready yet. Please try again in a moment.");
    //   return;
    // }

    setLoading(true);

    const orderData = {
      userId,
      items: cartItems,
      amount: getTotalCartAmount() + 2, // Including delivery fee
      address: deliveryInfo,
      status: "Pending",
    };

    try {
      // Call PayOS Checkout
      window.PayosCheckout.open({
        amount: orderData.amount * 100, // Convert to smallest currency unit (e.g., cents)
        currency: "USD",
        description: "Order Payment",
        onSuccess: async (paymentResult) => {
          try {
            const orderId = await saveOrderToFirestore({
              ...orderData,
              status: "Paid",
              payment: true,
              transactionId: paymentResult.transactionId,
            });
            alert(`Payment successful! Order ID: ${orderId}`);
          } catch (error) {
            alert(`Error saving order: ${error.message}`);
          } finally {
            setLoading(false);
          }
        },
        onError: (error) => {
          console.error("Payment failed: ", error);
          alert("Payment failed. Please try again.");
          setLoading(false);
        },
      });
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
    <form onSubmit={handleSubmit} className="place-order">
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
      </div>
    </form>
  );
};

export default PlaceOrder;
