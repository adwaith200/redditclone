const mongoose=require('mongoose');

const communityschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A community must have a name']
    },
    description:{
        type:String,
        required:true
    },
    admin:{
        type:String,
        required:[true,'A communiy must have an admin']
    },
    communitypic:{
        type:String,
        default:'default.jpg'
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

communityschema.virtual('followers',{
    ref:'User',
    foreignField:'communtiesfollowing',
    localField:'_id'
});

communityschema.virtual('posts',{
    ref:'Post',
    foreignField:'community',
    localField:'_id'
}); 


communityschema.pre(/^find/,function(next){
    // this.populate({
    //     path:'followers',
    //     select:'name'
    // });
    // this.populate('posts');
    // this.populate({
    //     path:'posts',
    //     select:'user title'
    // });
    next();
});

const Community=mongoose.model('Community',communityschema);

module.exports=Community;