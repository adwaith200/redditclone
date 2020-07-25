//Node modules
const multer=require('multer');
const sharp=require('sharp');

//User defined modules
const Apperror=require('../utils/Apperror');
const User = require('../models/usermodel');

const multerstorage=multer.memoryStorage();
 
const multerfilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image'))
    {
        cb(null,true);
    }else
    {
        cb(new Apperror('Not an image',400),false);
    }
}

const upload=multer({
    storage:multerstorage,
    fileFilter:multerfilter
});

//Used for parsing file uploads
exports.uploadpic=upload.single('profilepic');

//Used for resizing images
exports.resizepic=async(req,res,next)=>{
    if(!req.file)
    {
        return next();
    }
    req.file.filename=`user-${Date.now()}.jpeg`;
    await sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({quality:90}).toFile(`templates/img/users/${req.file.filename}`);
    next();
}

//Changing profile pic only
exports.changeprofilepic=async(req,res,next)=>{
    try{
        const userdata=await User.findById(req.user.id);
        console.log(req.file.filename);
        userdata.profilepic=req.file.filename;
        userdata.save({validateBeforeSave:false});
        res.json({
            status:'success'
        });
    }catch(err)
    {
        next(err);
    }
}

//Follow a community
exports.followcommunity=async(req,res,next)=>{
    try{
        const userdata=await User.findById(req.user.id);
        const communityid=req.params.communityid;
        let mycommuntiesfollowing=[...userdata.communtiesfollowing];
        mycommuntiesfollowing.push(communityid);
        userdata.communtiesfollowing=mycommuntiesfollowing;
        userdata.save({validateBeforeSave:false});
        res.json({
            status:'success',
            message:'Following'
        });
    }catch(err)
    {
        next(err);
    }
}

//Unfollow a community
exports.unfollowcommunity=async(req,res,next)=>{
    try{
        const userdata=await User.findById(req.user.id);
        const communityid=req.params.communityid;
        let mycommuntiesfollowing=[...userdata.communtiesfollowing];
        const index=mycommuntiesfollowing.findIndex(el=>el==communityid);
        console.log(index);
        console.log(mycommuntiesfollowing.splice(index,1));
        userdata.communtiesfollowing=mycommuntiesfollowing;
        userdata.save({validateBeforeSave:false});
        res.json({
            status:'success',
            message:'Unfollowed'
        });
    }catch(err)
    {
        next(err);
    }
}