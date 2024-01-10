import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import Logo from "../assests/images/logo.png";
import "../assests/css/logincard.css";
import LadingLogo from "../assests/images/landingpage.png";
import axios from "axios";
import { useAuth } from "../store/Auth";
import {  toast } from 'react-toastify';
const Registration = () => {
  const navigate = useNavigate();
  const {storeToken} = useAuth();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const handelchange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://mern-server-27se.onrender.com/api/v2/register",user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data.reponse);
      if (res.status === 201) {
        storeToken(res.data.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        toast.success("Registration Successfully");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <>
      <div className="header">
        <img className="imageset" src={LadingLogo} alt="logo" />
        <div className="header-right">
          <div className="sectionheading">
            <img className="imageset1" src={Logo} alt="logo" />
            <br />
            <form onSubmit={handleSubmit} className="formsub">
              <input
                type="text"
                placeholder="Enter your username"
                name="username"
                id="username"
                value={user.username}
                required
                autoComplete="off"
                onChange={handelchange}
              />
              <input
                type="email"
                placeholder="Enter your Email"
                name="email"
                id="email"
                value={user.email}
                onChange={handelchange}
                required
                autoComplete="on"
              />
              <input
                type="number"
                placeholder="Enter your phone number"
                name="phone"
                id="phone"
                value={user.phone}
                onChange={handelchange}
                required
                autoComplete="on"
              />
              <input
                type="password"
                placeholder="Enter your Password"
                name="password"
                id="password"
                value={user.password}
                onChange={handelchange}
                required
                autoComplete="off"
              />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="signupseaction">
            <p>Already have a account?</p>
            <NavLink className="linkser" to="/">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
