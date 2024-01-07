import React from "react";
import { useAuth } from "../store/Auth";
import { NavLink } from "react-router-dom";
import "../assests/css/homepage.css";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="section">
      <div className="section-heading">
        <h1>Tonight MERN</h1>
      </div>
      <div>
        <ul className="navli">
          <li>
            <NavLink to="/" activeClassName="active">
              <HomeIcon/>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/service" activeClassName="active">
              Service
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" activeClassName="active">
              Contact
            </NavLink>
          </li>
          {isLoggedIn ? (
            <li>
              <NavLink to="/logout" activeClassName="active">
                <LogoutIcon/>
              </NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink to="/login" activeClassName="active">
                  <LoginIcon/>
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" activeClassName="active">
                  Signup
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
