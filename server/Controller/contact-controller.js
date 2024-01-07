const ContactModel = require("../Models/contact-model");
const ContactForm = async (req, res) => {
  try {
    const contact = await  ContactModel.create(req.body);
    res.status(201).json({ msg: "Contact form submitted successfully" });
  } catch (err) {
    // const error = [400, err.message];
    // next(error);
    res.status(400).json({ msg: err.message });
  }
};
module.exports = ContactForm;