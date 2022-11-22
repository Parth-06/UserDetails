import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRegister } from "../store/userSlice";
import "./Login.css";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registeredUsers = useSelector(
    (state) => state.userSlice.registeredUsers
  );

  //checking if email already exists if not then dispatch the data and navigate to the login page
  const register = (e) => {
    e.preventDefault();
    if (email === "" || password === "" || userName === "") {
      alert("Please Complete all fields");
    } else {
      const checkEmail = registeredUsers.find((user) => user.email === email);
      if (checkEmail) {
        alert("User already Exists");
      } else {
        dispatch(
          setRegister({
            name: userName,
            email,
            password,
          })
        );
        navigate("/login");
      }
    }
  };
  return (
    <div className="login">
      <h1>Register</h1>
      <form onSubmit={(e) => register(e)} className="login_form">
        <input
          className="login_form_input"
          type="text"
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          maxLength="20"
        />
        <input
          className="login_form_input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength="25"
        />
        <input
          className="login_form_input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength="25"
        />
        <button type="submit" className="login_btn">
          Submit
        </button>
      </form>
      <button onClick={() => navigate("/login")} className="login_btn">
        Login
      </button>
    </div>
  );
};

export default Register;
