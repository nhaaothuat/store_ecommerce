import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import PlaceOrder from "./pages/placeorder/PlaceOrder";
import Cart from "./pages/cart/Cart";
import Footer from "./components/footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Test from "./components/Test/Test"
function App() {

  const [showLogin,setShowLogin] = useState(false);
  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
