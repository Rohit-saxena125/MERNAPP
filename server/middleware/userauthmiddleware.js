const jwt = require("jsonwebtoken");
const User = require("../Models/user-model");
const userauthmiddleare = async (req, res, next) => {
  
  try {
    const token = req.header("Authorization").replace("Bearer", "").trim();
    const decoded = jwt.verify(token, process.env.JWT_SECERET_KEY);
    const user = await User.findOne({
      email: decoded.email
    }).select({ password: 0 });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    req.user_id = user._id;
    next();
  } catch (err) {
    res.status(401).send("Please Authenticate");
  }
};
module.exports = userauthmiddleare;