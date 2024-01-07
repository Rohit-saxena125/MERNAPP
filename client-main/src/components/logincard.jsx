import React, { useState } from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import "../assests/css/logincard.css";
import Logo from "../assests/images/logo.png";
import LadingLogo from "../assests/images/landingpage.png";
import { SocialIcon } from "react-social-icons";
import axios from "axios";
import { useAuth } from "../store/Auth";
import {  toast } from 'react-toastify';
const LoginCard = () => {
  const navigate = useNavigate();
  const {storeToken} = useAuth();
  const [user, setUser] = useState({
    email: "",
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
        "http://localhost:9000/api/v2/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        storeToken(res.data.token);
        setUser({
          email: "",
          password: "",
        });
        toast.success("Login Successfully");    
        navigate("/");
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
                type="password"
                placeholder="Enter your Password"
                name="password"
                id="password"
                value={user.password}
                onChange={handelchange}
                required
                autoComplete="off"
              />
              <button type="submit">Login</button>
            </form>
            <div className="line">
              <div className="hrline">
                <hr />
              </div>

              <div>
                <p>or</p>
              </div>
              <div className="hrline">
                <hr />
              </div>
            </div>
            <div className="socialicon">
              <div>
                <SocialIcon url="https://www.facebook.com/" />
              </div>
              <NavLink className="linkser" to="www.facebook.com">
                Login with Facebook
              </NavLink>
            </div>
            <div className="pass">
              <NavLink className="linkser">Forgot Password?</NavLink>
            </div>
          </div>

          <div className="signupseaction">
            <p>Don't have an account?</p>
            <NavLink className="linkser" to="/signup">
              Sign up
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginCard;
