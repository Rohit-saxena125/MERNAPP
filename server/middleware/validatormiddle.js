const validate = (schema) => async (req, res, next) =>{
    try{
        const value = await schema.parseAsync(req.body);
        req.body = value;
        next();
    }
    catch(err){
        // res.status(400).json({message: err.errors[0].message});
        const error = err.errors[0].message;
        // console.log(error);
        next(error)
    }
}
module.exports = validate;