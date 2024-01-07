const ServiceModel = require('../Models/service-model');
const Service = async (req, res, next) => {
    try {
        const service = await ServiceModel.find();
        res.status(200).json({ service });
    }
    catch (err) {
        next(err);
    }
};
module.exports = Service;