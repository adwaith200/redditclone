//Node modules
const express=require('express');
const cookieparser=require('cookie-parser');
const path=require('path');
const cors=require('cors');

//User defined modules
const errorcontroller=require('./controllers/errorcontroller');
const Apperror=require('./utils/Apperror');
const userrouter=require('./routes/userroute');
const communityrouter=require('./routes/communityroute');
const postrouter=require('./routes/postroute');
const commentrouter=require('./routes/commentroute');

//Uses express framework
const app=express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieparser());

//Serving static files
app.use(express.static(path.join(__dirname,'templates')));

//Routes
app.use(cors());
app.use('/user',userrouter);
app.use('/community',communityrouter);
app.use('/post',postrouter);
app.use('/comment',commentrouter);
if(process.env.NODE_ENV==='production')
{
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

//Global Error handler
app.use(errorcontroller);

module.exports=app;