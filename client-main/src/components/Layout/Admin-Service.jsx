import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/Auth";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast } from "react-toastify";
import "../../assests/css/service.css";
import CardServie from "../cardservice";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
const AdminService = () => {
  const { authorization } = useAuth();
  const [card, setCard] = useState([]);
  const getAllCard = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/admin/services",
        {
          headers: {
            Authorization: authorization,
          },
        }
      );
      if (response.status === 200) {
        const data = await response.data;
        console.log(data);
        setCard(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteCard = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/api/admin/services/delete/${id}`,
        {
          headers: {
            Authorization: authorization,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getAllCard();
      }
    } catch (err) {
      toast.error(err);
    }
  };
  useEffect(() => {
    getAllCard();
  }, []);
  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="text-center">Our Services</h2>
            </div>
            <div className="ics">
              <Link to ="/admin/services/create"><AddIcon/></Link>
            </div>
          </div>
          <div className="row">
            {card &&
              card.map((item, index) => {
                return (
                  <CardServie
                    key={index}
                    image={item.imageurl}
                    service={item.service}
                    description={item.description}
                    price={item.price}
                    provider={item.provider}
                    onbutton1={() => deleteCard(item._id)}
                    onbutton2={`/admin/services/update/${item._id}`}
                    button1={<EditIcon />}
                    button2={<DeleteForeverIcon />}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};
export default AdminService;