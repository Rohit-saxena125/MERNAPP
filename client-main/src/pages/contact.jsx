import React,{useState} from 'react'
import { useAuth } from '../store/Auth';
import axios from "axios";
import {  toast } from 'react-toastify';
const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};
const Contact = () => {
  const [data, setData] = useState(defaultContactFormData);
  const [userdata,setUserdata] = useState(true);
  const { user } = useAuth();
  if(user && userdata){
    setData({
      username: user.username,
      email: user.email,
      message: "",
    })
    setUserdata(false);
  }

  const handleContactForm = async (e) => {
    e.preventDefault();
    try{
        const  res = await axios.post("https://mern-server-27se.onrender.com/api/form/contact",
        data,{
          headers: {
            "Content-Type": "application/json",
          },
        })

        if(res.status === 201)
        {
          setData(defaultContactFormData);
          toast.success("Message Send Successfully");
        }
        else{
          toast.error("Something went wrong");
        }
    }
    catch(err){
      toast.error("frontend error");
    }
    
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us {user.username}</h1>
        </div>
        <div className="container grid grid-half-cols">

          <section className="section-form">
            <form onSubmit={handleContactForm}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  value={data.username}
                  onChange={handleInput}
                  autoCapitalize="off"
                  required
                />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={handleInput}
                  autoCapitalize="off"
                  required
                />
                <label htmlFor="username">Message</label>
                <textarea
                  type="text"
                  name="message"
                  id="message"
                  placeholder="Enter your message"
                  value={data.message}
                  onChange={handleInput}
                  autoCapitalize="off"
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
             
            </form>
          </section>
        </div>
      
      </section>
    </>
  );
}

export default Contact
