const errorcontroller=(err,req,res,next)=>{
    err.status=err.status||'Error';
    err.statusCode=err.statusCode||500;
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        stack:err.stack,
        message:err.message
    });
}

module.exports=errorcontroller;