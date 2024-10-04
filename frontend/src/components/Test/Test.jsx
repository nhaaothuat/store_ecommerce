import React, { useContext, useState } from "react";
import axios from "axios"
import { StoreContext } from "../../context/StoreContext";

const Test = () => {
  const {url} = useContext(StoreContext)
  const [userId, setUserId] = useState("");
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url +"api/order/place", {
        userId,
        items,
        amount,
        address,
      });
      
      // Chuyển hướng đến URL thanh toán
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="User ID" 
        value={userId} 
        onChange={(e) => setUserId(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Items" 
        value={items} 
        onChange={(e) => setItems(e.target.value.split(","))} 
        required 
      />
      <input 
        type="number" 
        placeholder="Amount" 
        value={amount} 
        onChange={(e) => setAmount(Number(e.target.value))} 
        required 
      />
      <input 
        type="text" 
        placeholder="Address" 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
        required 
      />
      <button type="submit">Place Order</button>
    </form>
  );
};

export default Test;
