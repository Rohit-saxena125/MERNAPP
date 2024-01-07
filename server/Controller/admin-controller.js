const User = require('../Models/user-model');
const ContactModel = require('../Models/contact-model');
const ServiceModel = require('../Models/service-model');
const getAllUser = async (req, res,next) => {  
    try {
        const user = await User.find({}, { password: 0 });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}
const deleteUser = async (req, res,next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"User Deleted Successfully"});
    } catch (error) {
        next(error);
    }
}
const findUser = async (req, res,next) => {
    try {
        const user = await User.findById({_id:req.params.id},{password:0});
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}
const updateUser = async (req, res,next) => {
    try{
        const user = req.params.id;
        const userupdatedata = req.body;
        console.log(userupdatedata);
        const userupdate = await User.updateOne({_id:user},{$set:userupdatedata});
        return res.status(200).json({message:"User Updated Successfully"});
    }
    catch(err)
    {
        next(err);
    }
}
const getAllContact = async (req, res,next) => {
    try {
        const contact = await ContactModel.find({});
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
}
const deleteContact = async (req, res,next) => {    
    try {
        const contact = await ContactModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Contact Deleted Successfully"});
    } catch (error) {
        next(error);
    }
}
const getAllService = async (req, res,next) => {
    try {
        const service = await ServiceModel.find({});
        res.status(200).json(service);
    } catch (error) {
        next(error);
    }
}
const deleteService = async (req, res,next) => {    
    try {
        const service = await ServiceModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Service Deleted Successfully"});
    } catch (error) {
        next(error);
    }
}
const findService = async (req, res,next) => {
    try {
        const service = await ServiceModel.findById({_id:req.params.id});
        res.status(200).json(service);
    } catch (error) {
        next(error);
    }
}
const updateService = async (req, res,next) => {
    try{
        const service = req.params.id;
        const serviceupdatedata = req.body;
        const serviceupdate = await ServiceModel.updateOne({_id:service},{$set:serviceupdatedata});
        return res.status(200).json({message:"Service Updated Successfully"});
    }
    catch(err)
    {
        next(err);
    }
}
const createService = async (req, res,next) => {
    try{
        const {service,description,price,provider,imageurl} = req.body;
        const servicecreate = new ServiceModel({service,description,price,provider,imageurl});
        const newservice = await servicecreate.save();
        res.status(200).json({message:"Service Created Successfully"});
    }
    catch(err)
    {
        next(err);
    }
}
module.exports = {getAllUser,getAllContact,deleteUser,findUser,updateUser,deleteContact,getAllService,deleteService,findService,updateService,createService};