const mongoose = require("mongoose");
const service = mongoose.Schema({
  service: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  imageurl: {
    type: String,
    required: true,
  },
});
const ServiceModel = mongoose.model("service", service);
module.exports = ServiceModel;