const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: true,
      min: 6,
    },
    phone: {
      type: String,
      required: true,
      min: 10,
    },
    // post: {
    //   type: Array,
    //   default: [],
    // },
    // profilePicture: {
    //   type: String,
    //   default: "",
    // },
    // coverPicture: {
    //   type: String,
    //   default: "",
    // },
    // gender: {
    //   type: String,
    //   enum: ["male", "female"],
    // },
    // followers: {
    //   type: Array,
    //   default: [],
    // },
    // followings: {
    //   type: Array,
    //   default: [],
    // },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
  next();
});
UserSchema.methods.generateAuthToken = async function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        isAdmin: this.isAdmin,
        email: this.email,
      },
      process.env.JWT_SECERET_KEY,
      {
        expiresIn: "1h",
      }
    );
  } catch (err) {
    const error = [400, err.message];
    next(error);
  }
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
