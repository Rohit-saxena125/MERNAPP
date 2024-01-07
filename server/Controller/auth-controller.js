const User = require("../Models/user-model");
const bycrypt = require("bcryptjs");
const Register = async (req, res) => {
    try{
        const {username, email, password , phone} = req.body;
        if(!(email && password && username && phone)){
            res.status(400).send("All input is required");
        }
        else if (await User.findOne({email})){
            res.status(400).send("User already exist");
        }
        const user = new User({username, email, password , phone});
        const newuser = await user.save();
        res.status(201).json({message: "User registered successfully", token: await newuser.generateAuthToken(), user: newuser._id.toString()});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}
const Login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!(email && password)){
            res.status(400).send("All input is required");
        }
        const userex = await User.findOne({email});
        if (!userex){
            res.status(400).send("Invalid Credentials");
        }
        const ispass = await bycrypt.compare(password, userex.password);
        if(!ispass){
            res.status(400).send("Invalid Credentials");
        }
        res.status(200).json({message: "User logged in successfully", token: await userex.generateAuthToken(), user: userex._id.toString()});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}
const UserData = async (req, res) => {
    try{
        const userData = req.user;
        res.status(200).json({message: "User logged in successfully" ,user: userData});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}
module.exports = { Register,Login,UserData };
