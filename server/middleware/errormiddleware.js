const errormiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err || "Something went wrong";
    const extradetails = "error from backend";
    console.log(message)
    // console.log(message,   err)
    return res.status(status).json({  message , extradetails });
}
module.exports = errormiddleware;
