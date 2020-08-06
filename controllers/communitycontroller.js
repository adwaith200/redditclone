//Node modules
const multer=require('multer');
const sharp=require('sharp');

//User defined modules
const Community=require('../models/communitymodel');


exports.getallcommunity=async(req,res,next)=>{
    try{
        const communitydata=await Community.find();
        res.json({
            status:'success',
            data:communitydata
        });
    }catch(err)
    {
        next(err);
    }
}

exports.getusercommunity=async(req,res,next)=>{
    try{
        const communitydata=await Community.find({_id:req.user.communtiesfollowing});
        res.json({
            status:'success',
            data:communitydata
        });
    }catch(err)
    {
        next(err);
    }
}

exports.getonecommunity=async(req,res,next)=>{
    try{
        const communitydata=await Community.findById(req.params.id).populate('posts').populate({
            path:'followers',
            select:'name' 
        });
        let joinedcomm=false;
        communitydata.followers.forEach(follower=>{
            if(req.query.userid)
            {
                if(follower._id==req.query.userid)
                {
                    joinedcomm=true;
                }
            }
        });
        
        res.json({
            status:'success',
            data:communitydata,
            joinedcomm
        });
    }catch(err)
    {
        next(err);
    }
}

//Gets the top post for a community
exports.gettoppostcommunity=async(req,res,next)=>{
    try{
        const communitydata=await Community.findById(req.params.id).populate('posts');
        let myposts=[...communitydata.posts];

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
            data:myposts.sort(compare)
        });
    }catch(err)
    {
        next(err);
    }
}

//Gets the newest post for a community
exports.getnewpostcommunity=async(req,res,next)=>{
    try{
        const communitydata=await Community.findById(req.params.id).populate('posts');;
        let myposts=[...communitydata.posts];

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
            data:myposts.sort(compare)
        });
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
exports.uploadpic=upload.single('communitypic');

//Used for resizing images
exports.resizepic=async(req,res,next)=>{
    if(!req.file)
    {
        return next();
    }
    req.file.filename=`community-${Date.now()}.jpeg`;
    // await sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({quality:90}).toFile(`templates/img/communitypic/${req.file.filename}`);
    await sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({quality:90}).toFile(`client/public/images/communitypics/${req.file.filename}`);
    next();
}

exports.createcommunity=async(req,res,next)=>{
    try{
        const {name,description,admin}=req.body;
        let communitydata;
        if(req.file)
        {
            communitydata=await Community.create({
                name,
                description,
                admin:req.user.name,
                communitypic:req.file.filename
            });
        }
        else
        {
            communitydata=await Community.create({
                name,
                description,
                admin:req.user.name
            });
        }
        // communitydata=await Community.create(req.body);
        res.json({
            status:'success',
            data:communitydata
        });
    }catch(err)
    {
        next(err);
    }
}

