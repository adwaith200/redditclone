//Node modules
const crpyto=require('crypto');
const jwt=require('jsonwebtoken');
const {promisify}=require('util');

//User defined modules
const User=require('../models/usermodel');
const Apperror=require('../utils/Apperror');
const Email=require('../utils/sendmail');

exports.signup=async(req,res,next)=>{
    try{
        // const userdata=await User.create(req.body);
        let {name,email,password,confirmpassword,role,communtiesfollowing}=req.body;
        let userdata;
        if(req.file)
        {
            userdata=await User.create({
                name,
                email,
                password,
                confirmpassword,
                role,
                communtiesfollowing,
                profilepic:req.file.filename
            });
        }
        else 
        {
            userdata=await User.create({
                name,
                email,
                password,
                confirmpassword,
                communtiesfollowing,
                role
            });
        }
        const token=jwt.sign({id:userdata._id},process.env.JWT_SECRET);
        res.json({
            status:'Success',
            token,
            data:userdata
        });
    }catch(err)
    {
        next(err);
    }
}

exports.login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password)
        {
            return next(new Apperror('Please enter all credentials',401));
        }
        const userdata=await User.findOne({email:email});
        console.log(email,password,userdata);
        // console.log(!await userdata.checkpassword(password,userdata.password));
        // if(!userdata|| !await userdata.checkpassword(password,userdata.password))
        // {
        //     return next(new Apperror('Invalid email or password'));
        // }
        if(!userdata)
        {
            return next(new Apperror('Invalid email or password'));
        }
        const token=jwt.sign({id:userdata._id},process.env.JWT_SECRET);
        res.cookie('jwt',token,{                                        //jwt token is also sent in form of cookie for browser use of authentication
            expires:new Date(Date.now()+90*24*60*60*1000),
            httpOnly:true
        });
        res.json({
            status:'Success',
            token,
            data:userdata
        });
    }catch(err)
    {
        next(err);
    }
}

exports.protected=async(req,res,next)=>{
    try{
        let token;
        // console.log(req.query);
        if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer'))
        {
            token=req.headers.authorization.split(' ')[1];
        }
        else if(req.query.auth)
        {
            token=req.query.auth;
        }
        else{
            return next(new Apperror('Login please',401));
        }
        const userid=await promisify(jwt.verify)(token,process.env.JWT_SECRET);
        const userdata=await User.findById(userid.id);
        // console.log(userdata);
        req.user=userdata;
        next();
    }catch(err)
    {
        next(err);
    }
}

exports.forgotpassword=async(req,res,next)=>{
    try{
        const {email}=req.body;
        const userdata=await User.findOne({email:email});
        const token=userdata.forgotpassword();
        userdata.save({validateBeforeSave:false});
        const url='/resetpassword/'+token;
        try{
            await new Email(userdata,url).passwordreset();
            res.json({
                status:"Success",
                message:'Reset token sent to mail'
            });
        }catch(err)
        {
            console.log(err);
            userdata.passwordresettoken=undefined;
            return next(new Apperror('Something went wrong',500));
        }
    }catch(err)
    {
        next(err);
    }
}

exports.resetpassword=async(req,res,next)=>{
    try{
        const token=req.params.token;
        const hashedtoken=crpyto.createHash('sha256').update(token).digest('hex');
        const userdata=await User.findOne({passwordresettoken:hashedtoken});
        if(!userdata)
        {
            return next(new Apperror('Something went wrong',500));
        }
        userdata.password=req.body.password;
        userdata.confirmpassword=req.body.confirmpassword;
        userdata.passwordresettoken=undefined;
        await userdata.save();
        const jwttoken=jwt.sign({id:userdata._id},process.env.JWT_SECRET);
        res.json({
            status:'success',
            token:jwttoken,
            message:'Password reset done'
        });
    }catch(err)
    {
        next(err);
    }
}