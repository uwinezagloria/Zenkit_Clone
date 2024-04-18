const errorHandler=(error,req,res,next)=>{
    error.statusCode=error.statusCode || 500
    error.status=error.status || 'error';
    error.message = error.message || "rtyui"
    res.status(error.statusCode).json({
        status:error.statusCode,
        message:error.message
    })
    next()
}
export default errorHandler