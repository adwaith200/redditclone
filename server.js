//Node modules
const mongoose=require('mongoose');
const dotenv=require('dotenv');

//Userdefined modules
const app=require('./app');

dotenv.config({path:'./config.env'});

//Connect to mongoDB atlas
const dbpass=process.env.DB_PASS;
const db=process.env.DB.replace('<password>',dbpass);
mongoose.connect(db,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>console.log('Database connected')).catch(err=>console.log(err));

//Use port from server or local host 8000
const port=process.env.PORT||8000;

app.listen(port,()=>{
    console.log('Server running');
});