const config=require('./config/credential');
 require('./config/connectMongo');
const express = require('express');
const userRouter=require('./routers/userRouter');
const blogRouter= require('./routers/blogRouter');
const passport=require('passport');
const app =express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs'); 
app.use(passport.initialize());
app.use('/',userRouter);
app.use('/',blogRouter);




app.listen(config.port || (3000),()=>{
    console.log(`server is listining port no ${config.port || 3000}......`);
});