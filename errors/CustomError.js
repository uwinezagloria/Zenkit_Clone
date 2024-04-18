class customError extends Error{
    constructor(message,statusCode){
        super()
        this.message=message
        this.statusCode=statusCode
        // this.status=statusCode>=400 && statusCode<500 ? 'Fail' :'error'
        // this.isOperational=true
        //  Error.captureStackTrace=(this,this.constructor)
    }
}
export default customError

