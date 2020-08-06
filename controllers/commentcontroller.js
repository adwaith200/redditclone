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

//Gets comments for a particular post
exports.getpostcomments=async(req,res,next)=>{
    try{
        const commentdata=await Comment.find({post:req.params.id});
        res.json({
            status:'success'
        });
    }catch(err)
    {
        next(err);
    }
}

//Gets all the comments that user has commented 
exports.getuserpostedcomments=async(req,res,next)=>{
    try{
        const commentdata=await Comment.find({user:req.user.id});
        res.json({
            status:'success',
            data:commentdata
        });
    }catch(err)
    {
        next(err);
    }
}

exports.createcomment=async(req,res,next)=>{
    try{    
        const {post,description}=req.body;
        const user=req.user.id;
        const commentdata=await Comment.create({
            post,
            description,
            user
        });
        res.json({
            status:'Success',
            data:commentdata
        });
    }catch(err)
    {
        next(err);
    }
}