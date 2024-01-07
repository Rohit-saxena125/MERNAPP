const mongoose = require("mongoose");
const ContactSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    message: {
      type: String,
      required: true,
      min: 6,
    },
  },
  { timestamps: true }
);
const ContactModel = mongoose.model("Contact", ContactSchema);
module.exports = ContactModel;