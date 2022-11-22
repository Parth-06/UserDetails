import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { setapiData } from "../store/userSlice";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const userInfo = useSelector((state) => state.userSlice.userInfo);
  const apiData = useSelector((state) => state.userSlice.apiData.userData);
  const registeredUsers = useSelector(
    (state) => state.userSlice.registeredUsers
  );

  //Verifying user with thier email and password.
  useEffect(() => {
    const verfiyUser = registeredUsers.find(
      (user) =>
        userInfo.email === user.email &&
        userInfo.password === user.password &&
        userInfo.logged === true
    );
    if (!verfiyUser) {
      alert("Please login for better experience");
      navigate("/login");
    }
  }, []);

  //fetching the data from the random api and storing it to avoid refetching data everytime user navigates back and fourth.
  useEffect(() => {
    if (apiData === undefined || apiData.length === 0) {
      const fetch_data = async () => {
        try {
          const newData = await fetch("https://randomuser.me/api/?results=10");
          const res = await newData.json();
          setUserData(res.results);
          dispatch(
            setapiData({
              userData,
            })
          );
        } catch (err) {
          console.log(err);
        }
      };
      fetch_data();
    }
  }, [userData]);

  return (
    <>
      {apiData === undefined ? (
        <>Loading... </>
      ) : (
        <>
          <div className="home">
            <div className="home_userDetails">
              <div className="home_tag">User Details</div>
              {apiData.map((susers) => {
                return (
                  <p
                    onClick={() => navigate("/" + susers.email)}
                    style={{ color: "black" }}
                    key={susers.cell}
                    className="home_userDetails_single"
                  >
                    {susers.name.title} {susers.name.first} {susers.name.last}
                  </p>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
