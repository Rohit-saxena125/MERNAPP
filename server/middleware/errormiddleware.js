const errormiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err || "Something went wrong";
    console.log(message)
    // console.log(message,   err)
    return res.status(status).json({  message });
}
module.exports = errormiddleware;