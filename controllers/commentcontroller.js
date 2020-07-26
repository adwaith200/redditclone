//Node modules


//User defined modules
const Comment=require('../models/commentmodel');

exports.getallcomments=async(req,res,next)=>{
    try{
        const commentdata=await Comment.find();
        res.json({
            status:'Success',
            data:commentdata
        });
    }catch(err)
    {
        next(err);
    }
}

exports.getpostcomments=async(req,res,next)=>{
    try{
        const commentdata=await Comment.find({post:req.params.id});
        console.log(commentdata);
        res.json({
            status:'success'
        });
    }catch(err)
    {
        next(err);
    }
}

exports.createcomment=async(req,res,next)=>{
    try{    
        const commentdata=await Comment.create(req.body);
        res.json({
            status:'Success',
            data:commentdata
        });
    }catch(err)
    {
        next(err);
    }
}