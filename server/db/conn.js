const mongoose = require("mongoose");
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log("ERROR:", err.message);
    exit(0);
  }
};
module.exports = connectdb;