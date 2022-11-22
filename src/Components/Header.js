import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../store/userSlice";
import "./Header.css";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Get list of all registered users
  const registeredUsers = useSelector(
    (state) => state.userSlice.registeredUsers
  );

  const logout = () => {
    dispatch(
      setLogout({
        value: [],
        registeredUsers: registeredUsers,
      })
    );
    navigate("/login");
  };
  return (
    <div className="header">
      <h1 onClick={() => navigate("/")}>Users List</h1>

      <button onClick={logout} className="logout_btn">
        Logout
      </button>
    </div>
  );
};

export default Header;
