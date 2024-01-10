import React, { useState, useEffect } from "react";
import { useAuth } from "../../store/Auth";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const AdminUpdteUser = () => {
  const { authorization } = useAuth();
  const params = useParams();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const handelchange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://mern-server-27se.onrender.com/api/admin/users/update/${params.id}`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authorization,
          },
        }
      );
      if (response.status === 200) {
        toast.success("User Updated Successfully");
        getuserdata();
      }
    } catch (err) {
      toast.error("problem in frontend",err);
    }
  };
  const getuserdata = async () => {
    try {
      const response = await axios.get(
        `https://mern-server-27se.onrender.com/api/admin/users/${params.id}`,
        {
          headers: {
            Authorization: authorization,
          },
        }
      );
      if (response.status === 200) {
        const data = await response.data;
        console.log(data);
        setUser(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getuserdata();
  }, []);
  return (
    <div>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default AdminUpdteUser;
