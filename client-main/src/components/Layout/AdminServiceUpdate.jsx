import React, { useState, useEffect } from "react";
import { useAuth } from "../../store/Auth";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assests/css/logincard.css";
const AdminServiceUpdate = () => {
  const { authorization } = useAuth();
  const params = useParams();
    const [service, setService] = useState({
    service: "",
    description: "",
    price: "",
    provider: "",
    imageurl: "",
    });
  const handelchange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://mern-server-27se.onrender.com/api/admin/services/update/${params.id}`,
        service,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authorization,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Service Updated Successfully");
        getservicedata();
      }
    } catch (err) {
      toast.error("problem in frontend",err);
    }
  };
    const getservicedata = async () => {
    try {
        const response = await axios.get(
        `https://mern-server-27se.onrender.com/api/admin/services/${params.id}`,
        {
            headers: {
            Authorization: authorization,
            },
        }
        );
        if (response.status === 200) {
        const data = await response.data;
        console.log(data);
        setService(data);
        }
    }
    catch (err) {
        console.log(err);
    }
    };
  useEffect(() => {
    getservicedata();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">Update Service</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="formsub">
          <input
            type="text"
            placeholder="Enter your Service Name"
            name="service"
            id="service"
            value={service.service}
            onChange={handelchange}
            required
            autoComplete="on"
          />
          <input
            type="text"
            placeholder="Enter your Service Description"
            name="description"
            id="description"
            value={service.description}
            onChange={handelchange}
            required
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="Enter your Service Price"
            name="price"
            id="price"
            value={service.price}
            onChange={handelchange}
            required
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="Enter your Service provider"
            name="provider"
            id="provider"
            value={service.provider}
            onChange={handelchange}
            required
            autoComplete="off"
          />
          <textarea
            type="text"
            placeholder="Enter your Service image"
            name="imageurl"
            id="imageurl"
            value={service.imageurl}
            onChange={handelchange}
            required
            autoComplete="off"
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
};
export default AdminServiceUpdate;
