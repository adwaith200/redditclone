//Node modules
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A user must have a name']
    },
    email:{
        type:String,
        required:[true,'A user must have an email']
    },
    password:{
        type:String,
        required:[true,'A user must have a password']
    },
    confirmpassword:{
        type:String,
        required:[true,'Confirm password please'],
        validate:{
            validator:function(){
                return this.confirmpassword===this.password;
            },
            message:'The 2 passwords dont match'
        }
    },
    profilepic:{
        type:String,
        default:'default.jpg'
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    passwordresettoken:{
        type:String
    },
    communtiesfollowing:[{
            type:mongoose.Schema.ObjectId,
            ref:'Community'
    }]
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

userschema.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,12);
    this.confirmpassword=undefined;
    next();
});

userschema.methods.checkpassword=async (ippass,dbpass)=>{
    return await bcrypt.compare(ippass,dbpass);
}

userschema.methods.forgotpassword=function(){
    const token=crypto.randomBytes(32).toString('hex');
    this.passwordresettoken=crypto.createHash('sha256').update(token).digest('hex');
    return token;
}

const User=mongoose.model('User',userschema);

module.exports=User;