const mongoose=require('mongoose');

const postschema=new mongoose.Schema({
    date:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'Must belong to a user']
    },
    community:{
        type:mongoose.Schema.ObjectId,
        ref:'Community',
        required:[true,'Must belong to a community']
    },
    upvotes:{
        type:Number,
        default:0
    },
    downvotes:{ 
        type:Number,
        default:0
    },
    title:{
        type:String,
        required:[true,'A title is required']
    },
    description:{
        type:String,
        required:[true,'A description is required']
    },
    postedpic:{
        type:String
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

postschema.virtual('comments',{
    ref:'Comment',
    foreignField:'post',
    localField:'_id'
}); 

postschema.pre(/^find/,function(next){
    this.populate({
        path:'user',
        select:'profilepic name'
    });
    this.populate({
        path:'community',
        select:'name communitypic'
    });
    // this.populate('comments');
    next();
});

const Post=mongoose.model('Post',postschema);

module.exports=Post;