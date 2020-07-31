//Node modules
const multer=require('multer');
const sharp=require('sharp');

//User defined modules
const Post=require('../models/postmodel');
const { post } = require('../routes/postroute');
const Apperror = require('../utils/Apperror');
const User = require('../models/usermodel');

exports.getallposts=async(req,res,next)=>{
    try{
        console.log(req.query);
        const postdata=await Post.find();
        res.json({
            status:"success",
            data:postdata
        });
    }catch(err)
    {
        next(err);
    }
}

exports.getoneposts=async(req,res,next)=>{
    try{
        const postdata=await Post.findById(req.params.id).populate({
            path:'community',
            select:'name communitypic'
        }).populate('comments');

        function compare(a, b) {
            const bandA = a.date;
            const bandB = b.date;
          
            let comparison = 0;
            if (bandA > bandB) {
              comparison = 1;
            } else if (bandA < bandB) {
              comparison = -1;
            }
            return comparison*-1;
        }

        postdata.comments.sort(compare);
        res.json({
            status:"success",
            data:postdata,
            // comments:postdata.comments.sort(compare)
        });
    }catch(err)
    {
        next(err);
    }
}

exports.gettopposts=async(req,res,next)=>{
    try{
        const postdata=await Post.find();

        function compare(a, b) {
            const bandA = a.upvotes;
            const bandB = b.upvotes;
          
            let comparison = 0;
            if (bandA > bandB) {
              comparison = 1;
            } else if (bandA < bandB) {
              comparison = -1;
            }
            return comparison*-1;
        }

        res.json({
            status:'success',
            data:postdata.sort(compare)
        });
    }catch(err)
    {
        next(err);
    }
}

//Get the top posts based on upvotes to the communities user follows
exports.getusertoppost=async(req,res,next)=>{
    try{
        const postdata=await Post.find({community:req.user.communtiesfollowing});
        
        function compare(a, b) {
            const bandA = a.upvotes;
            const bandB = b.upvotes;
          
            let comparison = 0;
            if (bandA > bandB) {
              comparison = 1;
            } else if (bandA < bandB) {
              comparison = -1;
            }
            return comparison*-1;
        }

        res.json({
            status:'success',
            data:postdata.sort(compare)
        });
    }catch(err)
    {
        next(err);
    } 
}

//Get the newest posts for the communites user follows
exports.getusernewposts=async(req,res,next)=>{
    try{
        const postdata=await Post.find({community:req.user.communtiesfollowing});
        
        function compare(a, b) {
            const bandA = a.date;
            const bandB = b.date;
          
            let comparison = 0;
            if (bandA > bandB) {
              comparison = 1;
            } else if (bandA < bandB) {
              comparison = -1;
            }
            return comparison*-1;
        }

        res.json({
            status:'success',
            data:postdata.sort(compare)
        });
    }catch(err)
    {
        next(err);
    }
}

exports.upvotepost=async(req,res,next)=>{
    try{
        const postdata=await Post.findById(req.params.id);
        const userdata=await User.findById(req.user.id);
        console.log(postdata.id);
        // if(req.user.upvoted.includes(postdata.upvotes))
        // {
        //     return next(new Apperror('Already upvoted',401));
        // }
        let flag=0;
        req.user.upvoted.forEach(upvote=>{
            if(`${upvote}`==`${postdata.id}`)
            {
                flag=1;
                console.log('trueee');
            }
        });
        req.user.downvoted.forEach((downvote,i)=>{
            if(`${downvote}`==`${postdata.id}`)
            {
                console.log(i);
                userdata.downvoted.splice(i,1);
                postdata.downvotes=postdata.downvotes-1;
            }
        });
        if(flag===0)
        {
            postdata.upvotes=postdata.upvotes+1;
            postdata.save({validateBeforeSave:false});
            console.log(postdata);
            userdata.upvoted.push(postdata.id);
            userdata.save({validateBeforeSave:false});
            console.log(userdata);
            res.json({
                status:'success',
                message:'Upvoted'
            });
        }
        else
        {
            res.json({
                status:'success',
                message:'Cant upvote'
            });
        }
    }catch(err)
    {
        next(err);
    }
}

exports.downvotepost=async(req,res,next)=>{
    try{
        const postdata=await Post.findById(req.params.id);
        const userdata=await User.findById(req.user.id);
        console.log(postdata.id);
        // if(req.user.upvoted.includes(postdata.upvotes))
        // {
        //     return next(new Apperror('Already upvoted',401));
        // }
        let flag=0;
        req.user.downvoted.forEach(downvote=>{
            if(`${downvote}`==`${postdata.id}`)
            {
                flag=1;
            }
        });
        req.user.upvoted.forEach((upvote,i)=>{
            if(`${upvote}`==`${postdata.id}`)
            {
                console.log(i);
                userdata.upvoted.splice(i,1);
                postdata.upvotes=postdata.upvotes-1;
            }
        });

        if(flag===0)
        {
            postdata.downvotes=postdata.downvotes+1;
            postdata.save({validateBeforeSave:false});
            console.log(postdata);
            userdata.downvoted.push(postdata.id);
            userdata.save({validateBeforeSave:false});
            console.log(userdata);
            res.json({
                status:'success',
                message:'Downvoted'
            });
        }
        else
        {
            res.json({
                status:'success',
                message:'Cant Downvote'
            });
        }
    }catch(err)
    {
        next(err);
    }
}

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
exports.uploadpic=upload.single('postedpic');

//Used for resizing images
exports.resizepic=async(req,res,next)=>{
    if(!req.file)
    {
        return next();
    }
    req.file.filename=`posts-${Date.now()}.jpeg`;
    // await sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({quality:90}).toFile(`templates/img/postspic/${req.file.filename}`);
    await sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({quality:90}).toFile(`client/public/images/postpics/${req.file.filename}`);
    next();
}


exports.createpost=async(req,res,next)=>{
    try{
        const user=req.user.id;
        const {community,title,description}=req.body;
        let postdata;
        if(req.file)
        {
            postdata=await Post.create({
                user,
                community,
                title,
                description,
                postedpic:req.file.filename
            });
        }
        else
        {
            postdata=await Post.create({
                user,
                community,
                title,
                description
            });
        }
        res.json({
            status:"success",
            data:postdata
        });
    }catch(err)
    {
        next(err);
    }
}