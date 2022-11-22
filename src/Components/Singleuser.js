import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./Singleuser.css";
const Singleuser = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const userInfo = useSelector((state) => state.userSlice.userInfo);
  const apiData = useSelector((state) => state.userSlice.apiData.userData);
  const registeredUsers = useSelector(
    (state) => state.userSlice.registeredUsers
  );

  //verifying user
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

  //filtering the userdata with params and api data
  let filterApiData = apiData;
  if (apiData) {
    filterApiData = filterApiData.filter((items) => items.email === username);
  }
  let filterUserData = filterApiData[0];

  return (
    <>
      {filterUserData.location === undefined ? (
        <>Loading</>
      ) : (
        <div className="singleuser">
          <div className="home_tag">Details</div>
          <img
            src={filterUserData.picture.large}
            alt=""
            className="single_image_large"
          />
          <p>
            <span className="tag_name">Name: </span>
            {filterUserData.name.title} {filterUserData.name.first}{" "}
            {filterUserData.name.last}
          </p>
          <p>
            <span className="tag_name">Email: </span>
            {filterUserData.email}
          </p>
          <p>
            <span className="tag_name">Username: </span>
            {filterUserData.login.username}
          </p>
          <p>
            <span className="tag_name">DOB: </span>
            {filterUserData.dob.date.split("T")[0]}
          </p>
          <p className="user_address">
            <span className="tag_name">Address: </span>
            {` ${filterUserData.location.street.name}/${filterUserData.location.street.number}, ${filterUserData.location.city}, ${filterUserData.location.state}, ${filterUserData.location.country}, ${filterUserData.location.postcode}`}
          </p>
        </div>
      )}
    </>
  );
};

export default Singleuser;
