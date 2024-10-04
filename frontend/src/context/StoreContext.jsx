import { createContext, useEffect, useState } from "react";
import { food_list } from "./food_list";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:3000/";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "api/cart/add",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  };

  const fetchFoodList = async () => {
    const res = await axios.get(url + "api/food/list");
    setFoodList(res.data.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const removeFromCart = async (itemId) => {
    // setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    // if (token) {  
    //   await axios.delete(url + `api/cart/remove`, {itemId},{
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    // }

    setCartItems((prev) => {
      // Ensure we don't go below 0 items in the cart
      const newCount = (prev[itemId] || 0) - 1;
      return { ...prev, [itemId]: newCount < 0 ? 0 : newCount };
  });

  if (token) {
      try {
          await axios.delete(url+`api/cart/remove`, {
              headers: { Authorization: `Bearer ${token}` },
              data: { itemId }, // Use data to send the itemId
          });
      } catch (error) {
          console.error('Error removing item from cart:', error);
          // Optionally handle the error, e.g., revert cart state
      }
  }
  };

  const loadCartData = async (token) => {
    const res = await axios.get(
      url + "api/cart/get",
      
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCartItems(res.data.cartData);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
