import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setuserInfo } from "../store/userSlice";
import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registeredUsers = useSelector(
    (state) => state.userSlice.registeredUsers
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //verifying email, password and if successfull navigating to the home page.
  const login = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please Complete all fields");
    } else {
      const verfiyUser = registeredUsers.find(
        (user) => user.email === email && user.password === password
      );
      if (verfiyUser) {
        dispatch(
          setuserInfo({
            email,
            password,
            logged: true,
          })
        );
        navigate("/");
      } else {
        alert("Email or password is wrong");
      }
    }
  };

  //guest login
  const guestLogin = () => {
    const guestEmail = "trial@gmail.com";
    setEmail(guestEmail);
    const guestPassword = "pass@123";
    setPassword(guestPassword);
    dispatch(
      setuserInfo({
        email: guestEmail,
        password: guestPassword,
        logged: true,
      })
    );
    navigate("/");
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <form className="login_form" onSubmit={(e) => login(e)}>
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
      <button type="submit" onClick={guestLogin} className="login_btn">
        Guest Login
      </button>
      <button
        type="submit"
        onClick={() => navigate("/register")}
        className="login_btn"
      >
        Register
      </button>
    </div>
  );
};

export default Login;
