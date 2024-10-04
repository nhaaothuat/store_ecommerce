import React, { useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import axios from "axios";
import { RxCrossCircled } from "react-icons/rx";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import emailjs from "emailjs-com"; // Importing EmailJS correctly

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign In");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onLogin = async (e) => {
    e.preventDefault();

    let newUrl = url;
    if (currState === "Sign In") {
      newUrl += 'api/user/login';
    } else {
      newUrl += 'api/user/register';
    }

    try {
      const res = await axios.post(newUrl, data);

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setShowLogin(false);

        // Send email only during registration
        if (currState === "Sign Up") {
          emailjs.send(import.meta.env.VITE_EMAIL_ID, import.meta.env.VITE_TEMPLATE_ID, {
            to_email: data.email, // Địa chỉ email của người dùng
            name: data.name, // Tên người dùng
            // Bạn có thể thêm các trường khác nếu cần
          }, import.meta.env.VITE_USER_ID)
            .then((response) => {
              console.log('Email sent successfully!', response.status, response.text);
              toast.success("Email xác nhận đã được gửi!");
            }, (err) => {
              console.error('Failed to send email:', err);
              toast.error("Gửi email thất bại!");
            });
        }
      } else {
        toast.error(res.data.messenger);
      }
    } catch (error) {
      console.error('Login/Register error:', error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <RxCrossCircled className="img" onClick={() => setShowLogin(false)} />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign In" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Your name"
              required
            />
          )}
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Your email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Sign In"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Sign In" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrState("Sign Up")}> Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("Sign In")}> Sign In here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
