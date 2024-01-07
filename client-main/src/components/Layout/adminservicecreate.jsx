import React,{useState} from 'react'
import { useAuth } from "../../store/Auth";
import axios from "axios";
import { toast } from 'react-toastify';
const AdminCreate = () => {
    const { authorization } = useAuth();
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
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:9000/api/admin/services/create",service,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authorization,
                    },
                }
            );
            console.log(res.data.reponse);
            if (res.status === 200) {
                setService({
                    service: "",
                    description: "",
                    price: "",
                    provider: "",
                    imageurl: "",
                });
                toast.success("Service Created Successfully");
            }
        } catch (err) {
            toast.error("Service Creation Failed");
        }
    };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">Create Service</h2>
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
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  )
}

export default AdminCreate;
