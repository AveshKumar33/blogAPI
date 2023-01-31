const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
username : {
    type : String,
    require :true,
    unique:true
},
password : {
    type : String,
    require : true,
    unique:false
},
isblogger:{
    type:Boolean,
    default:false,
    require:false,
    
}
});

const User= mongoose.model('User',userSchema);
module.exports={User}