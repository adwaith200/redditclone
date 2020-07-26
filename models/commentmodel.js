//Node modules
const mongoose=require('mongoose');

const commentschema=new mongoose.Schema({
    date:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'Must belong to a user']
    },
    post:{
        type:mongoose.Schema.ObjectId,
        ref:'Post',
        required:[true,'Must belong to a post']
    }
});

commentschema.pre(/^find/,function(next){
    this.populate({
        path:'user',
        select:'name profilepic'
    });
    // this.populate('post');
    next();
})

const Comment=mongoose.model('Comment',commentschema);

module.exports=Comment;

