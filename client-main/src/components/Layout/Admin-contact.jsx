import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/Auth";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {toast} from "react-toastify";
const AdminContact = () => {
  const { authorization } = useAuth();
  const [contact , setContact] = useState([]);
    const getContactData = async () => {
        try{
            const response = await axios.get("http://localhost:9000/api/admin/contact",{
                headers: {
                Authorization: authorization,
                },
            });
            if(response.status === 200)
            {
                const data = await response.data;
                console.log(data);
                setContact(data);
            }
        }
        catch(err)
        {
          console.log(err);
        }
    };
    const Deletedata = async (id) => {
        try{
            const response = await axios.delete(`http://localhost:9000/api/admin/contact/delete/${id}`,{
                headers: {
                Authorization: authorization,
                },
            });
            if(response.status === 200)
            {
                toast.success(response.data.message);
                getContactData();
            }
        }
        catch(err)
        {
          toast.error(err);
        }
    }
    useEffect(()=>{
        getContactData();
    },[]);
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
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {contact.map((current, index) => {
                return (
                  <tr key={index}>
                    <td>{current.username}</td>
                    <td>{current.email}</td>
                    <td>{current.message}</td>
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
export default AdminContact;
