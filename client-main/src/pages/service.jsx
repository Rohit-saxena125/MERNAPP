import React from "react";
import { useAuth } from "../store/Auth";
import Cardservices from "../components/cardservice";
import "../assests/css/service.css";
const Service = () => {
  const { services } = useAuth();
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">Our Services</h2>
          </div>
        </div>
        <div className="row">
          {services &&
            services.map((item, index) => {
              return (
                <Cardservices
                  key={index}
                  image={item.imageurl}
                  service={item.service}
                  description={item.description}
                  price={item.price}
                  provider={item.provider}
                  button1 = "Share"
                  button2 = "Learn More"
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};
export default Service;