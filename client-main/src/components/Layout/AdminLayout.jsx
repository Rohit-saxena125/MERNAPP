import React from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import TableRowsIcon from "@mui/icons-material/TableRows";
import "../../assests/css/adminlayout.css";
import { useAuth } from "../../store/Auth";
const AdminLayout = () => {
  const { user, isloading } = useAuth();
  console.log("admin Layout", user);
  if (isloading) {
    return <h1>Loading...</h1>;
  }
  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <header className="container">
        <NavLink to="/admin/users">
          <PersonIcon />
          Users
        </NavLink>
        <NavLink to="/admin/contacts">
          <MessageIcon />
          Contacts
        </NavLink>
        <NavLink to="/admin/services">
          <TableRowsIcon />
          Services
        </NavLink>
        <NavLink to="/admin/home">
          <HomeIcon />
          Home
        </NavLink>
      </header>
      <Outlet />
    </>
  );
};

export default AdminLayout;
