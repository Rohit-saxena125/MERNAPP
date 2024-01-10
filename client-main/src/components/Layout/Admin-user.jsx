import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/Auth";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Link} from 'react-router-dom';
import {toast} from "react-toastify";
const AdminUser = () => {
  const { authorization } = useAuth();
  const [userda, setUserda] = useState([]);
  const getAllData = async () => {
    try {
      const response = await axios.get(
        "https://mern-server-27se.onrender.com/api/admin/users",
        {
          headers: {
            Authorization: authorization,
          },
        }
      );
      if (response.status === 200) {
        const data = await response.data;
        console.log(data);
        setUserda(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllData();
  }, []);
  const Deletedata = async (id) => {
    try{
        const response = await axios.delete(`https://mern-server-27se.onrender.com/api/admin/users/delete/${id}`,{
            headers: {
            Authorization: authorization,
            },
        });
        if(response.status === 200)
        {
            toast.success(response.data.message);
            getAllData();
        }
    }
    catch(err)
    {
      toast.error(err);
    }
  };
  return (
    <>
      <section className="container">
        <div className="section-heading">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="admin-data">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {userda.map((current, index) => {
                return (
                  <tr key={index}>
                    <td>{current.username}</td>
                    <td>{current.email}</td>
                    <td>{current.phone}</td>
                    <td><Link to={`/admin/users/${current._id}/edit`}><EditIcon/></Link></td>
                    <td><button onClick={()=>Deletedata(current._id)}><DeleteForeverIcon/></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
export default AdminUser;
