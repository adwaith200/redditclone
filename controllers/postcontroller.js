//Node modules

//User defined modules
const Post=require('../models/postmodel');

exports.getallposts=async(req,res,next)=>{
    try{
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
            select:'name -posts'
        });
        res.json({
            status:"success",
            data:postdata
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

exports.createpost=async(req,res,next)=>{
    try{
        const user=req.user.id;
        const {community,title,description,upvotes}=req.body;
        let postdata;
        if(req.file)
        {
            postdata=await Post.create({
                user,
                community,
                title,
                description,
                upvotes,
                postedpic:req.file.filename
            });
        }
        else
        {
            postdata=await Post.create({
                user,
                community,
                title,
                description,
                upvotes
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